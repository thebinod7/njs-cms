const express = require('express');
const  router = express.Router();
const config = require('../config/database');
const Role = require('../models/role');


router.post('/add',function (req,res) {
    var newRole = new Role({
        roleName : req.body.roleName,
        roleDesc : req.body.roleDesc,
        permissions : req.body.permissions
    });
    newRole.save(function (err,doc) {
        if(err){
            res.json({success : false, msg : 'Failed to add role!'});
        } else {
            res.json({success:true,msg:'Success',result:doc})
        }
    });
});

router.get('/list',function (req,res) {
    Role.find({}, function(err, doc) {
        if(err){
            res.json({success : false, msg : 'Failed to list!'});
        } else {
            res.json({success:true,msg:'Success',result:doc})
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