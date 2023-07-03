const admin = require("express").Router()

admin.use("/users", require("./users.route"))
admin.use("/profiles", require("./profiles.route"))
admin.use("/cities", require("./cities.route"))
admin.use("/categories", require("./categories.route"))
admin.use("/events", require("./events.route"))
admin.use("/eventCategories", require("./eventCategories.route"))
admin.use("/partners", require("./partners.route"))
admin.use("/reservationSections", require("./reservationSections.route"))
admin.use("/reservationStatus", require("./reservationStatus.route"))
admin.use("/paymentMethods", require("./paymentMethods.route"))
admin.use("/reservations", require("./reservations.route"))
admin.use("/reservationTickets", require("./reservationTickets.route"))
admin.use("/wishlists", require("./wishlists.route"))

module.exports = admin
