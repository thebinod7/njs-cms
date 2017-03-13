const express = require('express');
const  router = express.Router();
const config = require('../config/database');
const Category = require('../models/category');


//Add Category
router.post('/add',function (req,res) {
    var newCategory = new Category({
        categoryName : req.body.categoryName,
        categoryDesc : req.body.categoryDesc
    });
    newCategory.save(function (err,doc) {
        if(err){
            res.json({success : false, msg : 'Failed to add category!'});
        } else {
            res.json({success:true,msg:'Success',result:doc})
        }
    });
});

router.get('/list',function (req,res) {
    Category.find({}, function(err, doc) {
        if(err){
            res.json({success : false, msg : 'Failed to list!'});
        } else {
            res.json({success:true,msg:'Success',result:doc})
        }
    });
});

router.get('/:id',function (req,res) {
    Category.findById(req.params.id, function(err, doc) {
        if(err){
            res.json({success : false, msg : 'Failed to get category!'});
        } else {
            res.json({success:true,msg:'Success',result:doc})
        }
    });
});

router.delete('/:id',function (req,res) {
    Category.findById(req.params.id, function(err, doc) {
        if (err) throw err;

        // delete content
        doc.remove(function(err) {
            if (err) throw err;
            res.json({success:true,msg:'Category deleted successfully'});
        });
    });
});

/* router.post('/:id',function (req,res) {
    Content.findById(req.params.id, function (err, doc) {
        if (err) {
            res.status(500).send(err);
        } else {
            doc.title = req.body.title || doc.title;
            doc.seoUrl = req.body.seoUrl || doc.seoUrl;
            doc.blogContent = req.body.blogContent || doc.blogContent;

            doc.save(function (err, data) {
                if (err) {
                    res.status(500).send(err)
                }
                res.json({success:true,result:data});
            })
        }
    });
}); */

module.exports = router;