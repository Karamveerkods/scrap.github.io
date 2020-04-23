const http = require('http');
const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const {enlistFeedsForUser} = require("../config/api");
const { spawn } = require('child_process');
const shell = require('shelljs');
const { insert } = require("../models/operations/download");

async function downloadThumbnails(body){
	return new Promise((resolve, reject)=>{
		var wget = spawn('wget', [`-O`, path.join(__dirname,`../../assets/downloads/thumbnails/${body.data.thumbnail.path}/${body.data.thumbnail.name}`), `${body.downloadLinkThumbnail}`,'--no-proxy']);
		wget.stdout.on('data', (data) => {
			 console.log(`stdout: ${data}`);
		});

		wget.stderr.on('data', (data) => {
		  console.log(`stderr: ${data}`);
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

function generateRandom(index){
    return Math.floor((Math.random() * ((index * 1000)/2)) + 1000);    
}


module.exports = router => {
    router
    .route("/")
    .put((request, response) => {
    		if(!request.body.isFetchAllFeedsOfUser){
    				request.body.feeds.forEach(async(item, index) => {
						createDirectory('video',item);
						createDirectory('thumbnail',item);
						let isVideoDownloaded= await downloadVideos(item);
						console.log(isVideoDownloaded,'isVideoDownloaded')
						if(isVideoDownloaded==="success"){
							let isThumbnailDownloaded= await downloadThumbnails(item);
							console.log(isThumbnailDownloaded,"isThumbnailDownloaded")
							if(isThumbnailDownloaded==="success"){
								console.log(item.data);
							let isDataInserted = await insert(item.data);
						}
					}
				})
    		}else {
    			request.body.feeds.forEach((id, index) => {
					enlistFeedsForUser(id, response);
				})
			}
    })
	.get((request, response) => {
		
	})
}
