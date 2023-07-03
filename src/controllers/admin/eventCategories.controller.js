const errorHandler = require("../../helpers/errorHandler.helper")
const eventCategoriesModel = require("../../models/eventCategories.model")
const eventsModel = require("../../models/events.model")
const categoriesModel = require("../../models/categories.model")

exports.getAllEventCategories = async(request, response)=>{
    try{
        const data = await eventCategoriesModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy,
        )
        return response.json({
            success: true,
            message:"list of all event categories",
            results:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.getOneEventCategory = async(request, response)=>{
    try{
        const data = await eventCategoriesModel.findOne(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message:"Detail event category",
            results:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.createEventCategory = async(request, response) => {
    try{
        const data = {
            ...request.body
        }

        const eventId = data.eventId
        const categoryId = data.categoryId

        if(eventId){
            const checkEvent = await eventsModel.findOne(eventId)
            if(!checkEvent){
                throw Error("data_not_found")
            }
        }
          
        if(categoryId){
            const checkCategory = await categoriesModel.findOne(categoryId)
            if(!checkCategory){
                throw Error("data_not_found")
            }
        }

        const checkDuplicate = await eventCategoriesModel.findOneByEventIdAndCategoryId(eventId, categoryId)
        if(checkDuplicate){
            throw Error("is_duplicate_data")
        }

        const eventCategory = await  eventCategoriesModel.insert(data)
        return response.json({
            success: true,
            message: "Create event category successfully",
            results: eventCategory
        })
    }catch(err){
        return errorHandler(response, err)
    }
}  

exports.updateEventCategory = async(request, response) => {
    try{
        const data = {
            ...request.body
        }

        const checkId = await eventCategoriesModel.findOne(request.params.id)
        if(!checkId){
            throw Error("data_not_found")
        }

        const eventId = data.eventId
        const categoryId = data.categoryId

        if(eventId){
            const checkEvent = await eventsModel.findOne(eventId)
            if(!checkEvent){
                throw Error("data_not_found")
            }
        }
          
        if(categoryId){
            const checkCategory = await categoriesModel.findOne(categoryId)
            if(!checkCategory){
                throw Error("data_not_found")
            }
        }

        const checkDuplicate = await eventCategoriesModel.findOneByEventIdAndCategoryId(eventId, categoryId)

        if(checkDuplicate){
            if(checkDuplicate.id !== request.params.id){
                throw Error("is_duplicate_data")
            }  
        }

        const eventCategory = await eventCategoriesModel.update(request.params.id, data)
        if(!eventCategory){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Update event category successfully",
            results: eventCategory
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.deleteEventCategory = async(request, response)=>{
    try {
        const data = await eventCategoriesModel.destroy(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Delete event category successfully",
            results:data
        })
    } catch (err) {
        return errorHandler(response,err)
    }
}
