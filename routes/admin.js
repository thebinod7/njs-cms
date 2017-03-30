const session = require('express-session');
const express = require('express');
const  router = express.Router();

function checkAuth (req, res, next) {
    if (!(req.session.admin && req.session.admin.token)) {
        res.render('error/403', { status: 403 , page: { title: '403 - Unauthorized'} });
        return;
    }
    next();
}

router.post('/login', function(req, res, next) {
    console.log(req.body);
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
    res.redirect('/');
});


module.exports = router;