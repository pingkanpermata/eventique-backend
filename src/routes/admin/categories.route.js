const categoryRoute = require("express").Router()
const categoriesController = require("../../controllers/admin/categories.controller")
const validate = require("../../middlewares/validator.middleware")


categoryRoute.get("/",validate("getAll"), categoriesController.getAllCategories)
categoryRoute.get("/:id",validate("getOne"), categoriesController.getOneCategory)
categoryRoute.post("/",validate("createCategory"), categoriesController.createCategory)
categoryRoute.patch("/:id",validate("updateCategory"), categoriesController.updateCategory)
categoryRoute.delete("/:id",validate("delete"), categoriesController.deleteCategory)

module.exports = categoryRoute
