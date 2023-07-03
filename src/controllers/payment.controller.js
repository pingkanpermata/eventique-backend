const errorHandler = require("../helpers/errorHandler.helper")
const paymentMethodsModel = require("../models/paymentMethods.model")
const reservatioinTicketsModel = require("../models/reservationTickets.model")
const reservationsModel = require("../models/reservations.model")
const eventsModel = require("../models/events.model")


exports.makePayment = async (request, response) => {
    try {
        const {id} = request.user
        if(!id){
            throw Error("unauthorized")
        }

        // let sectionStatus
        // if(request.body.paymentMethodId == 5 ){
        //     sectionStatus = 1
        // }else{
        //     sectionStatus = 3
        // }
        // console.log(request.body.paymentMethodId)
        // console.log(sectionStatus)

        const sectionStatus = 3


        const data = {
            statusId: sectionStatus,
            ...request.body
        }
  
        const reservations = await reservationsModel.findOne(data.reservationId)
        if(!reservations){
            throw Error("reservation_not_found")
        }
        
        const paymentMethod = await paymentMethodsModel.findOne(data.paymentMethodId)
        if(!paymentMethod){
            throw Error("payment_method_not_found")
        }
        

        const payment = await reservationsModel.update(data.reservationId, data)
        if(!payment){
            throw Error("change_paymentMethod_failed")
        }

        const information = await reservatioinTicketsModel.getInfo(data.reservationId)
        
        if(!information){
            throw Error("reservation_not_found")
        }
        const price = parseInt(information.price)
        const quantity = parseInt(information.quantity)
        const totalPayment = price * quantity

        const dataInformation = {
            ...information,
            totalPayment
        }

        return response.json({
            success: true,
            message: "payment method changed",
            results: dataInformation
        })


        
    } catch (err) {
        return errorHandler(response, err)
    }
}
