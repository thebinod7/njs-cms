const express = require('express');
const  router = express.Router();
const config = require('../config/database');
const Users= require('../models/users');
const Verification= require('../models/verification');
const nodemailer = require('nodemailer');

var sendEmail = function (dest,name,id) {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'binod@rumsan.com',
            pass: 'T$mp1234'
        }
    });

// setup email data with unicode symbols
    var mailOptions = {
        from: 'binod@rumsan.com', // sender address
        to: dest, // list of receivers
        subject: 'User registration ✔', // Subject line
       // text: message, // plain text body
        html: '<b>Congratulations '+ name +', you have been registered to Node-CMS.</b><br><a href="http://localhost:4242/verify/'+ id  +'">Click here to set you account password</a>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions,function () {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent successfully!');
      //  console.log('Message %s sent: %s', info.messageId, info.response);
    })
}

router.post('/add',function (req,res) {
    console.log(req.body);
    var newUser = new Users({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        contactNumber : req.body.contactNumber,
        email : req.body.email,
        password : req.body.password,
        socialUrl : req.body.socialUrl,
        role : req.body.role
    });
    Users.getUserByEmail(newUser.email,function (err,userEmail) {
        if(err) throw err;
        if(userEmail){
            res.json({msg:"Email already exists"})
        }
        else {
            Users.addUser(newUser,function (err,doc) {
                if(err){
                    res.json({success : false, msg : 'Failed to add!'});
                } else {
                    var verifyData = new Verification({
                        userId : doc.id,
                        email : doc.email,
                        firstName : doc.firstName
                    });
                    verifyData.save(function (err,verify) {
                        if (err) throw  err;
                        sendEmail(verify.email,verify.firstName,verify.id);
                        res.json({success:true,msg:'User added successfully',result:doc})
                    });

                }
            })
        }
    });
});

router.post('/change/password',function (req,res) {
    var user_data = new Users({
        email : req.body.email,
        password : req.body.password,
        newPassword : req.body.newPassword
    });
    Users.getUserByEmail(user_data.email,function (err,isUser) {
        if(err) throw err;
        if(isUser){
            Users.comparePassword(user_data.password,isUser.password,function (err,isMatch) {
                console.log('Match:' + isMatch);
                if(err) throw err;
                if(isMatch){
                    Users.changePassword(user_data,function (err,doc) {
                        if(err){
                            res.json({success : false, msg : 'Error occured,try again!'});
                        } else {
                            Users.findOneAndUpdate({ email: user_data.email }, { $set: { password: user_data.newPassword } }, { new: true }, function(err, user) {
                                res.json({success:true,msg:'Password changed successfully!',result:user})
                            });
                        }
                    })
                }
                else {
                    return res.json({msg:'Wrong password!'});
                }
            });
        } else {
            res.json({success : false, msg : 'Email not found'});
        }
    })
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
    Users.findById(req.params.id, function(err, doc) {
        if(err){
            res.json({success : false, msg : 'Failed to get role!'});
        } else {
            res.json({success:true,msg:'Success',result:doc})
        }
    });
});

router.delete('/:id',function (req,res) {
    Users.findById(req.params.id, function(err, doc) {
        if (err) throw err;

        doc.remove(function(err) {
            if (err) throw err;
            res.json({success:true,msg:'User deleted successfully'});
        });
    });
});

module.exports = router;