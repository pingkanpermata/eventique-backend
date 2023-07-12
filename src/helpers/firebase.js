var admin = require("firebase-admin")

var serviceAccount = require("../../gendhis-s-project-firebase-adminsdk-5g2nt-1e6beadf94.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

module.exports = admin
