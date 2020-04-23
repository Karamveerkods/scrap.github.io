const { insertForLaters } = require("../models/operations/saveForLater");
const { userId } = require("../config/init");

module.exports = router => {
    router
    .route("/")
    .put(async (request, response) => {
    	console.log(request.body.details.author, " req");
    	try{
    		request.body.details.author = userId.reduce((acc, ele) => {
        		if(request.body.details.author === ele.name){
         			acc= ele.id
        		} 
        		return acc
      		});
    		let saveForLater = await insertForLaters(request.body);
    		console.log(saveForLater,"saveForLater")
    		if(saveForLater){
    			response.status(200).send({"message":"success", "data":saveForLater.details});
    		}else{
	    		response.status(404).send("error");
    		}
    	}catch(e){
    		console.log(e);
    		response.status(404).send("error");
    	}
    })
    .post(async (request, response) => {
      	let isUploaded= await sendDataToServer(request);
      	if(isUploaded.message === "success"){
    		try{
    			let uploaded = await insert(isUploaded.data)
    			console.log(uploaded," accepted data")
    			if(uploaded){
    				response.status(200).send({"message":"success", "data":uploaded});
    			}else{
	    			response.status(404).send("error");
    			}
    		}catch(e){
    			response.status(404).send("error");
    		}    		
    	}
    })
}