const axios = require('axios');
const { categories } = require("../config/init");

const { userId } = require("../config/init");
const { uploadSelect } = require("../config/init");
const { envSelect } = require("../config/init");

const req = require('request');
const { fetch } = require("../models/operations/download");
const { insertForLater } = require("../models/operations/saveForLater");
const { fetchUploads } = require("../models/operations/upload");
const { fetchSaved } = require("../models/operations/saveForLater");
const { fetchCountSaved } = require("../models/operations/saveForLater");
const path = require('path');

module.exports = router => {
    router
    .route("/")
    .get(async (request, response) => {
    	if(!request.query["ajaxcall"]){
    		response.render('dashboard.hbs')
    	}else{    
            let downloadedVideos= await fetch();
            let filteredArray = [];
            let indexArray = [];
            downloadedVideos.forEach(async (ele, index)=>{
                try{
                    let isUploaded= await fetchUploads(ele.video.name)
                    let insertForLater= await fetchSaved(ele.video.name)
                    indexArray.push(index);
                    if(!isUploaded && !insertForLater){
                        ele.video.path= `/videos` + "/" + ele.video.path;
                        ele.thumbnail.path= `/thumbnails` + "/" + ele.thumbnail.path
                        filteredArray.push(ele);
                        if(downloadedVideos.length===indexArray.length || filteredArray.length === 50){
                            response.send({"data":filteredArray, "categoryList": categories, "users":userId, "enviromentType":envSelect, "uploadType":uploadSelect}); 
                        }
                    }
                }catch(e){
                    console.log(e);
                }
            });   
		}   	
    })	
}