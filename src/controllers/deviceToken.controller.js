const errorHandler = require("../helpers/errorHandler.helper")
const deviceTokenModel = require("../models/deviceToken.model")

exports.saveToken = async(req, res) => {
    try{
        const {id} = req.user
        const {token} = req.body
        const exists = await deviceTokenModel.findOneByToken(token)
        if(exists){
            await deviceTokenModel.updateUserByToken(token, id)
        } else{
            await deviceTokenModel.insertToken(id, {token})
        }
        return res.json({
            succes: true,
            message: "Token saved !",
            results: {
                token
            }
        })
    } catch(err) {
        return errorHandler(res, err)
    }
}
