const errorHandler = require("../../helpers/errorHandler.helper")
const wishlistsModel = require("../../models/wishlists.model")
const eventsModel = require("../../models/events.model")
const usersModel = require("../../models/users.model")

exports.getAllWishlists = async(request, response)=>{
    try{
        const data = await wishlistsModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy,
        )
        return response.json({
            success: true,
            message:"list of all wishlists",
            result:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.getOneWishlist = async(request, response)=>{
    try{
        const data = await wishlistsModel.findOne(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message:"Detail wishlist",
            result:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.createWishlist = async(request, response) => {
    try{
        const data = {
            ...request.body
        }

        const userId = data.userId
        const eventId = data.eventId

        if(eventId){
            const checkEvent = await eventsModel.findOne(eventId)
            if(!checkEvent){
                throw Error("event_not_found")
            }
        }

        if(userId){
            const checkUser = await usersModel.findOne(userId)
            if(!checkUser){
                throw Error("data_not_found")
            }
        }

        const checkDuplicate = await wishlistsModel.findOneByUserIdAndEventId(userId, eventId)
        if(checkDuplicate){
            throw Error("is_duplicate_data")
        }        

        const wishlist = await  wishlistsModel.insert(data)
        return response.json({
            success: true,
            message: "Create wishlist successfully",
            result: wishlist
        })
    }catch(err){
        return errorHandler(response, err)
    }
}  

exports.updateWishlist = async(request, response) => {
    try{
        const data = {
            ...request.body
        }

        const checkId = await wishlistsModel.findOne(request.params.id)
        if(!checkId){
            throw Error("data_not_found")
        }

        const userId = data.userId
        const eventId = data.eventId

        if(eventId){
            const checkEvent = await eventsModel.findOne(eventId)
            if(!checkEvent){
                throw Error("event_not_found")
            }
        }

        if(userId){
            const checkUser = await usersModel.findOne(userId)
            if(!checkUser){
                throw Error("data_not_found")
            }
        }

        const checkDuplicate = await wishlistsModel.findOneByUserIdAndEventId(userId, eventId)
        if(checkDuplicate){
            if(checkDuplicate.id !== request.params.id){
                throw Error("is_duplicate_data")
            }  
        }

        const wishlist = await wishlistsModel.update(request.params.id, data)
        if(!wishlist){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Update wishlist successfully",
            response: wishlist
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.deleteWishlist = async(request, response)=>{
    try {
        const data = await wishlistsModel.destroy(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Delete wishlist successfully",
            result:data
        })
    } catch (err) {
        return errorHandler(response,err)
    }
}
