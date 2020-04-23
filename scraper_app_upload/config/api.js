const rp = require('request-promise');
const FormData = require('form-data');
var formData = require('form-data');
var fs = require('fs');
const path = require('path');
const { userId } = require("./init");

module.exports={
  sendDataToServer:(req, urlToDeployOn)=>{
    console.log(req, urlToDeployOn),'urlToDeployOn=========='
    return new Promise((resolve, reject) =>{
      let  url= urlToDeployOn || 'http://dev-api.coolfie.io/content/'
      console.log(req.body, " userId.id ");
      var form = new FormData();
      form.append('file', fs.createReadStream(path.join(__dirname,`../../assets/downloads/${req.body.path}`)));
      form.append('details', JSON.stringify({'title':req.body.details.title ,'user_uuid':req.body.details.author ,'hashtags':req.body.details.tags , 'ContentScore':0, 'categoryTitle':req.body.details.category, 'videoShade':req.body.details.videoShade, 'trackInfo':req.body.details.trackInfo , 'videoFilterInfo':{} }));
        form.submit(url, function(err, res) {
        if (err){
          reject({"message":"error", "data":req.body.details.video});
          //console.log(err,"err");
        }
        else if(res){
          resolve({"message": "success", "data":req.body});
        }
      });
    })
  }
}