const errorHandler = require("../../helpers/errorHandler.helper")
const categoriesModel = require("../../models/categories.model")
const fileRemover = require("../../helpers/fileRemover.helper")

exports.getAllCategories = async(request, response)=>{
    try{
        const data = await categoriesModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy,
        )
        return response.json({
            success: true,
            message:"list of all categories",
            results:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.getOneCategory = async(request, response)=>{
    try{
        const data = await categoriesModel.findOne(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message:"Detail category",
            results:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.createCategory = async(request, response) => {
    try{
        const data = {
            ...request.body
        }
        
        const checkCategory = await categoriesModel.findByName(request.body.name)
        if(checkCategory){
            throw Error("is_duplicate_data")
        }
        const profile = await  categoriesModel.insert(data)
        return response.json({
            success: true,
            message: "Create category successfully",
            results: profile
        })

    }catch(err){
        fileRemover(request.file)
        return errorHandler(response, err)
    }
}  

exports.updateCategory = async(request, response) => {
    try{
        const data = {
            ...request.body
        }
        const checkName = await categoriesModel.findByName(request.body.name)
        if(checkName){
            throw Error("is_duplicate_data")
        }
        const user = await categoriesModel.update(request.params.id, data)
        if(!user){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Update category successfully",
            results: user
        })

    }catch(err){
        fileRemover(request.file)
        return errorHandler(response, err)
    }
}

exports.deleteCategory = async(request, response)=>{
    try {
        const data = await categoriesModel.destroy(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Delete category successfully",
            results:data
        })
    } catch (err) {
        return errorHandler(response,err)
    }
}
