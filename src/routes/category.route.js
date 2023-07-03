const categoryRouter = require("express").Router()
const categoryController = require("../controllers/category.controller")
const validate = require("../middlewares/validator.middleware")

categoryRouter.get("/", validate("getAll"), categoryController.getCategory)

module.exports = categoryRouter
