const mongoose = require('mongoose');
const config = require('../config/database');

//Category Schema
var objectId = mongoose.Schema.ObjectId;
const categorySchema = mongoose.Schema({
    categoryId : objectId,
    categoryName : {
        type: String,
        required : true
    },
    categoryDesc : {
        type : String
    },
    seoUrl : {
        type : String
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

const Category = module.exports = mongoose.model('Category',categorySchema);

