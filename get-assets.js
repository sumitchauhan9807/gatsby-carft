var fs = require('fs');
var Filerequest = require('request');
const request = require("node-fetch");
const async = require("async");

exports.getAssets = () => {
  return new Promise((resolve,reject)=>{
    getAssetsData().then((res)=>{
      // get the assets data and for each file  call download function asynchronously
        var imagesData = res.data.assets;
        async.each(imagesData,function(thisImage,callback){
          download(thisImage.url, 'src/images/'+thisImage.title+"."+thisImage.extension, function(){
            console.log('*******Downloaded '+thisImage.title,"**********");
            callback()
          });
        }).then(()=>{
          // all assets are downloaded successfully 
          resolve('ALL ASSETS DOWNLOADED SUCCESSFULLY'); 
        })
    })
})
}



function getAssetsData(){
  // calls the craft graphQL and get the all assets data 
  // returns a Promise
    return new Promise((resolve,reject)=>{
        var query = `{
            assets {
              id title url extension
            }
          }`;
        request('http://vlb3.test/api', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              Authorization: 'Bearer q6SEk6sqGvYWqX1qUzyVtggIg-feOIE6',
            },
           body: JSON.stringify({
              query,
            })
          }).then(r => r.json()).then((data)=>{
                resolve(data)
          });
    })
}





var download = function(uri, filename, callback){
    Filerequest.head(uri, function(err, res, body){
        if(err){
           // console.log(err)
            callback()
        }else{
            Filerequest(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        }
       
    });
};

    

  