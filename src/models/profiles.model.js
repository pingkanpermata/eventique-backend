const db = require("../helpers/db.helper")
const table = "profiles"


exports.findAll = async(page, limit, search, sort, sortBy) => {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page - 1) * limit
    const queries = `
    SELECT * FROM "${table}" WHERE "fullName" LIKE $3 ORDER BY "${sort}" ${sortBy} LIMIT $1 OFFSET $2
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
exports.findUserId = async(id) => {
    const queries = `
    SELECT * FROM "${table}"
    WHERE "userId" = $1
  `  
    const values = [id]
    const {rows} = await db.query(queries,values)  
    return rows[0]
}

// exports.findOneByUserId = async(userId) => {
//     const queries = `
//     SELECT * FROM "${table}"
//     WHERE "userId" = $1
//   `  
//     const values = [userId]
//     const {rows} = await db.query(queries,values)  
//     return rows[0]
// }

exports.findOneByUserId = async(userId) => {
    const queries = `
    SELECT
    "usr"."id",
    "prof"."userId",
    "prof"."picture",
    "prof"."fullName",
    "usr"."email",
    "prof"."phoneNumber",
    "prof"."gender",
    "prof"."profession",
    "prof"."nationality",
    "prof"."birthDate",
    "prof"."createdAt",
    "prof"."updatedAt"
    
    FROM "${table}" "prof"
    INNER JOIN "users" "usr" ON "usr"."id" = "prof"."userId"
    WHERE "prof"."userId" = $1
  `  
    const values = [userId]
    const {rows} = await db.query(queries,values)  
    return rows[0]
}

exports.findUserPict = async(id) => {
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
      "userId",
      "picture",
      "fullName",
      "phoneNumber",
      "gender",
      "profession",
      "nationality",
      "birthDate"
      )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
    `
    const values = [
        data.userId,
        data.picture,
        data.fullName,
        data.phoneNumber,
        data.gender,
        data.profession,
        data.nationality,
        data.birthDate,
    ]
    const {rows} = await db.query(queries, values)

    return rows[0]
}

exports.update = async(id, data)=>{
    const queries = `
    UPDATE "${table}" SET
    "userId"=COALESCE(NULLIF($2::INTEGER, NULL), "userId"),
    "picture"=COALESCE(NULLIF($3,''), "picture"),
    "fullName"=COALESCE(NULLIF($4,''), "fullName"),
    "phoneNumber"=COALESCE(NULLIF($5,''), "phoneNumber"),
    "gender"=COALESCE(NULLIF($6::INTEGER, NULL), "gender"),
    "profession"=COALESCE(NULLIF($7,''), "profession"),
    "nationality"=COALESCE(NULLIF($8,''), "nationality"),
    "birthDate"=COALESCE(NULLIF($9::DATE, NULL), "birthDate")
    WHERE "id"=$1
    RETURNING *
    `
    const values = [
        id,
        data.userId,
        data.picture,
        data.fullName,
        data.phoneNumber,
        data.gender,
        data.profession,
        data.nationality,
        data.birthDate
    ]

    const {rows} = await db.query(queries, values)
    return rows[0]
}
exports.updateByUserId = async(userId, data)=>{
    const queries = `
    UPDATE "${table}" SET
    "picture"=COALESCE(NULLIF($2,''), "picture"),
    "fullName"=COALESCE(NULLIF($3,''), "fullName"),
    "phoneNumber"=COALESCE(NULLIF($4,''), "phoneNumber"),
    "gender"=COALESCE(NULLIF($5::INTEGER, NULL), "gender"),
    "profession"=COALESCE(NULLIF($6,''), "profession"),
    "nationality"=COALESCE(NULLIF($7,''), "nationality"),
    "birthDate"=COALESCE(NULLIF($8::DATE, NULL), "birthDate")
    WHERE "userId"=$1
    RETURNING *
    `
    const values = [
        userId,
        data.picture,
        data.fullName,
        data.phoneNumber,
        data.gender,
        data.profession,
        data.nationality,
        data.birthDate
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
