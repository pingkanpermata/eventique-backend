const userRouter = require("express").Router()
const userController = require("../../controllers/admin/users.controller")
const validate = require("../../middlewares/validator.middleware")
// const uploadMiddleware = require("../../middlewares/upload.middleware")



userRouter.get("/",validate("getAll"), userController.getAllUsers)
userRouter.get("/:id",validate("getOne"), userController.getOneUser)
userRouter.post("/", validate("createUser"), userController.createUser)
// userRouter.patch("/:id", uploadMiddleware("picture"), validate("updateUser"), userController.updateUser)
userRouter.patch("/:id", validate("updateUser"), userController.updateUser)
userRouter.delete("/:id",validate("delete"), userController.deleteUser)

module.exports = userRouter
