const errorHandler = require("../helpers/errorHandler.helper")
const fileRemover = require("../helpers/fileRemover.helper")
const profilesModel = require("../models/profiles.model")
const usersModel = require("../models/users.model")
const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: "yum3k0y4m4guch1",
    api_key: "432579382486973",
    api_secret: "BlUSngaDylhETR1c-bIAzzTFo0M"
})

exports.updateProfile = async (request, response) => {
    try {
        const {id} = request.user
        const user = await profilesModel.findOneByUserId(id)

        const data = {
            ...request.body 
        }

        if(data.userId){
            if(user.id !== data.userId){
                throw Error("invalid_request_userId")
            }
        }

        

        if(request.file){
            if(user.picture){
                fileRemover({filename: user.picture})

                const filePict = user.picture
                const urlArray = filePict.split("/")
                const directoryName = urlArray[urlArray.length-2]
                const fileNamed = urlArray[urlArray.length-1].split(".")[0]
                const id_image = `${directoryName.toString()}/${fileNamed.toString()}`
    
                console.log(id_image)
                // return console.log(id_image)
            
                await cloudinary.uploader.destroy(id_image, (error, results) => {
                    console.log(error, results)
                })
                
            }
          
            // data.picture = request.file.filename
            data.picture = request.file.path
        }

        const profile = await profilesModel.updateByUserId(id, data)

        if(!profile){
            throw Error("update_profile_failed")
        }
        let updatedUser

        if(data.email){
            updatedUser = await usersModel.update(id, data)
        }else{
            updatedUser = await usersModel.findOne(id)
        }

        const results = {
            ...profile,
            email: updatedUser?.email
        }

        return response.json({
            success: true,
            message: "profile updated",
            results: results
        })
    } catch (err) {
        return errorHandler(response, err)
    }
}

exports.getProfile = async (request, response) => {
    try {
        const {id} = request.user
        const profile = await profilesModel.findOneByUserId(id)

        if(!profile){
            throw Error("profile_not_found")
        }
        return response.json({
            success: true,
            message: "profile",
            results: profile
        })
    } catch (err) {
        return errorHandler(response, err)
    }
}
