const db = require("../helpers/db.helper")
const table = "eventCategories"


exports.findAll = async(page, limit, search, sort, sortBy) => {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page - 1) * limit
    const queries = `
  SELECT * FROM "${table}" WHERE "id"::TEXT LIKE $3 ORDER BY "${sort}" ${sortBy} LIMIT $1 OFFSET $2
  `
    const values = [limit, offset, `%${search}%`]
    const {rows} = await db.query(queries, values)  
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
exports.findOneByEventIdAndCategoryId = async(eventId, categoryId) => {
    const queries = `
    SELECT * FROM "${table}"
    WHERE "eventId" = $1 AND "categoryId" = $2
  `  
    const values = [eventId, categoryId]
    const {rows} = await db.query(queries,values)  
    return rows[0]
}

exports.insert = async(data)=>{
    const queries = `
    INSERT INTO "${table}" (
      "eventId",
      "categoryId"
      )
    VALUES ($1, $2) RETURNING *
    `
    const values = [
        data.eventId,
        data.categoryId
    ]
    const {rows} = await db.query(queries, values)
    return rows[0]
}

exports.update = async(id, data)=>{
    const queries = `
    UPDATE "${table}" SET
    "eventId"=COALESCE(NULLIF($2::INTEGER, NULL), "eventId"),
    "categoryId"=COALESCE(NULLIF($3::INTEGER, NULL), "categoryId")
    WHERE "id"=$1
    RETURNING *
    `
    const values = [
        id,
        data.eventId,
        data.categoryId
    ]

    const {rows} = await db.query(queries, values)
    return rows[0]
}
exports.updateByEventId = async(id, data)=>{
    const queries = `
    UPDATE "${table}" SET
    "categoryId"=COALESCE(NULLIF($2::INTEGER, NULL), "categoryId")
    WHERE "eventId"=$1
    RETURNING *
    `
    const values = [
        id,
        data.categoryId
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
exports.deleteByEventId = async(id)=>{
    const queries = `
  DELETE FROM "${table}"
  WHERE "eventId"=$1
  RETURNING *
  `
    const values = [id]

    const {rows} = await db.query(queries, values)
    return rows[0]
}
