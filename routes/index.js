const express = require('express');
const router = express.Router();

router.get('/',function (req,res) {
    res.render('index');
});

router.get('/profile',function (req,res) {
    res.render('secure/profile');
});

router.get('/new_post',function (req,res) {
    res.render('secure/new_post');
});

router.get('/add_category',function (req,res) {
    res.render('secure/add_category');
});

module.exports = router;