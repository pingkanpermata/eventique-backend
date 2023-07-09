const db = require("../helpers/db.helper")

const table = "deviceToken"

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
