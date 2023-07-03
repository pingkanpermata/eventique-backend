const paymentRouter = require("express").Router()
const validate = require("../middlewares/validator.middleware")
const paymentController = require("../controllers/payment.controller")

paymentRouter.post("/", validate("makePayment"), paymentController.makePayment)


module.exports = paymentRouter
