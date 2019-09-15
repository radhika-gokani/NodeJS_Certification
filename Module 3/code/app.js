const express = require ('express');
const fs = require('fs')
var request = require('request');

const app = express();
app.use("/",express.static(__dirname+'/public'));
app.set('view engine', 'ejs');

app.listen(8080,(err) => {
    if (err) throw err;
    console.log('Server Up And Running !')
})

app.get('/',(req,res) => {
    res.send('<h1> Welcome to express server</h1>')
})

app.get('/employee/:id', (req,res) => {
    fs.readFile('./employees.json',(err,result) => {
        if(err) throw err
        else res.send(JSON.parse(result).filter((obj)=>obj._id == req.params.id))        
    })
})

app.get('/project/:id', (req,res) => {
    getProject(req.params.id).then((project)=>{
        res.send(project)
    })
})

app.get('/getemployeedetails', (req,res) => {
    promises = []
    employeedetails = []
    fs.readFile('./employees.json',(err,result) => {
        JSON.parse(result).forEach((emp)=>{
            promises.push(getProject(emp.project_id).then((project)=>{ return {...emp,...project[0]}; }))
            
        })
        Promise.all(promises).then((p)=>{
            res.send(p)
        })

    })
})


app.get('/dashboard',(req,res)=>{
    request('http://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees', function (err, response, body) {
        if(err) throw err
        else res.render('dashboard',{employees : JSON.parse(body)})
    });
})

getProject = (id)=>{
    
    return new Promise((resolve,reject)=>{
        fs.readFile('./projects.json',(err,result) => {
            if(err) reject(err)
            resolve(JSON.parse(result).filter((obj)=>obj._id == id))
        })
    })
}