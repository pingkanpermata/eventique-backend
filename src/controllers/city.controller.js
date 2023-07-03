const errorHandler = require("../helpers/errorHandler.helper")
const cityModel = require("../models/cities.model")

exports.getCity  = async (request, response) => {
    try {
        const {sort, sortBy} = request.query
        const city = await cityModel.findAll(sort, sortBy)
        if(!city){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "list of city",
            results: city
        })
    } catch (err) {
        return errorHandler(response, err)
    }  
}

exports.getAllCities  = async (request, response) => {
    try {
        const {page, limit, search, sort, sortBy} = request.query

        const city = await cityModel.findAll(page, limit, search, sort, sortBy)
        if(!city){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "list of All city",
            results: city
        })
    } catch (err) {
        return errorHandler(response, err)
    }  
}
