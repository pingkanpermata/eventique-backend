const errorHandler = require("../../helpers/errorHandler.helper")
const reservationStatusModel = require("../../models/reservationStatus.model")

exports.getAllReservationStatus = async(request, response)=>{
    try{
        const data = await reservationStatusModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy,
        )
        return response.json({
            success: true,
            message:"list of all reservation status",
            result:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.getOneReservationStatus = async(request, response)=>{
    try{
        const data = await reservationStatusModel.findOne(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message:"Detail reservation status",
            result:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.createReservationStatus = async(request, response) => {
    try{
        const data = {
            ...request.body
        }
        const profile = await  reservationStatusModel.insert(data)
        return response.json({
            success: true,
            message: "Create reservation status successfully",
            result: profile
        })
    }catch(err){
        return errorHandler(response, err)
    }
}  

exports.updateReservationStatus = async(request, response) => {
    try{
        const data = {
            ...request.body
        }
        const user = await reservationStatusModel.update(request.params.id, data)
        if(!user){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Update reservation status successfully",
            response: user
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.deleteReservationStatus = async(request, response)=>{
    try {
        const data = await reservationStatusModel.destroy(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Delete reservation status successfully",
            result:data
        })
    } catch (err) {
        return errorHandler(response,err)
    }
}
