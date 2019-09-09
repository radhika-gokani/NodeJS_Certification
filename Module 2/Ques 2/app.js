const express = require ('express');
const app = express();

app.listen(8080,(err) => {
    if (err) throw err;
    console.log('Server Up And Running !')
})

app.get('/',(req,res) => {
    res.send('<h1> Welcome to express server</h1>')
})

app.get('/getMovies', (req,res) => {
    fs.readFile('./data.json',(err,result) => {
        if(err){
            res.send('<h1> Ooops ! Something went wrong !</h1>')
        }else {
            res.send(JSON.parse(result))
        }
    })
})