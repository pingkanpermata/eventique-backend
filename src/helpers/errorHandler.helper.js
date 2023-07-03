const errorHandler = (response, err) => {
    console.log(err)

    if(err?.message?.includes("invalid input syntax for type integer")){
        return response.status(409).json({
            success: false,
            message: "Invalid parameter!",
        })
    }
    if(err?.message?.includes("users_email_key")){
        return response.status(409).json({
            success: false,
            message: "Email has already been taken!",
            results: [
                {
                    value: "form email",
                    msg: "Email has already been taken!!",
                    param: "email",
                    location: "body"
                }
            ]
        })
    }
    if(err?.message?.includes("duplicate key")){
        return response.status(409).json({
            success: false,
            message: "Error duplicate key!",
        })
    }
    if(err?.message?.includes("no such file or directory")){
        return response.status(409).json({
            success: false,
            message: "no such file or directory!",
        })
    }
    if(err?.message?.includes("invalid_term_and_condition")){
        return response.status(409).json({
            success: false,
            message: "Please accept terms and condition!",
        })
    }
    if(err?.message?.includes("no_user")){
        return response.status(409).json({
            success: false,
            message: "Your email not registered!",
        })
    }
    if(err?.message?.includes("forgot_failed")){
        return response.status(409).json({
            success: false,
            message: "Error: Error request forgot password!",
        })
    }
    if(err?.message?.includes("code_invalid")){
        return response.status(409).json({
            success: false,
            message: "Code invalid, pelase insert the newest code or request again!",
        })
    }
    if(err?.message?.includes("payment_method_not_found")){
        return response.status(404).json({
            success: false,
            message: "Invalid! Payment method not found",
        })
    }
    if(err?.message?.includes("data_user_not_found")){
        return response.status(404).json({
            success: false,
            message: "Invalid! ID or User not found",
        })
    }
    if(err?.message?.includes("password_not_match")){
        return response.status(404).json({
            success: false,
            message: "Invalid! Old Password not match",
        })
    }
    if(err?.message?.includes("change_password_failed")){
        return response.status(404).json({
            success: false,
            message: "Error: change password failed",
        })
    }

    // console.log(err)
    if(err?.code === "22P02"){                   //No Params ID
        // console.log(err)
        return response.status(422).json({
            success: false,
            message: "Invalid Parameter!",
        })
    }
    if(err?.code === "42703"){                   //No Params ID
        // console.log(err)
        return response.status(422).json({
            success: false,
            message: "Invalid Parameter Sort Field!",
        })
    }
    if(err?.code === "08P01"){                   //No Params ID
        // console.log(err)
        return response.status(422).json({
            success: false,
            message: "Invalid Value in Model",
        })
    }

    if(err === undefined){
        return response.status(404).json({
            success: false,
            message:"User ID not found",
        })
    }

    if(err?.message?.includes("Cannot find module")){
        return response.status(400).json({
            success: false,
            message:"Error definition resource routes!",
        })
    }
    if(err?.message?.includes("change_paymentMethod_failed")){
        return response.status(400).json({
            success: false,
            message:"change paymentMethod failed!",
        })
    }
    if(err?.message?.includes("validation_rules")){
        return response.status(400).json({
            success: false,
            message:"Validation Error!",
        })
    }
    if(err?.message?.includes("data_not_found")){
        return response.status(404).json({
            success: false,
            message:"Data ID not found",
        })
    }
    if(err?.message?.includes("section_not_found")){
        return response.status(404).json({
            success: false,
            message:"Data section not found",
        })
    }
    if(err?.message?.includes("event_not_found")){
        return response.status(404).json({
            success: false,
            message:"Data Event not found",
        })
    }
    if(err?.message?.includes("profile_not_found")){
        return response.status(404).json({
            success: false,
            message:"Data Profile not found",
        })
    }
    if(err?.message?.includes("reservation_not_found")){
        return response.status(404).json({
            success: false,
            message:"Data Reservation not found! reservationId invalid",
        })
    }
    if(err?.message?.includes("unauthorized")){
        return response.status(401).json({
            success: false,
            message:"Unauthorized!",
        })
    }
    if(err?.message?.includes("wrong_credentials")){
        return response.status(400).json({
            success: false,
            message:"Wrong Username or Email or Password!",
        })
    }
    if(err?.message?.includes("data_event_not_created_by_you")){
        return response.status(400).json({
            success: false,
            message:"This event not created by you!",
        })
    }
    if(err?.message?.includes("create_wishlist_failed")){
        return response.status(400).json({
            success: false,
            message:"Create wishlist failed!",
        })
    }
    // console.log(err)
    if(err?.message?.includes("jwt malformed")){
        return response.status(401).json({
            success: false,
            message:"Invalid Token!",
        })
    }
    if(err?.message?.includes("jwt expired")){
        return response.status(401).json({
            success: false,
            message:"Unauthorized: Token expired, please relogin!",
        })
    }
    if(err?.message?.includes("invalid token")){
        return response.status(401).json({
            success: false,
            message:"Unauthorized: Invalid Token, please relogin!",
        })
    }
    if(err?.message?.includes("invalid_request_userId")){
        return response.status(400).json({
            success: false,
            message:"Invalid Request User ID!",
        })
    }
    if(err?.message?.includes("invalid signature")){
        return response.status(401).json({
            success: false,
            message:"Invalid Token Signature!",
        })
    }

    if(err?.message?.includes("this._makeMiddleware is not a function")){
        return response.status(400).json({
            success: false,
            message:"Invalid Middleware declaration",
        })
    }
    if(err?.message?.includes("is_duplicate_data")){
        return response.status(409).json({
            success: false,
            message:"Data is already exist!",
        })
    }

    if(err?.message?.includes("could not determine data type of parameter")){
        return response.status(409).json({
            success: false,
            message:"internal error - Model parameter!",
        })
    }
    // if(err?.message?.includes("input_data_email_null")){
    //     return response.status(400).json({
    //         success: false,
    //         message:"Input data email cannot be empty",
    //     })
    // }
    // console.log(err)
    // if(err?.message?.includes("input_format_email_not_valid")){
    //     return response.status(400).json({
    //         success: false,
    //         message:"Input data email format invalid",
    //     })
    // }
    // if(err?.message?.includes("input_data_password_null")){
    //     return response.status(400).json({
    //         success: false,
    //         message:"Input data password cannot be empty",
    //     })
    // }
    // if(err?.message?.includes("input_password_min_length_8")){
    //     return response.status(400).json({
    //         success: false,
    //         message:"Input data password min length 8",
    //     })
    // }
    
    console.log(err)
    return response.status(500).json({
        success: false,
        message: "Error: Internal server error!",
    })
}

module.exports = errorHandler 
