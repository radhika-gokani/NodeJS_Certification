const mongoose = require('mongoose');
var itemSchema = mongoose.Schema({
    product : {type:String, required: true},
    quantity : {type:Number, required: true},
    price : {type:Number, required: true},
},{timestamps: true})

module.exports = mongoose.model('Item', itemSchema);