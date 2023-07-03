const errorHandler = require("../../helpers/errorHandler.helper")
const profilesModel = require("../../models/profiles.model")
const fileRemover = require("../../helpers/fileRemover.helper")
const usersModel = require("../../models/users.model")
const fs = require("fs")

exports.getAllUserProfiles = async(request, response)=>{
    try{
        const data = await profilesModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy,
        )
        return response.json({
            success: true,
            message:"list of all user profiles",
            results:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.getOneUserProfile = async(request, response)=>{
    try{
        const data = await profilesModel.findOne(request.params.id)

        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message:"Detail profile",
            results:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.createUserProfile = async(request, response) => {
    try{
        const data = {
            ...request.body
        }

        const userId = data.userId
        const checkId = await usersModel.findOne(userId)

        if(!checkId){
            throw Error("data_user_not_found")
        }

        const checkDuplicateId = await profilesModel.findUserId(userId)
        if(checkDuplicateId){
            throw Error("is_duplicate_data")
        }

        if(request.file){
            data.picture = request.file.filename
        }
        const profile = await  profilesModel.insert(data)
        return response.json({
            success: true,
            message: "Create user profile successfully",
            results: profile
        })
    }catch(err){
        fileRemover(request.file)
        return errorHandler(response, err)
    }
}  

exports.updateUserProfile = async(request, response) => {
    try{

        const data = {
            ...request.body
        }
        
        if(data.userId){
            const userId = data.userId
            const checkId = await usersModel.findOne(userId)
  
            if(!checkId){
                throw Error("data_user_not_found")
            }
  
            const checkValidRequest = await profilesModel.findOne(request.params.id)
            if(userId !== checkValidRequest.userId){
                throw Error("invalid_request_userId")
            }
        }
        
        if(request.file){
            const oldPict = await profilesModel.findUserPict(request.params.id)
            const fileName = `uploads/${oldPict.picture}`
            if(fileName){
                fs.unlink(fileName, (response,err)=>{
                    if(err){
                        return errorHandler(response, err)
                    }
                })
            }
            data.picture = request.file.filename
        }

        const user = await profilesModel.update(request.params.id, data)
        if(!user){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Update user profile successfully",
            results: user
        })
        
        
    }catch(err){
        fileRemover(request.file)
        return errorHandler(response, err)
    }

}

exports.deleteUserProfile = async(request, response)=>{
  
    try {

        const oldPict = await profilesModel.findUserPict(request.params.id)
        const fileName = `uploads/${oldPict.picture}`
        if(fileName){
            fs.unlink(fileName, (response,err)=>{
                if(err){
                    return errorHandler(response, err)
                }
            })
        }
        const data = await profilesModel.destroy(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Delete user profile successfully",
            results:data
        })
    } catch (err) {
        return errorHandler(response,err)
    }

    
}
