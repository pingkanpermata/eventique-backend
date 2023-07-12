const db = require("../helpers/db.helper")

const table = "deviceToken"

exports.findAll = async(page, limit, sort, sortBy) => {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page - 1) * limit
    const queries = `
  SELECT * FROM "${table}" ORDER BY "${sort}" ${sortBy} LIMIT $1 OFFSET $2
  `
    const values = [limit, offset]
    const {rows} = await db.query(queries, values)  
    return rows
}


exports.insertToken = async function(id, data){
    const query = `
  INSERT INTO "${table}"
  ("token", "userId")
  VALUES ($1, $2) RETURNING *
  `
    const values = [data.token, id]
    const {rows} = await db.query(query, values)
    return rows[0]
}
