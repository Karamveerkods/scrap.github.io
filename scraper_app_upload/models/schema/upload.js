var mongoose = require("mongoose");

var Upload = mongoose.model('Upload', {    
    details:{
        video:{
            type: String,
            required: true,
            trim: true,
            minlength: 1,
        },
        title:{
            type: String,
            required: true,
            trim: true,
            minlength: 1,  
        },
        tags:{
            type: String,
        },
        videoShade:{
            type: String,
        },
        trackInfo:{
            type: String,
        },
        uploadStatus:{
            type: String,
            required: true,
            trim: true,
            minlength: 1,  
        },
        author:{
            type: String,
            required: true,
            trim: true,
            minlength: 1,
        },
        category:{
            type: String,
            required: true,
            trim: true,
            minlength: 1,
        }
    },
    path:{
        type: String,
    }
});
    

module.exports = { Upload }; 