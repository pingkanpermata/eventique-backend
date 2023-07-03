const partnerRoute = require("express").Router()
const partnersController = require("../../controllers/admin/partners.controller")
const validate = require("../../middlewares/validator.middleware")
const uploadMiddleware = require("../../middlewares/upload.middleware")



partnerRoute.get("/", validate("getAll"), partnersController.getAllPartners)
partnerRoute.get("/:id", validate("getOne"), partnersController.getOnePartner)
partnerRoute.post("/", uploadMiddleware("picture"), validate("createPartner"), partnersController.createPartner)
partnerRoute.patch("/:id", uploadMiddleware("picture"), validate("updatePartner"), partnersController.updatePartner)
partnerRoute.delete("/:id",validate("delete"), partnersController.deletePartner)

module.exports = partnerRoute
