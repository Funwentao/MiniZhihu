import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
    username: {
        type: String,
        index: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    like:{
        type: Array
    },
    beLiked:{
        type:Array
    },
    collections:{
        type:Array
    },
    headPic:{
        type:String,
        trim:true
    },
    articles:{
        type:Array
    },
    question:{
        type:Array
    },
    answer:{
        type:Array
    },
    create_time: Date
})

export default mongoose.model('User', UserSchema)
