const express       = require ('express');
const request       = require('request');
const asyncRedis = require("async-redis");

const app = express();

// Redis Setup
const asyncclient = asyncRedis.createClient();


app.listen(3000 ,(err) => {
    if(err) throw err;
    else console.log('Server Up and Running !')
})

app.get('/wiki/:country',async(req,res)=>{
    
    if(!req.params.country || req.params.country.trim() == '') return res.json({error :'please enter country field !' })
    else{
        try{
            var redis = await asyncclient.get(req.params.country);
            if(redis == null) {
                getDataFromWiki(req.params.country)
                .then((data)=>{
                    console.log('From Wiki DB')
                    asyncclient.set(req.params.country,data)
                    asyncclient.expire(req.params.country,60*60) // expire in 1 hour
                    return res.json(JSON.parse(data))
                })
                .catch((err)=>{
                    console.log(err)
                    return res.json({error :'Something went wrong !' })
                })                
            }
            else{
                console.log('From Redis')
                return res.json(JSON.parse(redis))
            } 
        }
        catch(err){ 
            return res.json({ error: "redis_error"});   
        }
    }
})

getDataFromWiki = (country)=>{
   let url = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page='
    return new Promise((resolve,reject)=>{
        request(url+country, (err,response,body) =>{
            if(err) reject({error :err });
            else resolve(body);
        });
    })
}