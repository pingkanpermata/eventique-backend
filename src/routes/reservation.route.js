const reservationRouter = require("express").Router()
// const validate = require("../middlewares/validator.middleware")
const reservationController = require("../controllers/reservation.controller")
const validate = require("../middlewares/validator.middleware")


reservationRouter.post("/", validate("createReservation"), reservationController.createReservation)
// reservationRouter.post("/ticket", validate("createReservationTicket"), reservationController.pickTicket)

module.exports = reservationRouter
