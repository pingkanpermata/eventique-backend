// const errorHandler = require("../helpers/errorHandler.helper")

const errorHandler = require("../helpers/errorHandler.helper")
const reservationsModel = require("../models/reservations.model")
const reservationSectionsModel = require("../models/reservationSections.model")
const eventsModel = require("../models/events.model")
const reservationTicketsModel = require("../models/reservationTickets.model")



exports.createReservation = async (request, response) => {
    try {
        const {id} = request.user
        if(!id){
            throw Error("unauthorized")
        }
        const reservationStatus = 1
        const paymentMethod = null

        const data = {
            ...request.body,
            userId: id,
            statusId: reservationStatus,
            paymentMethodId: paymentMethod
        }

        

        if(data.eventId){
            const checkEvent = await eventsModel.findOne(data.eventId)
            if(!checkEvent){
                throw Error("data_not_found")
            }
        }

        const reservation = await reservationsModel.insert(data)

        // return console.log(reservation)

        const reservationId = reservation.id
        const sectionId = request.body.sectionId
        const quantity = request.body.quantity

        const ticketSection = await reservationSectionsModel.findOne(sectionId)
        const dataReservationTickets = {
            reservationId, sectionId, quantity
        }

        await reservationTicketsModel.insert(dataReservationTickets)

        return response.json({
            success: true,
            message: "Success add reservation",
            results: {
                id: reservation.id,
                events: await eventsModel.findDetailEvent(request.body.eventId),
                sectionName: ticketSection.name,
                quantity: quantity,
                pricePerTicket: ticketSection.price,
                totalPrice: parseInt(quantity) * parseInt(ticketSection.price)

            }
        })

    } catch (err) {
        return errorHandler(response, err)
    }
}

// exports.createReservation = async (request, response) => {
//     try {
//         const {id} = request.user
//         if(!id){
//             throw Error("unauthorized")
//         }
//         console.log(request.body)
//         const reservationStatus = 1
//         const paymentMethod = 5

//         const data = {
//             ...request.body,
//             userId: id,
//             statusId: reservationStatus,
//             paymentMethodId: paymentMethod
//         }

//         if(data.eventId){
//             const checkEvent = await eventsModel.findOne(data.eventId)
//             if(!checkEvent){
//                 throw Error("data_not_found")
//             }
//         }

//         const reservation = await reservationsModel.insert(data)

//         return response.json({
//             success: true,
//             message: "Success add reservation",
//             results: reservation
//         })

//     } catch (err) {
//         return errorHandler(response, err)
//     }
// }

// exports.pickTicket = async (request, response) => {
//     try {
//         const {id} = request.user
//         if(!id){
//             throw Error("unauthorized")
//         }

//         const data = {
//             ...request.body
//         }
//         const reservation = await reservationsModel.findByIdAndUserId(data.reservationId, id)
//         if(!reservation){
//             throw Error("reservation_not_found")
//         }

//         const section = await reservationSectionsModel.findOne(data.sectionId)
//         if(!section){
//             throw Error("section_not_found")
//         }

//         const ticket = await reservationTicketsModel.insert(data)
//         return response.json({
//             success: true,
//             message: "add ticket successfully",
//             results: ticket
//         })

//     } catch (err) {
//         return errorHandler(response, err)
//     }
// }


