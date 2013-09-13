var express = require('express');
var neo4j = require('neo4j');
var jade = require('jade');

var app = express();
var db = new neo4j.GraphDatabase('http://localhost:7474');

app.get('/hello.txt', function(req, res){
  res.send('Hello World');
});

app.get('/', function(req, res){
  res.send("oh my");
});

app.listen(8921);
