const errorHandler = require("../../helpers/errorHandler.helper")
const userModel = require("../../models/users.model")
const argon =  require("argon2")
// const fileRemover = require("../../helpers/fileRemover.helper")

exports.getAllUsers = async(request, response)=>{
    try{
        const data = await userModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy,
        )
        return response.json({
            success: true,
            message:"list of all users",
            result:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.getOneUser = async(request, response)=>{
    try{
        const data = await userModel.findOne(request.params.id)

        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message:"Detail User",
            result:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.createUser = async(request, response) => {
    try{
        const {email, password} = request.body

        const hash = await argon.hash(password)
        const data = {
            ...request.body,
            password: hash
        }
        const user = await  userModel.insert(data)
        return response.json({
            success: true,
            message: `Create user ${email} successfully`,
            result: user
        })
    }catch(err){
        return errorHandler(response, err)
    }
}  

exports.updateUser = async(request, response) => {
    try{

        const hash = await argon.hash(request.body.password)
        const data = {
            ...request.body,
            password: hash
        }
        const user = await userModel.update(request.params.id, data)
        if(!user){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Update user successfully",
            response: user
        })
        
        
    }catch(err){
        return errorHandler(response, err)
    }

}

exports.deleteUser = async(request, response)=>{
  
    try {
        const data = await userModel.destroy(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Delete user successfully",
            result:data
        })
    } catch (err) {
        return errorHandler(response,err)
    }

    
}
