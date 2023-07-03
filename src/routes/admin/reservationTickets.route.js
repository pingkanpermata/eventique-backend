const reservationTicketRoute = require("express").Router()
const reservationTicketsController = require("../../controllers/admin/reservationTickets.controller")
const validate = require("../../middlewares/validator.middleware")


reservationTicketRoute.get("/", validate("getData"), reservationTicketsController.getAllReservationTickets)
reservationTicketRoute.get("/:id", validate("getOne"), reservationTicketsController.getOneReservationTicket)
reservationTicketRoute.post("/", validate("createReservationTickets"), reservationTicketsController.createReservationTicket)
reservationTicketRoute.patch("/:id", validate("updateReservationTickets"), reservationTicketsController.updateReservationTicket)
reservationTicketRoute.delete("/:id", validate("delete"), reservationTicketsController.deleteReservationTicket)

module.exports = reservationTicketRoute
