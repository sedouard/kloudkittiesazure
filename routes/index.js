var express = require('express');
var router = express.Router();
var azure = require('azure-storage');
global.host = 'dpeproject' + '.blob.core.windows.net';
global.blobService = azure.createBlobService('dpeproject', 
'yeJ0vTR+oGq+h4alo0bJ1WYCXYBEnqGZ8/fGAPR1ytAlQDUgMFHHwVEmd+JBZIwhGrXkhsZyhQ2HeJf2c4f7cg==', global.host);

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
