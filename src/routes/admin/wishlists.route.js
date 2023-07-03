const wishlistRoute = require("express").Router()
const wishlistsController = require("../../controllers/admin/wishlists.controller")
const validate = require("../../middlewares/validator.middleware")


wishlistRoute.get("/", validate("getData"), wishlistsController.getAllWishlists)
wishlistRoute.get("/:id", validate("getOne"), wishlistsController.getOneWishlist)
wishlistRoute.post("/", validate("createWishlist"), wishlistsController.createWishlist)
wishlistRoute.patch("/:id", validate("updateWishlist"), wishlistsController.updateWishlist)
wishlistRoute.delete("/:id", validate("delete"), wishlistsController.deleteWishlist)

module.exports = wishlistRoute
