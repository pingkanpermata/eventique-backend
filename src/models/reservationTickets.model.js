const db = require("../helpers/db.helper")
const table = "reservationTickets"


// exports.findAll = async(page, limit) => {
//     page = parseInt(page) || 1
//     limit = parseInt(limit) || 5
//     const offset = (page - 1) * limit
//     const queries = `
//     SELECT * FROM "${table}" LIMIT $1 OFFSET $2
//     `
//     const values = [limit, offset]
//     const {rows} = await db.query(queries, values)  
//     return rows
// }

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
exports.getInfo = async(id) => {
    const queries = `
    SELECT
    "r"."id" AS "reservationId",
    "e"."id" AS "eventId",
    "e"."title" AS "eventName",
    "rs"."name" AS "section",
    "rs"."price" AS "price",
    "rt"."quantity" AS "quantity",
    "rsta"."name" AS "reservatioinStatus",
    "pm"."name" AS "paymentMethod"
    FROM "reservationTickets" "rt"
    INNER JOIN "reservationSections" "rs" ON "rs"."id" = "rt"."sectionId"
    INNER JOIN "reservations" "r" ON "r"."id" = "rt"."reservationId"
    INNER JOIN "events" "e" ON "e"."id" = "r"."eventId"
    INNER JOIN "reservationStatus" "rsta" ON "rsta"."id" = "r"."statusId"
    INNER JOIN "paymentMethods" "pm" ON "pm"."id" = "r"."paymentMethodId"
    WHERE "r"."id" = $1
    `  
    const values = [id]
    const {rows} = await db.query(queries,values)  
    return rows[0]
}

exports.insert = async(data)=>{
    const queries = `
    INSERT INTO "${table}" (
      "reservationId",
      "sectionId",
      "quantity"
      )
    VALUES ($1, $2, $3) RETURNING *
    `
    const values = [
        data.reservationId,
        data.sectionId,
        data.quantity
    ]
    const {rows} = await db.query(queries, values)
    return rows[0]
}

exports.update = async(id, data)=>{
    const queries = `
    UPDATE "${table}" SET
    "reservationId"= $2,
    "sectionId"= $3,
    "quantity"= $4
    WHERE "id" = $1
    RETURNING *
    `
    const values = [
        id,
        data.reservationId,
        data.sectionId,
        data.quantity
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
