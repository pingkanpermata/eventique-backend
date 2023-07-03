const eventRoute = require("express").Router()
const eventsController = require("../../controllers/admin/events.controller")
const validate = require("../../middlewares/validator.middleware")
const uploadMiddleware = require("../../middlewares/upload.middleware")



eventRoute.get("/",validate("getAll"), eventsController.getAllEvents)
eventRoute.get("/:id",validate("getOne"), eventsController.getOneEvent)
eventRoute.post("/", uploadMiddleware("picture"),validate("createEvent"), eventsController.createEvent)
eventRoute.patch("/:id", uploadMiddleware("picture"),validate("updateEvent"), eventsController.updateEvent)
eventRoute.delete("/:id",validate("delete"), eventsController.deleteEvent)

module.exports = eventRoute
