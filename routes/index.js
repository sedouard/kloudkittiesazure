var express = require('express');
var router = express.Router();
var azure = require('azure-storage');
global.host = 'dpeproject' + '.blob.core.windows.net';
global.blobService = azure.createBlobService(process.env.CONTAINER_NAME, 
process.env.STORAGE_KEY, global.host);
console.log('Storage key: ' + process.env.STORAGE_KEY);

/////////////////////////////////////
//Create a blob container in azure
/////////////////////////////////////
global.blobService.createContainerIfNotExists('taskcontainer', {publicAccessLevel : 'blob'}, function(error, result, response){
    if(error){
        return console.log(error);
    }
    
    if(result){
    
        console.log('created new container');
    
    }
    else{
        console.log('container taskcontainer already exists');
    }
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Kloud Kitties Azure Storage Example',
  blobBaseUrl: 'http://' + global.host + "/taskcontainer" });
});

module.exports = router;
