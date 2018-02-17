import mongoose, { Schema } from 'mongoose'

const ArticleSchema = new Schema({
    title: {
        type: String,
        index: true,
        required: true,
        trim: true
    },
    type:{
        type:String,
        default:'article'
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
    agreement:{
        type:Number,
        default:0,
        required:true
    },
    comments:{
      type:Array,
      default:[],
      required:true
    },
    create_time:{
        type: Date,
        default: new Date()
    },
    be_collect:{
        type:Number,
        default:0,
        required:true
    }
});

export default mongoose.model('Article', ArticleSchema)
