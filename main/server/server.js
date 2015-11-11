var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var flashyDir = '../../flashy cards/';

var port = 8888;

var app = express();

app.use(bodyParser.json());

app.use(express.static('../client'));

app.get('/hey', function(req, res){
  res.sendStatus(200);
});


//send one file to client
app.post('/readFile', function(req, res, next){
  var fileName = req.body.fileName;
  console.log('/readFile', req.body.fileName, flashyDir+fileName);
  fs.readFile(flashyDir+fileName, 'utf8', function(err, data){
    if (err){
      res.sendStatus(400);
    } else {
      res.send(data);
    }//close if statement
  });//close fs
});

//read all files, and only return the names
app.get('/listFiles', function(req, res, next){
  fs.readdir(flashyDir, function(err, data){
    if (err){
      res.sendStatus(400, 'something terrible happened');
    } else {
      res.send(data);
    }//close if statement
  }); //close fs
});

app.post('/writeFile', function(req, res, next){
  var fileName = req.body.fileName;
  console.log('trying to save file', fileName, req.body.file);
  fs.writeFile(flashyDir+fileName, req.body.file, function(err){
    if (err){
      res.sendStatus(500);
    } else {
      res.sendStatus(200, "got the file");
    }

  });//close fs

});

app.listen(port);

console.log('this should be running at http://localhost:'+port);
