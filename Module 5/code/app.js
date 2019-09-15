const express = require ('express');
const app = express();
const mongoose      = require('mongoose');
var parser = require('body-parser');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(''); // your api key
const Order = require('./models/order');


app.use("/",express.static(__dirname+'/public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

mongoose.connect('mongodb://localhost:27017/orders', { useNewUrlParser: true,useUnifiedTopology:true }, (err)=>{
    if(err) throw err
    else {
        console.log('DB connected successfully')
        app.listen(8080,(err) => {
            if (err) throw err;
            console.log('Server Up And Running !')
        })
    }
});

app.get('/',(req,res) => {
    getAll().then((orders,err)=>{
        if(err) throw err
        else{
            res.render('dashboard',{orders : orders,title:'Shopping App'})  
        }
    })
                
})

app.get('/add',(req,res) => { res.render('add') })
app.post('/orders',(req,res) => { 
    let newOrder = new Order({
        name : req.body.name,
    address : req.body.address,
    email : req.body.email,
    items : req.body.items 
    })

    newOrder.save((err,result)=>{
        if(err) throw err
        else {
            getAll().then((orders,err)=>{
                if(err) throw err
                else{
                    res.redirect('/')  
                }
            })
        }
    })

    
})

app.post('/sendMail',(req,res)=>{
    console.log(req.body)
    const msg = {
        to: req.body.email,
        from: '', // your email
        subject: 'Order status',
        text: 'Order status :'+req.body.status,
      };
      
      sgMail.send(msg)
      res.end('success') 
})


getAll = ()=>{
    return new Promise((resolve,reject)=>{
        Order.find({},{_id : 0},(err,orders)=>{
            let result = []
            let curdate = new Date()
            let orderdate = null
            orders.forEach((o)=>{
                orderdate = new Date(o.createdAt)
                let timeDiff = curdate.getTime() - orderdate.getTime();
                var DaysDiff = Math.floor(Math.abs(timeDiff / (1000 * 3600 * 24)));
                if(DaysDiff == 0) result.push({...o._doc,status : 'In progress'})
                else if(DaysDiff == 1) result.push({...o._doc,status : 'Dispatched'})
                else result.push({...o._doc,status : 'Delivered'})
            })
            resolve(result)
        })
    })
}