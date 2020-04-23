const config = require("../config/urls")
const axios = require('axios');
const {enlistVideosForFirstTimeApi, enlistVideosForOnPageChangeApi} = require("../config/api");
const req = require('request');


module.exports = router => {
    router
    .route("/")
    .get((request, response) => {
    	if(!request.query["ajaxcall"]){
    		response.render('dashboard.hbs')
    	}else{    
            if(!request.query["isFetchFeedsByAll"]){
                if(request.query["isLoadattemptFirst"]){
                    enlistVideosForFirstTimeApi(response);
                }else{
                    let maxTime = Math.ceil(new Date().getTime() / 1000);
                    enlistVideosForOnPageChangeApi(maxTime, response, undefined);
                }    
            }
		}   	
    })	
}