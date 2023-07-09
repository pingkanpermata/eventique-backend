const deviceTokenRouter = require("express").Router()

const deviceTokenController = require("../controllers/deviceToken.controller")

deviceTokenRouter.post("/", deviceTokenController.saveToken)

module.exports = deviceTokenRouter
