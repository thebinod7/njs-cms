const express = require('express');
const  router = express.Router();
const config = require('../config/database');
const Users= require('../models/users');


router.post('/add',function (req,res) {
    var newUser = new Users({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        contactNumber : req.body.contactNumber,
        email : req.body.email,
        password : req.body.password,
        socialUrl : req.body.socialUrl,
        role : req.body.role
    });
    newUser.save(function (err,doc) {
        if(err){
            res.json({success : false, msg : 'Failed to add user!'});
        } else {
            res.json({success:true,msg:'Success',result:doc})
        }
    });
});

router.get('/list',function (req,res) {
    Users
        .find()
        .populate('role')
        .exec(function (err, cat) {
            if(err){
                res.json({success : false, msg : 'Failed to list!'});
            } else {
                res.json({success:true,msg:'Success',result:cat})
            }
        });
});

router.get('/:id',function (req,res) {
    Role.findById(req.params.id, function(err, doc) {
        if(err){
            res.json({success : false, msg : 'Failed to get role!'});
        } else {
            res.json({success:true,msg:'Success',result:doc})
        }
    });
});

router.delete('/:id',function (req,res) {
    Role.findById(req.params.id, function(err, doc) {
        if (err) throw err;

        doc.remove(function(err) {
            if (err) throw err;
            res.json({success:true,msg:'Role deleted successfully'});
        });
    });
});

module.exports = router;