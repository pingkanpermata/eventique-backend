require("dotenv").config({
    path: ".env"
})

const express = require("express")

const cors = require("cors")

const app = express()
app.use(express.urlencoded({extended:false}))

// app.use(cors({
//     origin: "http://localhost:5173",
//     optionsSuccessStatus: 200,
// }))

// var whitelist = ["https://gndsulistiawan-fw15-frontend.netlify.app","http://localhost:5173", "http://127.0.0.1:5173"]
// var corsOptions = {
//     origin: function (origin, callback) {
//         if ((origin === undefined) || (whitelist.indexOf(origin) !== -1)) {
//             callback(null, true)
//         } else {
//             callback(new Error("Not allowed by CORS"))
//         }
//     }
// }

// app.use(cors(corsOptions))

app.use(cors())


// app.use((request, response, next)=> {
//     response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173"),
//     response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS"),
//     response.setHeader("Access-Control-Allow-Headers", "Content-type")
//     next()
// })

app.use("/uploads", express.static("uploads"))

app.use("/", require("./src/routes"))

const PORT = process.env.PORT
app.listen(PORT, ()=> {
    console.log(`app running on port ${PORT}`)
})

process.env.TZ
console.log(new Date().toString())
