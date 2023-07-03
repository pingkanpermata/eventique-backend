const eventCategoryRoute = require("express").Router()
const eventCategoriesController = require("../../controllers/admin/eventCategories.controller")
const validate = require("../../middlewares/validator.middleware")


eventCategoryRoute.get("/",validate("getData"), eventCategoriesController.getAllEventCategories)
eventCategoryRoute.get("/:id",validate("getOne"), eventCategoriesController.getOneEventCategory)
eventCategoryRoute.post("/",validate("createEventCategory"), eventCategoriesController.createEventCategory)
eventCategoryRoute.patch("/:id",validate("updateEventCategory"), eventCategoriesController.updateEventCategory)
eventCategoryRoute.delete("/:id",validate("delete"), eventCategoriesController.deleteEventCategory)

module.exports = eventCategoryRoute
