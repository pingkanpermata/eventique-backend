const {Pool} = require("pg")

const db = new Pool({
    connectionString: process.env.DATABASE_URL
})

db.connect().then(()=>{
    // console.log(stat)
    console.log("Database connected!")
    let dateFormat = new Date()
    console.log(dateFormat)
}).catch((error)=>{
    console.log(error.message)
    console.log(`Error Code : ${error.code}`)
    console.log("Database connection failed!")
})

module.exports = db
