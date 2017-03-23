const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Post = require('../models/post');

var getCategory = function() {
    return Category.find({});
}


router.get('/',function (req,res) {
    Post
        .find()
        .populate('category')
        .exec(function (err, doc) {
            if(err){
                res.json({success : false, msg : 'Failed to list!'});
            } else {
                var data = {
                    blog:doc
                }
                res.render('index',data);
            }
        });
});

router.get('/profile',function (req,res) {
    res.render('secure/profile');
});

router.get('/new_post',function (req,res) {
    Category.find({}, function(err, doc) {
        if(err){
            res.json({success : false, msg : 'Failed to list!'});
        } else {
            var data = {
                cat:doc
            }
            res.render('secure/new_post',data);
            //res.json({success:true,msg:'Success',result:doc})
        }
    });
});

router.get('/add_category',function (req,res) {
    Category.find({}, function(err, doc) {
        if(err){
            res.json({success : false, msg : 'Failed to list!'});
        } else {
            var data = {
                cat:doc
            }
            res.render('secure/add_category',data);
            //res.json({success:true,msg:'Success',result:doc})
        }
    });
});

router.get('/post_list',function (req,res) {
    Post
        .find()
        .populate('category')
        .exec(function (err, doc) {
            if(err){
                res.json({success : false, msg : 'Failed to list!'});
            } else {
                var data = {
                    blog:doc
                }
                res.render('secure/post_list',data);
            }
        });
});

router.get('/post_list/:id',function (req,res) {
    Post
        .findById(req.params.id)
        .populate('category')
        .exec(function (err, doc) {
            getCategory().exec(function(err, category) {
                if(err){
                    res.json({success : false, msg : 'Failed to list category!'});
                } else {
                    var data = {
                        blog: doc,
                        category: category
                    }
                    res.render('secure/update_post', data)
                }
            });
        });
});

module.exports = router;