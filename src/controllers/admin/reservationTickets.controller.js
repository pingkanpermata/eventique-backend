const errorHandler = require("../../helpers/errorHandler.helper")
const reservationTicketsModel = require("../../models/reservationTickets.model")

exports.getAllReservationTickets = async(request, response)=>{
    try{
        const data = await reservationTicketsModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy,
        )
        return response.json({
            success: true,
            message:"list of all reservation tickets",
            result:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.getOneReservationTicket = async(request, response)=>{
    try{
        const data = await reservationTicketsModel.findOne(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message:"Detail reservation ticket",
            result:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.createReservationTicket = async(request, response) => {
    try{
        const data = {
            ...request.body
        }
        const profile = await  reservationTicketsModel.insert(data)
        return response.json({
            success: true,
            message: "Create reservation ticket successfully",
            result: profile
        })
    }catch(err){
        return errorHandler(response, err)
    }
}  

exports.updateReservationTicket = async(request, response) => {
    try{
        const data = {
            ...request.body
        }
        const user = await reservationTicketsModel.update(request.params.id, data)
        if(!user){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Update reservation ticket successfully",
            response: user
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.deleteReservationTicket = async(request, response)=>{
    try {
        const data = await reservationTicketsModel.destroy(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Delete reservation ticket successfully",
            result:data
        })
    } catch (err) {
        return errorHandler(response,err)
    }
}
