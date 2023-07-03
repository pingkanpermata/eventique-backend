const db = require("../helpers/db.helper")
const table = "categories"


exports.findAll = async(page, limit, search, sort, sortBy) => {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page - 1) * limit
    const queries = `
    SELECT * FROM "${table}" WHERE "name" LIKE $3 ORDER BY "${sort}" ${sortBy} LIMIT $1 OFFSET $2
    `
    const values = [limit, offset, `%${search}%`]
    const {rows} = await db.query(queries, values)  
    return rows
}

exports.findAllCategory = async(sort, sortBy) => {
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const queries = `
    SELECT * FROM "${table}" ORDER BY "${sort}" ${sortBy}
    `
    const {rows} = await db.query(queries)  
    return rows
}

exports.findOne = async(id) => {
    const queries = `
    SELECT * FROM "${table}"
    WHERE "id" = $1
  `  
    const values = [id]
    const {rows} = await db.query(queries,values)  
    return rows[0]
}
exports.findByName = async(name) => {
    const queries = `
    SELECT * FROM "${table}"
    WHERE "name" = $1
  `  
    const values = [name]
    const {rows} = await db.query(queries,values)  
    return rows[0]
}

exports.insert = async(data)=>{
    const queries = `
    INSERT INTO "${table}" (
      "name"
      )
    VALUES ($1) RETURNING *
    `
    const values = [
        data.name
    ]
    const {rows} = await db.query(queries, values)
    return rows[0]
}

exports.update = async(id, data)=>{
    const queries = `
    UPDATE "${table}" SET
    "name"=COALESCE(NULLIF($2,''), "name")
    WHERE "id"=$1
    RETURNING *
    `
    const values = [
        id,
        data.name,
    ]

    const {rows} = await db.query(queries, values)
    return rows[0]
}

exports.destroy = async(id)=>{
    const queries = `
  DELETE FROM "${table}"
  WHERE "id"=$1
  RETURNING *
  `
    const values = [id]

    const {rows} = await db.query(queries, values)
    return rows[0]
}
