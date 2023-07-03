const changePasswordRouter = require("express").Router()
const changePasswordController = require("../controllers/changePassword.controller")
const validate = require("../middlewares/validator.middleware")

changePasswordRouter.post("/", validate("changePassword"), changePasswordController.changePassword)

module.exports = changePasswordRouter
