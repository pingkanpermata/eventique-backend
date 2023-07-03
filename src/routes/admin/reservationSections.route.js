const reservationSectionRoute = require("express").Router()
const reservationSectionsController = require("../../controllers/admin/reservationSections.controller")
const validate = require("../../middlewares/validator.middleware")


reservationSectionRoute.get("/", validate("getAll"), reservationSectionsController.getAllReservationSections)
reservationSectionRoute.get("/:id", validate("getOne"), reservationSectionsController.getOneReservationSection)
reservationSectionRoute.post("/", validate("createReservationSection"), reservationSectionsController.createReservationSection)
reservationSectionRoute.patch("/:id", validate("updateReservationSection"), reservationSectionsController.updateReservationSection)
reservationSectionRoute.delete("/:id",validate("delete"), reservationSectionsController.deleteReservationSection)

module.exports = reservationSectionRoute
