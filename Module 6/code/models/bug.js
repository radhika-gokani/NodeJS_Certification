const mongoose = require('mongoose');
var bugSchema = mongoose.Schema({
    title : {type:String, required: true},
    description : {type:String, required: true},
    assignee : {type:String, required: true}
},{timestamps: true})

module.exports = mongoose.model('Bug', bugSchema);