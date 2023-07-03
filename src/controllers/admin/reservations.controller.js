const errorHandler = require("../../helpers/errorHandler.helper")
const reservationsModel = require("../../models/reservations.model")

exports.getAllReservations = async(request, response)=>{
    try{
        const data = await reservationsModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy,
        )
        return response.json({
            success: true,
            message:"list of all reservations",
            result:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.getOneReservation = async(request, response)=>{
    try{
        const data = await reservationsModel.findOne(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message:"Detail reservation",
            result:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.createReservation = async(request, response) => {
    try{
        const data = {
            ...request.body
        }
        const profile = await  reservationsModel.insert(data)
        return response.json({
            success: true,
            message: "Create reservation successfully",
            result: profile
        })
    }catch(err){
        return errorHandler(response, err)
    }
}  

exports.updateReservation = async(request, response) => {
    try{
        const data = {
            ...request.body
        }
        const user = await reservationsModel.update(request.params.id, data)
        if(!user){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Update reservation successfully",
            response: user
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.deleteReservation = async(request, response)=>{
    try {
        const data = await reservationsModel.destroy(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Delete reservation successfully",
            result:data
        })
    } catch (err) {
        return errorHandler(response,err)
    }
}
