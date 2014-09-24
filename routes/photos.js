var express = require('express');
var router = express.Router();
/* GET home page. */
router.post('/', function(req, res) {
  console.log(req.body.fileName);
  
  //creates a blob from a file that is local on this server
  //we already uplaoded a file at this point. Multur middleware took care of that
  global.blobService.createBlockBlobFromLocalFile('taskcontainer', req.body.filename , '../bin/uploads/' + req.files.uploadImage.name, function(error, result, response){
    if(error){
      return res.send(500, error);
    }
    
    return res.send(200, {message:'file sucessfully uploaded to blob storage!'});
  });
  
});

router.get('/', function(req, res){
  
  //list all blobs in this container
  global.blobService.listBlobsSegmented('taskcontainer', null, function(err,data, response){
   
    if(err){
      return res.send(500, err);
    }
    
    console.log(data);
    return res.send(200, data);
  });
  
});
module.exports = router;
