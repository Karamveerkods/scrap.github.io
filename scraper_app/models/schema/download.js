const mongoose = require("mongoose");

var Download = mongoose.model('Download', {
    id: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 1,
    },
    author:{
        id:{
            type: String,
            required: true,
            trim: true,
            minlength: 1,
        },
        name:{
    	   type: String,
            required: true,
            trim: true,
            minlength: 1,
        }
    },
    video:{
    	name: {
        	type: String,
        	required: true,
    	},
    	path:{
    		type: String,
        	required: true,
    	}
    },
    thumbnail:{
    	name: {
        	type: String,
        	trim: true,
      	},
    	path:{
    		type: String,
        	trim: true,
      	}
    },
    metaData:{
        likes: {
            type: String,
            trim: true,
        },
        comments: {
            type: String,
            trim: true,
        },
        shares: {
            type: String,
            trim: true,
        },
        views: {
            type: String,
            trim: true,
        },
        title:{
            type: String,
            trim: true,
        },
        create_time:{
            type: String,
            trim: true,
        },
        duration:{
            type: String,
            trim: true,
        },
        preload_size:{
            type: String,
            trim: true,
        }
    }
});
module.exports = { Download }; 