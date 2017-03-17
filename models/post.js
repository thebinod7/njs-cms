const mongoose = require('mongoose');
const config = require('../config/database');

var objectId = mongoose.Schema.ObjectId;
const postSchema = mongoose.Schema({
    postId : objectId,
    title : {
        type: String,
        required : true
    },
    status : {
        type : String,
        default : 'draft'
    },
    content : {
        type : String
    },
    category : {
        type : objectId,
        ref : 'Category'
    },
    isActive : {
        type : Boolean,
        default : true
    },
    dateAdded : {
        type : Date,
        default: Date.now
    }
});

const Post = module.exports = mongoose.model('Post',postSchema);

