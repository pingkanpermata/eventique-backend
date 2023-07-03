const errorHandler = require("../../helpers/errorHandler.helper")
const citiesModel = require("../../models/cities.model")
const fileRemover = require("../../helpers/fileRemover.helper")
const fs = require("fs")

exports.getAllCities = async(request, response)=>{
    try{
        const data = await citiesModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy,
        )
        return response.json({
            success: true,
            message:"list of all citY",
            results:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.getOneCity = async(request, response)=>{
    try{
        const data = await citiesModel.findOne(request.params.id)

        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message:"Detail city",
            results:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.createCity = async(request, response) => {
    try{
        const checkName = await citiesModel.findByName(request.body.name)
        if(!checkName){
            const data = {
                ...request.body
            }
            if(request.file){
                data.picture = request.file.filename
            }
            const profile = await  citiesModel.insert(data)
            return response.json({
                success: true,
                message: "Create city successfully",
                results: profile
            })
        }
        throw Error("is_duplicate_data")
    }catch(err){
        fileRemover(request.file)
        return errorHandler(response, err)
    }
}  

exports.updateCity = async(request, response) => {
    try{
        const checkName = await citiesModel.findByName(request.body.name)
        if(!checkName){
            const data = {
                ...request.body
            }
            if(request.file){
                const oldPict = await citiesModel.findPict(request.params.id)
                if(oldPict){
                    const fileName = `uploads/${oldPict.picture}`
                    if(fileName){
                        fs.unlink(fileName, (response,err)=>{
                            if(err){
                                return errorHandler(response, err)
                            }
                        })
                    }
                }
                data.picture = request.file.filename
            }
  

    
            const user = await citiesModel.update(request.params.id, data)
            if(!user){
                throw Error("data_not_found")
            }
            return response.json({
                success: true,
                message: "Update city successfully",
                results: user
            })
        }
        throw Error("is_duplicate_data")
    }catch(err){
        fileRemover(request.file)
        return errorHandler(response, err)
    }
}

exports.deleteCity = async(request, response)=>{
  
    try {
        const oldPict = await citiesModel.findPict(request.params.id)
        const fileName = `uploads/${oldPict.picture}`
        if(fileName){
            fs.unlink(fileName, (response,err)=>{
                if(err){
                    return errorHandler(response, err)
                }
            })
        }
        const data = await citiesModel.destroy(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Delete city successfully",
            results:data
        })
    } catch (err) {
        return errorHandler(response,err)
    }

    
}
