const errorHandler = require("../../helpers/errorHandler.helper")
const paymentMethods = require("../../models/paymentMethods.model")

exports.getAllPaymentMethods = async(request, response)=>{
    try{
        const data = await paymentMethods.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy,
        )
        return response.json({
            success: true,
            message:"list of all payment methods",
            results:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.getOnePaymentMethod = async(request, response)=>{
    try{
        const data = await paymentMethods.findOne(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message:"Detail payment method",
            results:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.createPaymentMethod = async(request, response) => {
    try{
        const data = {
            ...request.body
        }
        const profile = await  paymentMethods.insert(data)
        return response.json({
            success: true,
            message: "Create payment method successfully",
            results: profile
        })
    }catch(err){
        return errorHandler(response, err)
    }
}  

exports.updatePaymentMethod = async(request, response) => {
    try{
        const data = {
            ...request.body
        }
        const user = await paymentMethods.update(request.params.id, data)
        if(!user){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Update payment method successfully",
            results: user
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.deletePaymentMethod = async(request, response)=>{
    try {
        const data = await paymentMethods.destroy(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Delete payment method successfully",
            results:data
        })
    } catch (err) {
        return errorHandler(response,err)
    }
}
