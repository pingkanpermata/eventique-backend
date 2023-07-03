const eventRouter = require("express").Router()
const validate = require("../middlewares/validator.middleware")
const eventController = require("../controllers/event.controller")
const uploadMiddleware = require("../middlewares/upload.middleware")
const authMiddleware = require("../middlewares/auth.middleware")


eventRouter.get("/", validate("getAll"), eventController.getEvent)
eventRouter.get("/manage", validate("getAll"), authMiddleware, eventController.getOurEventCreate)
eventRouter.get("/:id", validate("getOne"), eventController.getDetailEvent)
eventRouter.patch("/manage", authMiddleware, uploadMiddleware("picture"), validate("createEventManage"), eventController.createOurEvent)
eventRouter.patch("/manage/:id", authMiddleware, uploadMiddleware("picture"), validate("getOne"), eventController.updateOurEvent)
eventRouter.get("/manage/:id", authMiddleware, validate("getOne"), eventController.getDetailEvent)
eventRouter.delete("/manage/:id", authMiddleware, validate("delete"), eventController.deleteEvent)

// eventRouter.post("/" , eventController.manageWishlist)

module.exports = eventRouter
