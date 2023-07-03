const wishlistRouter = require("express").Router()
// const validate = require("../middlewares/validator.middleware")
const wishlistController = require("../controllers/wishlist.controller")
const validate = require("../middlewares/validator.middleware")

wishlistRouter.get("/", wishlistController.getWishlist)
wishlistRouter.get("/check", wishlistController.checkingWishlist)
wishlistRouter.post("/", validate("manageWishlist"), wishlistController.manageWishlist)

module.exports = wishlistRouter
