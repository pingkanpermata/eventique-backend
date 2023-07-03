const errorHandler = require("../helpers/errorHandler.helper")
const categoryModel = require("../models/categories.model")


exports.getCategory = async (request, response) => {
    try {

        const {sort, sortBy} = request.query
        const category = await categoryModel.findAllCategory(sort,sortBy)

        if(!category){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "list of category",
            results: category
        })
    } catch (err) {
        return errorHandler(response, err)
    }
}
