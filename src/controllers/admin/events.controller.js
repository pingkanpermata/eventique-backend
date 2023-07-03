const errorHandler = require("../../helpers/errorHandler.helper")
const eventsModel = require("../../models/events.model")
const profilesModel = require("../../models/profiles.model")
const categoriesModel = require("../../models/categories.model")
const citiesModel = require("../../models/cities.model")
const eventCategoryModel = require("../../models/eventCategories.model")
const fileRemover = require("../../helpers/fileRemover.helper")
const fs = require("fs")

exports.getAllEvents = async(request, response)=>{
    try{
        const data = await eventsModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy,
        )
        return response.json({
            success: true,
            message:"list of all events",
            results:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.getOneEvent = async(request, response)=>{
    try{
        const data = await eventsModel.findOne(request.params.id)

        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message:"Detail event",
            results:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.createEvent = async(request, response) => {
    try{
        const {id} = request.user
        if(!id){
            throw Error("unauthorized")
        }

        const createdUser = await profilesModel.findOneByUserId(id)
        if(!createdUser){
            throw Error("data_not_found")
        }
        
        const data = {
            ...request.body,
            createdBy: id
        }

        if(data.cityId){
            const checkCity = await citiesModel.findOne(data.cityId)
            if(!checkCity){
                throw Error("data_not_found")
            }
        }

        if(data.categoryId){
            const checkCategory = await categoriesModel.findOne(data.categoryId)
            if(!checkCategory){
                throw Error("data_not_found")
            }
        }

        if(request.file){
            data.picture = request.file.filename
        }
        const event = await  eventsModel.insert(data)

        const eventCategoriesData = {
            eventId: event.id,
            categoryId: data.categoryId
        }

        const results = {
            ...event,
            createdBy: createdUser?.fullName
        }
        
        await eventCategoryModel.insert(eventCategoriesData)
        return response.json({
            success: true,
            message: "Create event successfully",
            results: results
        })
    }catch(err){
        fileRemover(request.file)
        return errorHandler(response, err)
    }
}


exports.updateEvent = async(request, response) => {
    try{

        const data = {
            ...request.body
        }

        if(data.cityId){
            const checkCity = await citiesModel.findOne(data.cityId)
            if(!checkCity){
                throw Error("data_not_found")
            }
        }

        if(request.file){
            const oldPict = await eventsModel.findPict(request.params.id)
            const fileName = `uploads/${oldPict.picture}`
            if(fileName){
                fs.unlink(fileName, (response,err)=>{
                    if(err){
                        return errorHandler(response, err)
                    }
                })
            }
            data.picture = request.file.filename
        }

        const event = await eventsModel.update(request.params.id, data)
        if(!event){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Update event successfully",
            results: event
        })
        
        
    }catch(err){
        fileRemover(request.file)
        return errorHandler(response, err)
    }

}

exports.deleteEvent = async(request, response)=>{
  
    try {
        const oldPict = await eventsModel.findPict(request.params.id)
        const fileName = `uploads/${oldPict.picture}`
        if(fileName){
            fs.unlink(fileName, (response,err)=>{
                if(err){
                    return errorHandler(response, err)
                }
            })
        }
        
        const data = await eventsModel.destroy(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Delete event successfully",
            results:data
        })
    } catch (err) {
        return errorHandler(response,err)
    }

    
}
