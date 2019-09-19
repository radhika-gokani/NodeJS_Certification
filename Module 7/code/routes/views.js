const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');

// User routes
router.get('/user/login',(req,res) => { 
    res.render('user/login',{error: req.query.error?req.query.error:'',
                        msg: req.query.msg?req.query.msg:''})                             
})
router.get('/user/register',(req,res) => { 
    res.render('user/register',{error: req.query.error?req.query.error:''})  
})

router.get('/user/dashboard',(req,res) => { 
    var token
    try{
        token = localStorage.getItem('user-authtoken')
    }
    catch(err){
        console.log(err)
        res.redirect('/views/user/login')
        return
    }
    
    if (!token) {res.redirect('/views/user/login') }
    jwt.verify(token, config.secret, function(err, decoded) {
        if(err) {res.redirect('/views/user/login') }
        else{
            Item.find({},(err,items)=>{
                console.log(items)
                res.render('user/userdashboard',{items : items})
            })
        }
    })
     
})

// Admin routes
router.get('/admin/login',(req,res) => { 
    res.render('admin/login',{error: req.query.error?req.query.error:'',
                        msg: req.query.msg?req.query.msg:''})                             
})
router.get('/admin/dashboard',(req,res) => { 
    
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
        else{
            Item.find({},(err,items)=>{
                console.log(items)
                res.render('admin/admindashboard',{items : items})
            })
        }
    })
    
})
router.get('/admin/additem',(req,res) => { 
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
        else{ res.render('admin/additem',{error: req.query.error?req.query.error:''}) }
    })
 })
router.get('/admin/adduser',(req,res) => { 
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
        else{ res.render('admin/adduser',{error: req.query.error?req.query.error:''}) }
    })
 })

 router.get('/admin/userlist',(req,res) => { 
    
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
        else{
            User.find({},(err,users)=>{
                console.log(users)
                res.render('admin/userlist',{users : users})
            })
        }
    })
    
})



module.exports = router;

