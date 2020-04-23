const {
    Upload
} = require("../../models/schema/upload");

async function getUploads(videoToFind){
	console.log(videoToFind,'videoToFind')
	return Upload.findOne({"details.video":videoToFind});//,{_id:0,__v:0, tags:0, videoShade:0, trackInfo:0, uploadStatus:0, author:0, category:0});
}
module.exports = {
	insert: async(dataItem) => {
		console.log(dataItem,"dataItem")
		let resp=await getUploads(dataItem.details.video)
		try{

		console.log(resp,'resp===============')
		if(!(resp)){
			console.log('!resp')
	    	let upload = new Upload(dataItem);
	    	return upload.save();
	    }else{
	    	console.log('success')
	        return 'success'
	    }
	}catch(e){
		console.log(e,'error========')
	}
	},
	fetchUploads: async(video) => {
		return await getUploads(video);
	},
	fetchAllUploads:(dataItemCount)=>{
		return Upload.find({"details.uploadStatus":"accept"},{_id:0,__v:0}).limit(dataItemCount);		
	}
}