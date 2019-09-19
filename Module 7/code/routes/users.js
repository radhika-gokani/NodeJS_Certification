const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

router.post('/register', (req, res) => {
    if(!req.body.username || !req.body.password){
        res.redirect('/views/user/register?error='+encodeURIComponent('Please enter all required fields'))
    }
    else{
        let newUser = new User({
            username : req.body.username,
            password : req.body.password
        })
    
        newUser.save((err,result)=>{
            if(err) return res.status(500).send('Oops ! Something went wrong !');
            else {
                res.redirect('/views/user/login?msg='+encodeURIComponent('Registered successfully.'))
            }
        })
    }
    


})
router.post('/login', (req, res) => {
    if(!req.body.username || !req.body.password){
        res.redirect('/views/user/login?error='+encodeURIComponent('Please enter all required fields'))
    }
    else{
        User.findOne({ username: req.body.username,password : req.body.password }, function (err, user) {
            if (err) return res.status(500).send('Oops ! Something went wrong !');
            if(!user) res.redirect('/views/user/login?error='+encodeURIComponent('Invalid credentials'))
            else{
                var token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 });
                localStorage.setItem('user-authtoken', token)
                res.redirect('/views/user/dashboard');
            }
        })    
    }
})

module.exports = router;