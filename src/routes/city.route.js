const cityRouter = require("express").Router()
const cityController = require("../controllers/city.controller")
const validate = require("../middlewares/validator.middleware")

cityRouter.get("/", validate("getAll"), cityController.getCity)
cityRouter.get("/all-cities", validate("getAll"), cityController.getAllCities)

module.exports = cityRouter
