const express = require('express');
const session = require('express-session');
const router = express.Router();
const Category = require('../models/category');
const Post = require('../models/post');
const Role = require('../models/role');
const Users = require('../models/users');
const Verification = require('../models/verification');

function checkAuth (req, res, next) {
    if (!(req.session.admin && req.session.admin.token)) {
        res.render('error/403', { status: 403 , page: { title: '403 - Unauthorized'} });
        return;
    }
    next();
}

function checkPerm (req, res, next) {
    if (!(req.session.admin && req.session.admin.token)) {
        res.render('error/403', { status: 403 , page: { title: '403 - Unauthorized'} });
        return;
    }
    Role.findById(req.session.admin.user.role, function(err, doc) {
        if (err) throw err;
        var perm = JSON.stringify(doc.permissions);
        var result = doc.permissions.toString();
        var aa = JSON.parse(perm);
        console.log(aa);
        if(result == 'read') {
            console.log('read');
        }
        return;
        for(var k in perm) {
            console.log(k, perm[k]);
        }
        return;
        (doc.permissions).forEach(function(p) {
            console.log(p);
            if(p !== 'manager'){
                res.render('error/403', { status: 403 , page: { title: '403 - Unauthorized'} });
                return;
            }
        });
        // console.log(JSON.stringify(doc.permissions));
    });
    next();
}

var getCategory = function() {
    return Category.find({});
}

var getAuthor = function() {
    return Users.find({});
}

var getLatestPosts = function() {
    return Post.find({}).sort('-dateAdded')
}

router.get('/',function (req,res) {
    Post
        .find({status : 'Publish'})
        .populate('category')
        .populate('author')
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
                                getAuthor().exec(function(err, author) {
                                    if(err){
                                        res.json({success : false, msg : 'Failed to list author!'});
                                    } else {
                                        var data = {
                                            blog: doc,
                                            category: category,
                                            articles: latestArticles,
                                            author : author
                                        }
                                        res.render('index', data)
                                    }
                                });
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

router.get('/verify/:id',function (req,res) {
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

router.get('/users/add', checkAuth, function (req,res) {
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

router.get('/profile', checkAuth, checkPerm, function(req,res) {
    var data = {
        user : req.session.admin.user
    }
    res.render('secure/profile',data);
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
        .populate('author')
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
                                getAuthor().exec(function(err, author) {
                                    if(err){
                                        res.json({success : false, msg : 'Failed to list author!'});
                                    } else {
                                        var data = {
                                            blog: doc,
                                            category : category,
                                            articles : latestArticles,
                                            author : author
                                        }
                                        res.render('post_details', data)
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
});

router.get('/:id',function (req,res) {
    Post
        .find({status : 'Publish', 'category': req.params.id })
        .populate('category')
        .populate('author')
        .exec(function (err, doc) {
            if(err){
                res.json({success : false, msg : 'Failed to list content!'});
            } else {
                getAuthor().exec(function(err, author) {
                    if(err){
                        res.json({success : false, msg : 'Failed to list author!'});
                    } else {
                        var data = {
                            blog: doc,
                            author : author
                        }
                        res.render('post_by_category',data);
                    }
                });
            }
        });
});


router.get('/admin/logout', checkAuth, function(req,res){
    req.session.destroy();
    res.redirect('/');
});


module.exports = router;