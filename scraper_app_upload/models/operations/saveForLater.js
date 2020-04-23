const {
    SaveForLater
} = require("../../models/schema/saveForLater");

async function getSaved(videoToFind){
	return SaveForLater.findOne({"details.video":videoToFind},{_id:0,__v:0, tags:0, videoShade:0, trackInfo:0, uploadStatus:0, author:0, category:0});
}
module.exports = {
	insertForLaters: async(dataItem) => {
		console.log(await getSaved(dataItem.details.video), " saved")
		if(!(await getSaved(dataItem.details.video))){
	    	let saveForLater = new SaveForLater(dataItem);
	    	console.log("!get saved")
	        return saveForLater.save();
	    }else{
	    	console.log("success")
	        return "success"
	    }
	},
	fetchSaved: async(video) => {
		try{
			return await getSaved(video);	
		}
		catch(e){
			console.log(e, "error");
		}
	},
	fetchCountSaved: () => {
		return SaveForLater.count({}); 	
	},
	fetchAllSaved:(dataItemCount)=>{
		return SaveForLater.find({}, {_id:0,__v:0}).limit(dataItemCount);		
	}
}