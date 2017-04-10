const mongoose = require('mongoose');
const config = require('../config/database');

var objectId = mongoose.Schema.ObjectId;
const roleSchema = mongoose.Schema({
    roleId : objectId,
    roleName : {
        type: String,
        required : true
    },
    roleDesc : {
        type : String
    },
    permissions : {
        type : [String]
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

const Role = module.exports = mongoose.model('Role',roleSchema);

