const sectionRoute = require("express").Router()
const reservationSectionsController = require("../controllers/admin/reservationSections.controller")
const validate = require("../middlewares/validator.middleware")


sectionRoute.get("/", validate("getAll"), reservationSectionsController.getAllReservationSections)


module.exports = sectionRoute
