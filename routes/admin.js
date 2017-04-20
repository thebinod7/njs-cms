const session = require('express-session');
const express = require('express');
const  router = express.Router();
const Users= require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

function checkAuth (req, res, next) {
    if (!(req.session.admin && req.session.admin.token)) {
        res.render('error/403', { status: 403 , page: { title: '403 - Unauthorized'} });
        return;
    }
    next();
}

router.post('/auth',function (req,res) {
    var users = new Users({
        email : req.body.email,
        password : req.body.password
    });
    Users.getUserByEmail(users.email, function (err, doc) {
        if(err) throw err;
        if(!doc){
            req.flash('error', 'Email not found!!! Please contact site admin');
            res.redirect('/admin');
            return;
          //  return res.json({msg:'User does not exists.'});
        }
        Users.comparePassword(users.password,doc.password,function (err,isMatch) {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(users,config.secret,{
                    expiresIn : 604800 //1 week
                });
                req.session.admin = {
                    token: token,
                    user : doc,
                    datetime: Date.now()
                }
                res.redirect('/profile');
            }
            else {
                req.flash('error', 'Wrong email or password!');
                res.redirect('/admin')
            }
        });
    });
});

router.post('/login', function(req, res, next) {
    if(req.body && req.body.username == 'wilson' && req.body.password == '12345'){
        req.session.admin = {
            token: 'de76af66229032dda',
            datetime: Date.now()
        }
        res.redirect('/profile')
    } else {
        req.flash('error', 'Invalid username or password');
        res.redirect('/admin')
    }
});

router.get('/logout', checkAuth, function(req,res){
    req.session.destroy();
    req.session.admin = null;
    res.redirect('/');
});


module.exports = router;