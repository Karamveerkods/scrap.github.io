const rp = require('request-promise');
const urls = require('./urls');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { insert } = require("../models/operations/download");
const { getViewedItems } = require("../models/operations/viewedItem")
const { insertItemStatus } = require("../models/operations/viewedItem")
const shell = require('shelljs');
//const jsonResponse = require("../../assets/data/fetchForFirstTime");



function checkForErrorConditions(err, response){
	response.status(404).send("error")
}

function generateRandom(index){
    return Math.floor((Math.random() * ((index * 1000)/2)) + 1000);    
}

async function downloadThumbnails(body){
	return new Promise((resolve, reject)=>{
		var wget = spawn('wget', [`-O`, path.join(__dirname,`../../assets/downloads/thumbnails/${body.data.thumbnail.path}/${body.data.thumbnail.name}`), `${body.downloadLinkThumbnail}`,'--no-proxy']);
		wget.stdout.on('data', (data) => {
			// console.log(`stdout: ${data}`);
		});

		wget.stderr.on('data', (data) => {
		  //console.log(`stderr: ${data}`);
		});

		wget.on('close', (code) => {
			if(code === 0){
				resolve("success");
			}else{
				reject(code);
			}			
		});
	})
}

async function downloadVideos(body){
	return new Promise((resolve, reject) =>{
		var wget = spawn('wget', [`-O`, path.join(__dirname,`../../assets/downloads/videos/${body.data.video.path}/${body.data.video.name}`),`${body.downloadLinkVideo}`,'--no-proxy']);
		wget.stdout.on('data', (data) => {
			 console.log(`stdout: ${data}`);
		});

		wget.stderr.on('data', (data) => {
	  		console.log(`stderr: ${data}`);
		});

		wget.on('close', (code) => {
			console.log(code,'code	')
			if(code === 0){
				resolve("success");
			}else{
				reject(code);
			}		
	  	
		});
	})
}

function createDirectory(type, body){	
	console.log("createDirectory")
	if(type === "video"){
		shell.mkdir('-p', path.join(__dirname, `../../assets/downloads/videos/${body.data.video.path}`))
	}else if(type === "thumbnail"){
		shell.mkdir('-p', path.join(__dirname, `../../assets/downloads/thumbnails/${body.data.video.path}`)) 
	}
}

function fetchItems(isFetchAllItem, body_data, body_extra, response){
		getViewedItems().then((res) =>{
			res = res.reduce((acc, ele) => {
				acc.push(+ele.id);
				return acc;
			}, [])
		let freshFeeds = body_data.filter((ele, index) => {
        	if (!res.includes(ele.data.id))
           		return ele;
   		});
  		insertItemStatus(freshFeeds).then((res) => {
   			if(!isFetchAllItem){	
			let files = freshFeeds.reduce((acc, ele) => {
				(ele.data.stats.play_count >= 1000  || ele.data.stats.digg_count >= 100 )?acc[0].push({
						"downloadLinkVideo":ele.data.video.download_url[0],
						"downloadLinkThumbnail":ele.data.video.cover_thumb.url_list[0],
			            "followers":ele.data.author.fan_ticket_count,
			            "data":{
				                "id": ele.data.id,
				                "author":{
				                	"id":ele.data.author.id,
				                	"name":ele.data.author.nickname	
				                }, 
				                "video":{
				                	"name": `${(ele.data.id).toString()}.mp4`,
				                	"path": `${(ele.data.id).toString().match(/.{1,5}/g).join("/")}` 
				            	},
				                "thumbnail":{
				                	"name":`${(ele.data.id).toString()}.webp`,
				                	"path": `${(ele.data.id).toString().match(/.{1,5}/g).join("/")}` 
		                		},
		                		"metaData":{
		                			"likes":ele.data.stats.digg_count,
		        	            	"comments":ele.data.stats.comment_count,
	    		                	"shares":ele.data.stats.share_count,
	                	        	"views":ele.data.stats.play_count,
		                			"title":ele.data.share_title,
						        	"create_time":ele.data.video.create_time,
						        	"duration":ele.data.video.duration,
						        	"preload_size":ele.data.video.preload_size
		                		}
							}
						}):acc[1].push({
							"id": ele.data.id,
							"video":{
								"id": ele.data.video.video_id,
								"title":ele.data.share_title,
								"download_url": ele.data.video.download_url[0],
								"thumbnail": ele.data.video.cover_thumb.url_list[0],	
								"create_time":ele.data.video.create_time,
						        "duration":ele.data.video.duration,
						        "preload_size":ele.data.video.preload_size,
								"stats": ele.data.stats
							},
							"author":{
								"id":ele.data.author.id,
								"username":ele.data.author.nickname,
								"followers":ele.data.author.fan_ticket_count,
								"description":ele.data.author.signature
							}
						})
						return acc; 		
					}, [[],[]]);
					
					let filterForDownloads = files[0].reduce(function(acc, item){
						(item.followers >= 2000)?acc[0].push(item):acc[1].push(item);
						return acc;
					},[[],[]])
					filterForDownloads[0].forEach(async function(data, index){
						enlistUserHelper(data.data.author.id)
					})
					files[0].forEach(async function(data, index){
						createDirectory('video',data);
						createDirectory('thumbnail',data);
						let isVideoDownloaded= await downloadVideos(data);
						console.log(isVideoDownloaded,'isVideoDownloaded')
						if(isVideoDownloaded==="success"){
							let isThumbnailDownloaded= await downloadThumbnails(data);
							if(isThumbnailDownloaded==="success"){
								let isDataInserted = await insert(data.data);
								console.log(isDataInserted,'isDataInserted')
							}
						}
					})	
					response.status(200).send({"data":files[1], "extra":{
						"total":body_extra.total,
						"hasmore":body_extra.has_more,
						"max_time":body_extra.max_time
					}});	
				}
				else{
					let files = freshFeeds.reduce((acc, ele) => {	
						acc.push({
							"downloadLinkVideo":ele.data.video.download_url[0],
							"downloadLinkThumbnail":ele.data.video.cover_thumb.url_list[0],
			               	"data":{
				                "id": ele.data.id,
				                "author": {
				                	"id":ele.data.author.id,
				                	"name":ele.data.author.nickname
				                },
				                "video":{
				                	"name": `${(ele.data.id).toString()}.mp4`,
				                	"path": `${(ele.data.id).toString().match(/.{1,5}/g).join("/")}` 
				               	},
				                "thumbnail":{
				                    "name":`${(ele.data.id).toString()}.webp`,
				                    "path": `${(ele.data.id).toString().match(/.{1,5}/g).join("/")}` 
		                		},
		                		"metaData":{
		                			"likes":ele.data.stats.digg_count,
		        	                "comments":ele.data.stats.comment_count,
	    		                    "shares":ele.data.stats.share_count,
	                		        "views":ele.data.stats.play_count
		                		}
							}
					});
					return acc;
				}, []);
				files.forEach(async function(data, index){
					console.log(data, "data");
					createDirectory('video',data);
					createDirectory('thumbnail',data);
					let isVideoDownloaded= await downloadVideos(data);
					console.log(isVideoDownloaded,'isVideoDownloaded')
					if(isVideoDownloaded==="success"){
						let isThumbnailDownloaded= await downloadThumbnails(data);
						if(isThumbnailDownloaded==="success"){
							let isDataInserted = await insert(data.data);
							console.log(isDataInserted,'isDataInserted')
						}
					}
				})
			}
   		}).catch(error =>{
   			console.log(error, " error while inserting ");
   		})
	})

}
async function enlistUserHelper(id, response, maxTime, set){
		let url;
		let offset;
		let prexiousOffset = set || 0; 
		if(!maxTime){
			url= urls.enlistVideosByUser.uri.replace('ID',id);
		}else{
			url= urls.enlistVideosByUserForMoreLoad.uri.replace('ID',id);
			url= url.replace('maximumTime',maxTime);
		}
		try{
			let file= await getUserData(url);
			console.log(JSON.parse(file), " jsonFile")
			if(JSON.parse(file).status_code === 10010 || JSON.parse(file).extra.total=== 0){
				if(response){
					response.status(404).send("no_Data");
				}
			}
			if(JSON.parse(file).data.length >= JSON.parse(file).extra.total){
				fetchItems(true, JSON.parse(file).data, JSON.parse(file).extra, response);
			}else{
				fetchItems(true, JSON.parse(file).data, JSON.parse(file).extra, response);
				if(JSON.parse(file).extra.hasmore){
					offset = 10 + prexiousOffset
					url= url.replace('offSet', offset);
					enlistFeedsForUser(id, undefined, JSON.parse(file).extra.max_time, offset)
				}
			}
		}catch(err){
			console.log(err, " <= err")
		}
}

async function getUserData(url){
	return rp.get(url)
}

module.exports={
	enlistVideosForFirstTimeApi: (response)=>{
		const url= urls.enlistVideosForFirstTimeUrl;
		rp
		.get(url)
		.then(file=>{
			fetchItems(false, JSON.parse(file).data, JSON.parse(file).extra, response);
		})
		.catch(err=>{
			checkForErrorConditions(err, response);
		})
	},
	enlistVideosForOnPageChangeApi: (maximumTime, response)=>{
		const url= urls.enlistVideosForOnPageChangeUrl.replace('maximumTime',maximumTime);
		rp
		.get(url)
		.then(file=>{
			fetchItems(false, JSON.parse(file).data, JSON.parse(file).extra, response);
		})
		.catch(err=>{
				checkForErrorConditions(err, response);
			})
		},
		enlistFeedsForUser: async (id, response, maxTime, set)=> {
			enlistUserHelper(id, response, maxTime, set)
		}
}