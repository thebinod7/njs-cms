const express = require('express');
const session = require('express-session');
const router = express.Router();
const Category = require('../models/category');
const Post = require('../models/post');
const Role = require('../models/role');
const Verification = require('../models/verification');

var getCategory = function() {
    return Category.find({});
}
var getLatestPosts = function() {
    return Post.find({}).sort('-dateAdded')
}

router.get('/',function (req,res) {
    Post
        .find()
        .populate('category')
        .exec(function (err, doc) {
            if(err){
                res.json({success : false, msg : 'Failed to list!'});
            } else {
                getLatestPosts().sort('-dateAdded').exec(function(err, latestArticles) {
                    if(err){
                        res.json({success : false, msg : 'Failed to list content!'});
                    } else {
                        getCategory().exec(function(err, category) {
                            if(err){
                                res.json({success : false, msg : 'Failed to list category!'});
                            } else {
                                var data = {
                                    blog: doc,
                                    category: category,
                                    articles: latestArticles
                                }
                                res.render('index', data)
                            }
                        });
                    }
                });
            }
        });
});

router.get('/admin',function (req,res) {
    res.render('admin');
});

router.get('/logout',function (req,res) {
    res.render('logout');
});

router.get('/role',function (req,res) {
    res.render('secure/users/role');
});

router.get('/:id',function (req,res) {
    Verification
        .findById(req.params.id)
        .exec(function (err, doc) {
                if(err){
                    res.json({success : false, msg : 'Failed to list!'});
                } else {
                    var data = {
                        verify: doc
                    }
                    res.render('secure/users/change_password',data);
                }
        });

});

router.get('/users/add',function (req,res) {
    Role.find({}, function(err, doc) {
        if(err){
            res.json({success : false, msg : 'Failed to list!'});
        } else {
            var data = {
                role:doc
            }
            res.render('secure/users/add_users',data);
        }
    });
});

router.get('/profile',checkAuth ,function(req,res) {
    res.render('secure/profile');
});

router.get('/error/403',function (req,res) {
    res.render('error/403');
});

router.get('/new_post',checkAuth,function (req,res) {
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

router.get('/list_category',checkAuth,function (req,res) {
    Category.find({}, function(err, doc) {
        if(err){
            res.json({success : false, msg : 'Failed to list!'});
        } else {
            var data = {
                cat:doc
            }
            res.render('secure/category_list',data);
            //res.json({success:true,msg:'Success',result:doc})
        }
    });
});

router.get('/list_roles',checkAuth,function (req,res) {
    Role.find({}, function(err, doc) {
        if(err){
            res.json({success : false, msg : 'Failed to list!'});
        } else {
            var data = {
                role:doc
            }
            res.render('secure/users/roles_list',data);
        }
    });
});

router.get('/add_category',checkAuth,function (req,res) {
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

router.get('/post_list',checkAuth,function (req,res) {
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

router.get('/post_list/:id',checkAuth,function (req,res) {
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

router.get('/blog/:seoUrl',function (req,res) {
    Post
        .findOne({ seoUrl: req.params.seoUrl })
        .populate('category')
        .exec(function (err, doc) {
            if(err){
                res.json({success : false, msg : 'Failed to list!'});
            } else {
                getLatestPosts().sort('-dateAdded').exec(function(err, latestArticles) {
                    if(err){
                        res.json({success : false, msg : 'Failed to list content!'});
                    } else {
                        getCategory().exec(function(err, category) {
                            if(err){
                                res.json({success : false, msg : 'Failed to list category!'});
                            } else {
                                var data = {
                                    blog: doc,
                                    category: category,
                                    articles: latestArticles
                                }
                                res.render('post_details', data)
                            }
                        });
                    }
                });
            }
        });
    /*    .exec(function (err, doc) {
            if(err){
                res.json({success : false, msg : 'Failed to list content!'});
            } else {
                var data = {
                    blog: doc
                }
                res.render('post_details', data)
            }
        }); */
});

router.get('/:id',function (req,res) {
    Post
        .find({ 'category': req.params.id })
        .populate('category')
        .exec(function (err, doc) {
            if(err){
                res.json({success : false, msg : 'Failed to list content!'});
            } else {
                var data = {
                    blog: doc
                }
                res.render('post_by_category',data);
            }
        });
});

function checkAuth (req, res, next) {
    if (!(req.session.admin && req.session.admin.token)) {
        res.render('error/403', { status: 403 , page: { title: '403 - Unauthorized'} });
        return;
    }
    next();
}

router.post('/admin/login', function(req, res, next) {
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

router.get('/admin/logout', checkAuth, function(req,res){
    req.session.destroy();
    res.redirect('/');
});


module.exports = router;