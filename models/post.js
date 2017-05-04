const mongoose = require('mongoose');
const config = require('../config/database');

var objectId = mongoose.Schema.ObjectId;
const postSchema = mongoose.Schema({
    postId : objectId,
    featuredImgUrl : {
      type : String
    },
    title : {
        type: String,
        required : true
    },
    seoUrl : {
        type : String
    },
    status : {
        type : String,
        default : 'Draft'
    },
    content : {
        type : String
    },
    category : {
        type : objectId,
        ref : 'Category'
    },
    author : {
        type : objectId,
        ref : 'Users'
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

