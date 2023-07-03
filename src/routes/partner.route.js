const partnerRouter = require("express").Router()
const partnerController = require("../controllers/partner.controller")
const validate = require("../middlewares/validator.middleware")

partnerRouter.get("/", validate("getAll"), partnerController.getPartner)

module.exports = partnerRouter
