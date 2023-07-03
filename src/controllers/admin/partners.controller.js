const errorHandler = require("../../helpers/errorHandler.helper")
const partnersModel = require("../../models/partners.model")
const fileRemover = require("../../helpers/fileRemover.helper")
const fs = require("fs")

exports.getAllPartners = async(request, response)=>{
    try{
        const data = await partnersModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy,
        )
        return response.json({
            success: true,
            message:"list of all partners",
            results:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.getOnePartner = async(request, response)=>{
    try{
        const data = await partnersModel.findOne(request.params.id)

        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message:"Detail partner",
            results:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.createPartner = async(request, response) => {
    try{
        const checkName = await partnersModel.findByName(request.body.name)
        if(!checkName){
            const data = {
                ...request.body
            }
            if(request.file){
                data.picture = request.file.filename
            }
            const profile = await  partnersModel.insert(data)
            return response.json({
                success: true,
                message: "Create partner successfully",
                results: profile
            })
        }
        throw Error("is_duplicate_data")
    }catch(err){
        fileRemover(request.file)
        return errorHandler(response, err)
    }
}  

exports.updatePartner = async(request, response) => {
    try{
        const checkName = await partnersModel.findByName(request.body.name)
        if(!checkName){
            const data = {
                ...request.body
            }
            if(request.file){
                const oldPict = await partnersModel.findPict(request.params.id)
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
  

            
  
            const user = await partnersModel.update(request.params.id, data)
            if(!user){
                throw Error("data_not_found")
            }
            return response.json({
                success: true,
                message: "Update partner successfully",
                results: user
            })
        }
        throw Error("is_duplicate_data")
    }catch(err){
        fileRemover(request.file)
        return errorHandler(response, err)
    }

}

exports.deletePartner = async(request, response)=>{
  
    try {

        const oldPict = await partnersModel.findPict(request.params.id)
        const fileName = `uploads/${oldPict.picture}`
        if(fileName){
            fs.unlink(fileName, (response,err)=>{
                if(err){
                    return errorHandler(response, err)
                }
            })
        }
        const data = await partnersModel.destroy(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Delete partner successfully",
            results:data
        })
    } catch (err) {
        return errorHandler(response,err)
    }

    
}
