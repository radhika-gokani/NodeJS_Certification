const mongoose = require('mongoose');
var OrderSchema = mongoose.Schema({
    name : {type:String, required: true},
    address : {type:String, required: true},
    email : {type:String, required: true},
    items : [] 
},{timestamps: true})

module.exports = mongoose.model('Order', OrderSchema);