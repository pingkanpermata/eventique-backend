const paymentMethodRoute = require("express").Router()
const paymentMethodsController = require("../../controllers/admin/paymentMethods.controller")
const validate = require("../../middlewares/validator.middleware")


paymentMethodRoute.get("/", validate("getAll"), paymentMethodsController.getAllPaymentMethods)
paymentMethodRoute.get("/:id", validate("getOne"), paymentMethodsController.getOnePaymentMethod)
paymentMethodRoute.post("/", validate("createPaymentMethod"), paymentMethodsController.createPaymentMethod)
paymentMethodRoute.patch("/:id", validate("updatePaymentMethod"), paymentMethodsController.updatePaymentMethod)
paymentMethodRoute.delete("/:id", validate("delete"), paymentMethodsController.deletePaymentMethod)

module.exports = paymentMethodRoute
