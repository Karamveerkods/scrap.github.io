var mongoose = require("mongoose");


var ViewedItem = mongoose.model('ViewedItem', {
    id: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 1,
    },
    viewedStatus:{
        type: String,
        trim: true,
        minlength: 1,
    }  
});
module.exports = { ViewedItem }; 