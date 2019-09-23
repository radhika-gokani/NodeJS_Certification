import fs, { writeFileSync } from 'fs';
import express from 'express';
const app = express();
const port = 6500;

const LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');

app.get('/',(req,res)=>{
    res.status(200)
    res.send('<h1>Welcome to api For Fs</h1>')
});

app.get('/checkQueryParams',(req,res)=>{
    if(!req.query.q){
        res.status(400)
        res.send('Bad request. Query not passed')
    }
    else res.status(200).send('Query received successfully.')
});

app.get('/checkParams',(req,res)=>{
    res.status(400)
    res.send('Bad request. Params not passed')
})
app.get('/checkParams/:p',(req,res)=>{
    res.status(200).send('Param received successfully.')
});

app.get('/getdata',(req,res)=>{
    console.log('hahahahah')
    res.status(400)
    res.send('Bad request. Params not passed')
})

app.get('/getdata/:id',(req,res)=>{
   try{
        let data = fs.readFileSync('db.json')
        data = JSON.parse(data)
        let result = data.filter((obj)=>{return obj._id == req.params.id})
        console.log(result)
        if(result.length == 0) {res.status(204).send('No content found for this id')}
        else res.status(200).json({data : result})
   }
   catch(e){
       console.log(e)
        res.status(500).send('Oops ! Something went wrong !')   
   }
   
 
    
})

app.get('/editdata',(req,res)=>{
    res.status(400)
    res.send('Bad request. Params not passed')
})

app.get('/editdata/:id',(req,res)=>{
    res.status(400)
    res.send('Bad request. Params not passed')
})

app.get('/editdata/:id/:name',(req,res)=>{
    try{
        let data = fs.readFileSync('db.json')
        data = JSON.parse(data)
        let edited = false
        for(var i=0;i<data.length;i++){
            if(data[i]._id == req.params.id){
                data[i].name = req.params.name
                edited = true
                break
            }
        }
        if(edited){
            fs.writeFileSync('db.json',JSON.stringify(data))
            res.status(200).send('Edited successfully')
        }
        else{
            res.status(204).send('No content found for this id')
        }

        
   }
   catch(e){
       console.log(e)
        res.status(500).send('Oops ! Something went wrong !')   
   }

})


app.get('/getAll',(req,res)=>{
    fs.readFile('db2.json',(err,result) => {
        if(err) res.status(500).send('Oops ! Something went wrong !')
        else res.send(JSON.parse(result));   
    })
})

app.get('/checkunauthorised',(req,res)=>{
    // delete file authtoken in scratch folder and
    // before testing ths api
    localStorage.removeItem('authtoken')
    
    var token = localStorage.getItem('authtoken')
    console.log(token)
    if(!token) res.status(401).send('Unauthorised')
})

app.get('/checkauthorised',(req,res)=>{
    // create a file in scratch folder and
    // write some dummy text before testing ths api
    localStorage.setItem('authtoken','authtoken')

    var token = localStorage.getItem('authtoken')
    console.log(token)
    res.status(200).send('Authorised')
})

/* app.get('/',(req,res)=>{
    res.send('<h1>Welcome to api For Fs</h1>')
});

app.get('/movies',(req,res) => {
    fs.readFile('db.json',(err,result) => {
        if(err) throw err;
        res.send(JSON.parse(result));   
    })
})

app.get('/mytext',(req,res) => {
    fs.readFile('myText.txt','utf-8',(err,data) => {
        if(err) throw err;
        res.send(data)
    })
})

app.get('/bothops',(req,res) => {
    fs.appendFile('./mytext2.txt','My text read file\n',(err) => {
        if(err) throw err;
        else{
            fs.readFile('./mytext2.txt','utf-8',(err,data) => {
                if(err) throw err;
                res.send(data)
            })
        }
    })

}) */

app.listen(port,(err)=>{
    console.log(`Server is running on port ${port}`)
})