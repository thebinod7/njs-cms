const mongoose = require('mongoose');
const config = require('../config/database');
var bcrypt = require('bcryptjs');

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

module.exports.getUserByEmail = function (email, callback) {
    const query = {email : email}
    Users.findOne(query,callback);
}

module.exports.addUser = function (newUser,callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}