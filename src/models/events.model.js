const db = require("../helpers/db.helper")
const table = "events"


exports.findAll = async(page, limit, search, sort, sortBy) => {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page - 1) * limit
    const queries = `
    SELECT * FROM "${table}" WHERE "title" LIKE $3 ORDER BY "${sort}" ${sortBy} LIMIT $1 OFFSET $2
    `
    const values = [limit, offset, `%${search}%`]
    const {rows} = await db.query(queries, values)  
    return rows
}

exports.findEvent = async (searchName, searchCategory, searchLocation, page, limit, sort, sortBy) => {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 100
    searchName = searchName || ""
    searchCategory = searchCategory || ""
    searchLocation = searchLocation || ""
    sort = sort || "id"
    sortBy = sortBy || "DESC"
    const offset = (page - 1) * limit
    const queries = `
    SELECT
    "e"."id",
    "e"."picture",
    "e"."title" as "title",
    "e"."date",
    "c"."name" as "category",
    "city"."name" as "location"
    FROM "eventCategories" "ec"
    JOIN "events" "e" ON "e"."id" = "ec"."eventId"
    JOIN "categories" "c" ON "c"."id" = "ec"."categoryId"
    JOIN "cities" "city" ON "city"."id" = "e"."cityId"
    WHERE "e"."title" LIKE $3 AND "c"."name" LIKE $4 AND "city"."name" LIKE $5
    ORDER BY "${sort}" ${sortBy} LIMIT $1 OFFSET $2
    `
    const values = [limit, offset, `%${searchName}%`, `%${searchCategory}%`, `%${searchLocation}%`]
    const {rows} = await db.query(queries, values)
    return rows
}

exports.countEvent = async (searchName, searchCategory, searchLocation) => {

    searchName = searchName || ""
    searchCategory = searchCategory || ""
    searchLocation = searchLocation || ""
    
    const queries = `
    SELECT
    COUNT(*) AS "totalData"
    FROM "eventCategories" "ec"
    JOIN "events" "e" ON "e"."id" = "ec"."eventId"
    JOIN "categories" "c" ON "c"."id" = "ec"."categoryId"
    JOIN "cities" "city" ON "city"."id" = "e"."cityId"
    WHERE "e"."title" LIKE $1 AND "c"."name" LIKE $2 AND "city"."name" LIKE $3
  `
    const values = [`%${searchName}%`, `%${searchCategory}%`, `%${searchLocation}%`]
    const {rows} = await db.query(queries, values)
    return rows[0]
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

exports.findDetailEvent = async(id) => {
    const queries = `
    SELECT
    "e"."id",
    "e"."picture",
    "e"."title",
    "c"."name" AS "location",
    "e"."date",
    "e"."descriptions"
    FROM "events" "e"
    JOIN "cities" "c" ON "c"."id" = "e"."cityId"
    WHERE "e"."id" = $1
    `  
    const values = [id]
    const {rows} = await db.query(queries,values)  
    return rows[0]
}

exports.findEventByUserCreated = async(id) => {
    const queries = `
    SELECT
    "e"."id",
    "e"."title",
    "c"."name" AS "location",
    "e"."date",
    "e"."descriptions"
    FROM "events" "e"
    JOIN "cities" "c" ON "c"."id" = "e"."cityId"
    WHERE "e"."createdBy" = $1
    `  
    const values = [id]
    const {rows} = await db.query(queries,values)  
    return rows
}

exports.findPict = async(id) => {
    const queries = `
    SELECT "picture" FROM "${table}"
    WHERE "id" = $1
  `  
    const values = [id]
    const {rows} = await db.query(queries,values)  
    return rows[0]
}

exports.insert = async(data)=>{
    const queries = `
    INSERT INTO "${table}" (
      "picture",
      "title",
      "date",
      "cityId",
      "descriptions",
      "createdBy"
      )
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `
    const values = [
        data.picture,
        data.title,
        data.date,
        data.cityId,
        data.descriptions,
        data.createdBy
    ]
    const {rows} = await db.query(queries, values)
    return rows[0]
}

exports.update = async(id, data)=>{
    const queries = `
    UPDATE "${table}" SET
    "picture"=COALESCE(NULLIF($2,''), "picture"),
    "title"=COALESCE(NULLIF($3,''), "title"),
    "date"=COALESCE(NULLIF($4::DATE, NULL), "date"),
    "cityId"=COALESCE(NULLIF($5::INTEGER, NULL), "cityId"),
    "descriptions"=COALESCE(NULLIF($6,''), "descriptions"),
    "createdBy"=COALESCE(NULLIF($7::INTEGER, NULL), "createdBy")
    WHERE "id"=$1
    RETURNING *
    `
    const values = [
        id,
        data.picture,
        data.title,
        data.date,
        data.cityId,
        data.descriptions,
        data.createdBy
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
