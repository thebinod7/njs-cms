const express = require('express');
const  router = express.Router();
const config = require('../config/database');
const Post = require('../models/post');
var multer  = require('multer');



var storage = multer.diskStorage({
    destination: './public/img/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
})

var upload = multer({ storage: storage });

router.post('/uploadImg', upload.single('featuredImg'), function(req, res, next) {
    // res.redirect('/add_content');
    res.json({
        error: false,
        result: req.file.filename
    });
});

router.post('/add',function (req,res) {
    var newPost = new Post({
        featuredImgUrl : req.body.featuredImgUrl,
        category : req.body.category,
        title : req.body.title,
        seoUrl : req.body.seoUrl,
        content : req.body.content
    });
    newPost.save(function (err,doc) {
        if(err){
            res.json({success : false, msg : 'Failed to add post!'});
        } else {
            res.json({success:true,msg:'Success',result:doc})
        }
    });
});

router.get('/list',function (req,res) {
    Post
        .find()
        .populate('category')
        .exec(function (err, cat) {
            if(err){
                res.json({success : false, msg : 'Failed to list!'});
            } else {
                res.json({success:true,msg:'Success',result:cat})
            }
        });
});

router.get('/:id',function (req,res) {
    Post.findById(req.params.id, function(err, doc) {
        if(err){
            res.json({success : false, msg : 'Failed to get post!'});
        } else {
            res.json({success:true,msg:'Success',result:doc})
        }
    });
});

router.delete('/:id',function (req,res) {
    Post.findById(req.params.id, function(err, doc) {
        if (err) throw err;

        // delete content
        doc.remove(function(err) {
            if (err) throw err;
            res.json({success:true,msg:'Post deleted successfully'});
        });
    });
});

router.post('/:id',function (req,res) {
    Post.findById(req.params.id, function (err, doc) {
        if (err) {
            res.status(500).send(err);
        } else {
            doc.category = req.body.category || doc.category;
            doc.featuredImgUrl = req.body.featuredImgUrl || doc.featuredImgUrl;
            doc.title = req.body.title || doc.title;
            doc.seoUrl = req.body.seoUrl || doc.seoUrl;
            doc.content = req.body.content || doc.content;

            doc.save(function (err, data) {
                if(err){
                    res.json({success : false, msg : 'Failed to update post!'});
                } else {
                    res.json({success:true,msg:'Success',result:data})
                }
            })
        }
    });
});


module.exports = router;