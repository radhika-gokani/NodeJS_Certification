const express = require('express');
const router = express.Router();
const News = require('../models/news');
const jwt = require('jsonwebtoken');
const config = require('../config');



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
            News.find({},(err,news)=>{
                console.log(news)
                res.render('admin/admindashboard',{news : news})
            })
        }
    })
    
})
router.get('/admin/addnews',(req,res) => { 
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
        else{ res.render('admin/addnews',{error: req.query.error?req.query.error:''}) }
    })
 })



module.exports = router;

