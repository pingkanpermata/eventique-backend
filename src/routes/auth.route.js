const authRouter = require("express").Router()
const validate =  require("../middlewares/validator.middleware")
const authController = require("../controllers/auth.controller")

authRouter.post("/login",validate("authLogin"), authController.login)
authRouter.post("/register",validate("authRegister"), authController.register)
authRouter.post("/forgotPassword", authController.forgotPassword)
authRouter.post("/resetPassword", validate("resetPassword"), authController.resetPassword)


module.exports = authRouter
