const reservationStatusRoute = require("express").Router()
const reservationStatusController = require("../../controllers/admin/reservationStatus.controller")
const validate = require("../../middlewares/validator.middleware")


reservationStatusRoute.get("/", validate("getAll"), reservationStatusController.getAllReservationStatus)
reservationStatusRoute.get("/:id", validate("getOne"), reservationStatusController.getOneReservationStatus)
reservationStatusRoute.post("/", validate("createReservationStatus"), reservationStatusController.createReservationStatus)
reservationStatusRoute.patch("/:id", validate("updateReservationStatus"), reservationStatusController.updateReservationStatus)
reservationStatusRoute.delete("/:id", validate("delete"), reservationStatusController.deleteReservationStatus)

module.exports = reservationStatusRoute
