const userModel = require("../models/users.model")
const profileModel = require("../models/profiles.model")
const forgotRequestModel = require("../models/forgotRequest.model")
const errorHandler = require("../helpers/errorHandler.helper")
const jwt = require("jsonwebtoken")
const argon  = require("argon2")
const {APP_SECRET} = process.env

exports.login = async (request, response) => {
    try {
        const {email, password} = request.body

        const user = await userModel.findOneByEmail(email)
        if(!user){
            throw Error("wrong_credentials")
        }

        const verify = await argon.verify(user.password, password)
        if(!verify){
            throw Error("wrong_credentials")
        }

        const token = jwt.sign({id: user.id}, APP_SECRET)
        return response.json({
            success: true,
            message: "Login Success!",
            results: {token}
        })
    } catch (err) {
        return errorHandler(response, err)
    }
}


exports.register = async (request, response) => {
    try {
        const {fullName, password, termAndCondition} = request.body

        if(termAndCondition === false){
            throw Error("invalid_term_and_condition")
        }

        const hash = await argon.hash(password)
        const data = {
            ...request.body,
            password: hash
        }
        const user = await  userModel.insert(data)
        const profileData = {
            fullName,
            userId: user.id
        }
        await profileModel.insert(profileData)
        const token = jwt.sign({id: user.id}, APP_SECRET)
        return response.json({
            success: true,
            message: "Register Success!",
            results: {token}
        })
    } catch (err) {
        return errorHandler(response, err)
    }
}

exports.forgotPassword = async (request, response) => {
    try {
        const {email} = request.body
        const user = await userModel.findOneByEmail(email)
        if(!user){
            throw Error("no_user")
        }

        const activeReqCode = 1
        const inActiveReqCode = 0
        const checkRequest = await forgotRequestModel.findOneByEmailAndStatusCode(email, activeReqCode)

        if(checkRequest){
            const statusCode = checkRequest.statusCode
            await forgotRequestModel.updateStatusCode(email, statusCode, inActiveReqCode)
        }
        
        const randomNumber = Math.random()
        const rounded = Math.round(randomNumber * 100000)
        const padded = String(rounded).padEnd(6, "0")
        const forgot = await forgotRequestModel.insert({
            email: user.email,
            code: padded,
            statusCode: activeReqCode
        })

        if(!forgot){
            throw Error("forgot_failed")
        }

        return response.json({
            success: true,
            message: "Request reset password success!"
        })

    } catch (err) {
        return errorHandler(response, err)
    }
}

exports.resetPassword = async (request, response) => {
    try {
        const {code, email, password} = request.body
        const find = await forgotRequestModel.findOneByEmailAndCode(email, code)
        
        if(!find){
            throw Error("code_invalid")
        }

        if(find.statusCode !== 1){
            throw Error("code_invalid")
        }

        const selectedUser = await userModel.findOneByEmail(email)

        const hash = await argon.hash(password)
        const data = {
            password: hash
        }

        const user = await userModel.update(selectedUser.id, data)
        if(!user){
            throw Error("forgot_failed")
        }

        const inActiveReqCode = 0
        await forgotRequestModel.updateStatusCode(email, find.statusCode, inActiveReqCode)

        return response.json({
            success: true,
            message: "reset password success"
        })
    } catch (err) {
        return errorHandler(response, err)
    }

}
