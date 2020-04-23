const { insert } = require("../models/operations/upload");
const { sendDataToServer } = require("../config/api");
const { uploadSelect, envSelect, userId } = require("../config/init");
const { fetchAllUploads } = require("../models/operations/upload");
const { fetchAllSaved } = require("../models/operations/saveForLater");
module.exports = router => {
    router
    .route("/")
    .put(async (request, response) => {
    	request.body.details.author = userId.reduce((acc, ele) => {
        	if(request.body.details.author === ele.name){
          		acc= ele.id
        	} 
        	return acc
      	});
      	try{
      		let uploaded = await insert(request.body)
      		console.log(uploaded, " uploaded")
    		if(uploaded){
    			response.status(200).send({"message":"success", "data":uploaded.details});
    		}else{
	    		response.status(404).send("error");
    		}
    	}catch(e){
    		response.status(404).send("error");
    	}
    })
    .post(async (request, response) => {
	    	if(!request.query["is-bulk-upload"]){
	    		request.body.details.author = userId.reduce((acc, ele) => {
	        		if(request.body.details.author === ele.name){
	          			acc= ele.id
	        		} 
	        		return acc
	      		});
      			let isUploaded= await sendDataToServer(request);
    			if(isUploaded.message === "success"){
    				try{
    					let uploaded = await insert(isUploaded.data)
    					if(uploaded){
    						response.status(200).send({"message":"success", "data":uploaded});
    					}else{
	    					response.status(404).send("error");
    					}
    				}catch(e){
    					response.status(404).send("error");
    				}
    			}		
    		}else{
    			let url= envSelect.reduce((acc, ele) => {
    				if(request.body.envType === ele.name)
    					acc= ele.url
    				return acc
    			}) 
    			if(request.body.uploadType === "accepted") {
    				let uploads= await fetchAllUploads(request.body.totalCount);
    				if(uploads.length !== 0){
    					uploads.forEach(async (ele, index) =>{
    						let isUploaded= await sendDataToServer({"body":ele}, url);
    					})	
    				}else{
    					response.status(404).send({"message":"no data"});
    				}
    			}else{
    				let saved= await fetchAllSaved(request.body.totalCount); 
    				let uploaded = []
    				//let uploadPromiseArray= saved.map(elem=>sendDataToServer({"body":elem}, url));
    				//console.log(uploadPromiseArray,'savedPromiseArray=========')
    				//try{
    				//	let resolvedArray = await Promise.all(uploadPromiseArray);
    				//	console.log(resolvedArray, " resolvedArray")
 /*	   					let savedData= resolvedArray.map(elem=>insert(elem.data));
 	   					console.log(savedData, "savedData");
    					saveDataArray = await Promise.all(savedData);
    					console.log(saveDataArray, "resolvedArray");*/
    				//}catch(e){
    				//	console.log(e,'error')
    				//}
    				saved.forEach(async (ele, index) =>{
    					console.log(ele,'ele=============')
    					const insertedData= await insert(ele);
    					console.log(insertedData, " ele");
    					//let isUploaded= await sendDataToServer({"body":ele}, url)
    					console.log('================================================================')
    						sendDataToServer({body:ele},url)
    						.then(isUploaded=>{
    							console.log(isUploaded.data,'===========data=====')
    						})
    						.catch(err=>{
    							console.log(err,'err')
    						})
    						console.log('save forEach executed')
    					if(isUploaded && isUploaded.message === "success"){
    						isUploaded.data.details.uploadStatus= "accept";
    						let data= await insert(isUploaded.data);
    						if(data !== "success"){
								console.log(data, "data");
								uploaded.push(data);
								if(data === uploaded.length){
									response.status(200).send({"message":"success"});		
								}
							}else{
								response.status(404).send({"message":"success"});	
							}
    						/*insert(isUploaded.data).then( data =>{
    							if(data !== "success"){
    								console.log(data, "data");
    								uploaded.push(data);
    								if(data === uploaded.length){
										response.status(200).send({"message":"success"});		
    								}
    							}else{
    								response.status(404).send({"messgae":"success"});	
    							}
    						}).catch(e =>{
    							console.log(e, "DB ERROR");
    						})*/
/*						}else if(isUploaded.message === "error"){
							response.status(404).send({"messgae":"error"});
						}*/
    					/*sendDataToServer({"body":ele}, url).then(isUploaded =>{
	    					if(isUploaded && isUploaded.message === "success"){
	    						isUploaded.data.details.uploadStatus= "accept"
	    						insert(isUploaded.data).then( data =>{
	    							if(data !== "success"){
	    								console.log(data, "data");
	    								uploaded.push(data);
	    								if(data === uploaded.length){
											response.status(200).send({"message":"success"});		
	    								}
	    							}else{
	    								response.status(404).send({"messgae":"success"});	
	    							}
	    						}).catch(e =>{
	    							console.log(e, "DB ERROR");
	    						})
							}else if(isUploaded.message === "error"){
								response.status(404).send({"messgae":"error"});
							}
    					}).catch(e =>{
    						console.log(e, "error");
    					})*/
    				//})
    			}
    		})
    	}
    }})
}