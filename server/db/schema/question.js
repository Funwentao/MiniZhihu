import mongoose, { Schema } from 'mongoose'

const QuestionSchema = new Schema({
    title: {
        type: String,
        index: true,
        required: true,
        trim: true
    },
    author:{
        type:String,
        required:true,
        trim:true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    answer:{
        type:Array,
        default:[],
        required:true
    },
    create_time: Date
})

export default mongoose.model('Question', QuestionSchema)
