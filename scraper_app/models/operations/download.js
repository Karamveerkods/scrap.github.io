const { getViewedItems } = require("../../models/operations/viewedItem");
const {
    Download
} = require("../../models/schema/download");
async function getDownloads(idToFind){
	return Download.findOne({id:idToFind},{video:0, thumbnail:0, _id:0, author:0,__v:0});
}
module.exports = {
	insert: async(dataItem) => {
		if(!(await getDownloads(dataItem.id))){
        	console.log(dataItem ," download ");
        	let download = new Download(dataItem);
            return download.save();
        }else{
        	resolve('success')
        }
	}
}      	