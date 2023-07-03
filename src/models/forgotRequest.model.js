const db = require("../helpers/db.helper")


exports.findAll = async(page, limit, search, sort, sortBy) => {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page - 1) * limit
    const queries = `
    SELECT * FROM "forgotRequest" WHERE "email" LIKE $3 ORDER BY "${sort}" ${sortBy} LIMIT $1 OFFSET $2
    `
    const values = [limit, offset, `%${search}%`]
    const {rows} = await db.query(queries, values)  
    return rows
}

exports.findOne = async(id) => {
    const queries = `
    SELECT * FROM "forgotRequest"
    WHERE "id" = $1
    `  
    const values = [id]
    const {rows} = await db.query(queries,values)  
    return rows[0]
}

exports.findOneByEmail = async(email) => {
    const queries = `
    SELECT * FROM "forgotRequest"
    WHERE "email" = $1
    `  
    const values = [email]
    const {rows} = await db.query(queries,values)  
    return rows[0]
}

exports.findOneByEmailAndCode= async(email, code) => {
    const queries = `
    SELECT * FROM "forgotRequest"
    WHERE "email" = $1 AND "code" = $2
    `  
    const values = [email, code]
    const {rows} = await db.query(queries,values)  
    return rows[0]
}


exports.findOneByEmailAndStatusCode = async(email, statusCode) => {
    const queries = `
    SELECT * FROM "forgotRequest"
    WHERE "email" = $1 AND "statusCode" = $2
    `  
    const values = [email, statusCode]
    const {rows} = await db.query(queries,values)  
    return rows[0]
}

exports.findOneByCode = async(code) => {
    const queries = `
    SELECT * FROM "forgotRequest"
    WHERE "code" = $1
    `
    const values = [code]
    const {rows} = await db.query(queries,values)  
    return rows[0]
}

exports.insert = async(data)=>{
    const queries = `
    INSERT INTO "forgotRequest" ("email", "code", "statusCode")
    VALUES ($1, $2, $3) RETURNING *
    `
    const values = [data.email, data.code, data.statusCode]
    const {rows} = await db.query(queries, values)

    return rows[0]
}

exports.update = async(id, data)=>{
    const queries = `
    UPDATE "forgotRequest" SET
    "email"=COALESCE(NULLIF($2,''), "email"),
    "code"=COALESCE(NULLIF($3,''), "code")
    WHERE "id"=$1
    RETURNING *
    `
    const values = [id, data.email, data.code]

    const {rows} = await db.query(queries, values)
    return rows[0]
}
exports.updateStatusCode = async(email, statusCode, inActiveReqCode)=>{

    console.log("email:" + email)
    console.log("statusCode:" + statusCode)
    console.log("inActiveReqCode:" + inActiveReqCode)

    const queries = `
    UPDATE "forgotRequest" SET
    "statusCode"=$3
    WHERE "email"=$1 AND "statusCode" = $2
    RETURNING *
    `
    const values = [email, statusCode, inActiveReqCode]

    const {rows} = await db.query(queries, values)
    return rows[0]
}

exports.destroy = async(id)=>{
    const queries = `
    DELETE FROM "forgotRequest"
    WHERE "id"=$1
    RETURNING *
    `
    const values = [id]

    const {rows} = await db.query(queries, values)
    return rows[0]
}
