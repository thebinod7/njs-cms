const mongoose = require('mongoose');
const config = require('../config/database');

var objectId = mongoose.Schema.ObjectId;
const userSchema = mongoose.Schema({
    userId : objectId,
    profilePicUrl : {
        type : String
    },
    firstName : {
        type: String,
        required : true
    },
    lastName : {
        type : String
    },
    contactNumber : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    socialUrl : {
        type : String
    },
    role : {
        type : objectId,
        ref : 'Role'
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

const Users = module.exports = mongoose.model('Users',userSchema);

