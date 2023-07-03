const profileRoute = require("express").Router()
const profileController = require("../../controllers/admin/profiles.controller")
const validate = require("../../middlewares/validator.middleware")
const uploadMiddleware = require("../../middlewares/upload.middleware")



profileRoute.get("/",validate("getAll"), profileController.getAllUserProfiles)
profileRoute.get("/:id",validate("getOne"), profileController.getOneUserProfile)
profileRoute.post("/", uploadMiddleware("picture"), validate("createProfile"), profileController.createUserProfile)
profileRoute.patch("/:id", uploadMiddleware("picture"), validate("updateProfile"), profileController.updateUserProfile)
profileRoute.delete("/:id",validate("delete"), profileController.deleteUserProfile)

module.exports = profileRoute
