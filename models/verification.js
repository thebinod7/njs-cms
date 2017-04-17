const mongoose = require('mongoose');
const config = require('../config/database');
var bcrypt = require('bcryptjs');

var objectId = mongoose.Schema.ObjectId;
const verifySchema = mongoose.Schema({
    verifyId : objectId,
    userId : {
        type : String
    },
    firstName : {
      type : String
    },
    email : {
        type : String
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    verifyDate : {
        type : Date,
        default: Date.now
    }
});

const Verification = module.exports = mongoose.model('Verification',verifySchema);

