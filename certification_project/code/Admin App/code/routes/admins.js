const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const News = require('../models/news');
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

router.post('/addnews', (req, res) => {
    if(!req.body.title || !req.body.description || !req.body.url || !req.body.imageurl){
        res.redirect('/views/admin/addnews?error='+encodeURIComponent('Please enter all required fields'))
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
        let newnews = News({
            title : req.body.title,
    description : req.body.description,
    url : req.body.url,
    imageurl : req.body.imageurl,
        })

        newnews.save((err,result)=>{
            console.log(err)
            if(err) return res.status(500).send('Oops ! Something went wrong !');
            else {
                res.redirect('/views/admin/dashboard');
            }
        })
    })
})


module.exports = router;