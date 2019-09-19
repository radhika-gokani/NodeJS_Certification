const express       = require ('express');
const app           = express();
const mongoose      = require('mongoose');
var parser          = require('body-parser');
const users         = require('./routes/users');
const admins        = require('./routes/admins');
const items         = require('./routes/items');
const views         = require('./routes/views');

app.use("/",express.static(__dirname+'/public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

// routes
app.use('/api/users', users);
app.use('/api/admins', admins);
app.use('/api/items', items);
app.use('/views', views);




mongoose.connect('mongodb://localhost:27017/shoppingapp', { useNewUrlParser: true,useUnifiedTopology:true }, (err)=>{
    if(err) throw err
    else {
        console.log('DB connected successfully')
        app.listen(8080,(err) => {
            if (err) throw err;
            console.log('Server Up And Running !')
        })
    }
});