const reservationRoute = require("express").Router()
const reservationsController = require("../../controllers/admin/reservations.controller")
const validate = require("../../middlewares/validator.middleware")


reservationRoute.get("/" ,validate("getData"), reservationsController.getAllReservations)
reservationRoute.get("/:id" ,validate("getOne"), reservationsController.getOneReservation)
reservationRoute.post("/" ,validate("createReservations"), reservationsController.createReservation)
reservationRoute.patch("/:id" ,validate("updateReservations"), reservationsController.updateReservation)
reservationRoute.delete("/:id" ,validate("delete"), reservationsController.deleteReservation)

module.exports = reservationRoute
