const errorHandler = require("../helpers/errorHandler.helper")
const partnerModel = require("../models/partners.model")

exports.getPartner  = async (request, response) => {
    try {
        const {page, sort, sortBy} = request.query
        const limit = 6
        const partner = await partnerModel.findAll(page, limit, sort, sortBy)
        if(!partner){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "list of partner",
            results: partner
        })
    } catch (err) {
        return errorHandler(response, err)
    }  
}
