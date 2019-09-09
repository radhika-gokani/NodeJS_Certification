var fs = require('fs')
var argv = require('yargs').argv

if(!argv.filename){
    console.log('Please enter filename.')
}
else{
    fs.open(argv.filename+'.txt','wx',(err,f)=>{
        if(err) console.log('File already exists.')
        else{
            fs.write(f,'You are awesome',(err)=>{
            if(!err){
                fs.appendFileSync('filenames.txt',argv.filename+"\n")
                console.log('File created succesfully.')
            }
            
        })}
    })
}
