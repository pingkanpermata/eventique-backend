const cityRoute = require("express").Router()
const citiesController = require("../../controllers/admin/cities.controller")
const validate = require("../../middlewares/validator.middleware")
const uploadMiddleware = require("../../middlewares/upload.middleware")



cityRoute.get("/",validate("getAll"), citiesController.getAllCities)
cityRoute.get("/:id",validate("getOne"), citiesController.getOneCity)
cityRoute.post("/", uploadMiddleware("picture"),validate("createCity"), citiesController.createCity)
cityRoute.patch("/:id", uploadMiddleware("picture"),validate("updateCity"), citiesController.updateCity)
cityRoute.delete("/:id",validate("delete"), citiesController.deleteCity)

module.exports = cityRoute
