const express = require ('express');
const app = express();
const mongoose      = require('mongoose');
var parser = require('body-parser');

const Bug = require('./models/bug');


app.use("/",express.static(__dirname+'/public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

mongoose.connect('mongodb://localhost:27017/bugs', { useNewUrlParser: true,useUnifiedTopology:true }, (err)=>{
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
    getAll().then((bugs,err)=>{
        console.log(bugs)
        if(err) throw err
        else{
            res.render('dashboard',{bugs : bugs,title:'Bugs App'})  
        }
    })
                
})

app.get('/add',(req,res) => { res.render('add') })
app.post('/bugs',(req,res) => { 
    let newBug = new Bug({
        title : req.body.title,
        description : req.body.description,
        assignee : req.body.assignee
    })

    newBug.save((err,result)=>{
        if(err) throw err
        else {
            res.redirect('/')
        }
    })

    
})


getAll = ()=>{
    return new Promise((resolve,reject)=>{
        Bug.find({},{_id : 0},(err,bugs)=>{
            let result = []
            let curdate = new Date()
            let bugdate = null
            bugs.forEach((b)=>{
                bugdate = new Date(b.createdAt)
                let timeDiff = curdate.getTime() - bugdate.getTime();
                var DaysDiff = Math.floor(Math.abs(timeDiff / (1000 * 3600 * 24)));
                
                
                if(DaysDiff < 3){
                    result.push({...b._doc,daysLeft : 3-DaysDiff,date:bugdate.toLocaleDateString(),time:bugdate.toLocaleTimeString()})
                }
                else{
                    result.push({...b._doc,daysLeft : 0,date:bugdate.toLocaleDateString(),time:bugdate.toLocaleTimeString()})
                }
                
                
            })
            resolve(result)
        })
    })
}