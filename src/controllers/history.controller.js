const errorHandler = require("../helpers/errorHandler.helper")
const reservationsModel = require("../models/reservations.model")

exports.getHistory = async (request, response) => {
    try {
        const {id} = request.user
        if(!id){
            throw Error("unauthorized")
        }

        const history = await reservationsModel.findHistoryByUserId(id)
        if(!history){
            throw Error("data_not_found")
        }

        return response.json({
            success: true,
            message: "list of your hostory",
            results: history
        })
    } catch (err) {
        return errorHandler(response, err)
    }
}

exports.getDetailHistory = async (request, response) => {
    try {
        const {id} = request.user
        if(!id){
            throw Error("unauthorized")
        }
        const userId = id
        const reservationId = request.params.id

        const detailHistory = await reservationsModel.findHistoryByIdAndUserId(reservationId, userId)
        if(!detailHistory){
            throw Error("data_not_found")
        }

        return response.json({
            success: true,
            message: "detai reservation",
            results: detailHistory
        })

    } catch (err) {
        return errorHandler(response, err)
    }
}
