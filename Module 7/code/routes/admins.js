const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Item = require('../models/item');
const User = require('../models/user');
const config = require('../config');
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');



router.post('/login', (req, res) => {
    if(!req.body.username || !req.body.password){
        res.redirect('/views/admin/login?error='+encodeURIComponent('Please enter all required fields'))
    }
    else{
        Admin.findOne({ username: req.body.username,password : req.body.password }, function (err, admin) {
            if (err) return res.status(500).send('Oops ! Something went wrong !');
            if(!admin) res.redirect('/views/admin/login?error='+encodeURIComponent('Invalid credentials'))
            else{
                var token = jwt.sign({ id: admin._id }, config.secret, { expiresIn: 86400 });
                localStorage.setItem('admin-authtoken', token)
                res.redirect('/views/admin/dashboard');
            }
        })    
    }
})

router.post('/additem', (req, res) => {
    if(!req.body.product || !req.body.quantity || !req.body.price){
        res.redirect('/views/admin/additem?error='+encodeURIComponent('Please enter all required fields'))
        return
    }

    var token
    try{
        token = localStorage.getItem('admin-authtoken')
    }
    catch(err){
        console.log(err)
        res.redirect('/views/admin/login')
        return
    }
    
    if (!token) {res.redirect('/views/admin/login') }
    jwt.verify(token, config.secret, function(err, decoded) {
        if(err) {res.redirect('/views/admin/login') }
        let newitem = Item({
            product : req.body.product,
            quantity : req.body.quantity,
            price : req.body.price
        })

        newitem.save((err,result)=>{
            console.log(err)
            if(err) return res.status(500).send('Oops ! Something went wrong !');
            else {
                res.redirect('/views/admin/dashboard');
            }
        })
    })
})

router.post('/adduser', (req, res) => {
    if(!req.body.username || !req.body.password || !req.body.usertype){
        res.redirect('/views/admin/adduser?error='+encodeURIComponent('Please enter all required fields'))
        return
    }
    else{
        var token
    try{
        token = localStorage.getItem('admin-authtoken')
    }
    catch(err){
        console.log(err)
        res.redirect('/views/admin/login')
        return
    }
    
    if (!token) {res.redirect('/views/admin/login') }
    jwt.verify(token, config.secret, function(err, decoded) {
        if(err) {res.redirect('/views/admin/login');return; }
        let newuser
        if(req.body.usertype == 'user'){
            newuser = new User({
                username : req.body.username,
                password : req.body.password
            })
        }   
        else if(req.body.usertype == 'admin'){
            newuser = new Admin({
                username : req.body.username,
                password : req.body.password
            })
        }
        else{ return res.status(500).send('Invalid user type !'); }
        
        newuser.save((err,result)=>{
            if(err) return res.status(500).send('Oops ! Something went wrong !');
            else {
                res.redirect('/views/admin/dashboard')
            }
        })
    })
        
    }
})

module.exports = router;