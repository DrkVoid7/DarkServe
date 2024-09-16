import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    id: String,
    username: String,
    contact:{
        f_name: {
            type:String,
            default: '',
        },
        l_name: {
            type:String,
            default: '',
        },
        phone: {
            type:String,
            default: '',
        },
        email: {
            type:String,
            default: '',
        },
        country: String,
    },
    is_Staff: Boolean,
    is_verified: Boolean,
    is_edited:Boolean,
    staff_info:{
        desc:{
          type: String,
          default: '',  
        },
        profession_1: String,
        profession_2: String,
        profession_3: String,
        profession_4: String,
        experience: String,
        education: String,
        token:{
            type: String,
            default: '',
        }
    },
    rating:{
        all: [],
        average:Number
    },
    previous_record: [],
    rated:[],
    registration:{
        token: String,
        time: Date, 
    }
})
const User = mongoose.model('User', userSchema);

export default User;