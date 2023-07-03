const historyRouter = require("express").Router()
const historyController = require("../controllers/history.controller")
const validate = require("../middlewares/validator.middleware")

historyRouter.get("/", historyController.getHistory)
historyRouter.get("/:id", validate("getOne"), historyController.getDetailHistory)

module.exports = historyRouter
