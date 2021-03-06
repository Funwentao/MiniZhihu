import mongoose, { Schema } from 'mongoose'

const QuestionSchema = new Schema({
    title: {
        type: String,
        index: true,
        required: true,
        trim: true
    },
    type:{
        type:String,
        default:'question'
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
    create_time: {
        type: Date,
        default: new Date()
    },
    be_collect:{
        type:Number,
        default:0,
        required:true
    }
});

export default mongoose.model('Question', QuestionSchema)
