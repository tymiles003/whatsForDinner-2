var express = require('express');
var neo4j = require('neo4j');
var jade = require('jade');

var recipeController = require('./app/controllers/RecipeController');

var app = initApp();

db = initDb();
ingredient = require('./app/models/Ingredient');
recipe = require('./app/models/Recipe');

var PORT = 8921;

app.listen(PORT);

function initDb() {
  var db = new neo4j.GraphDatabase('http://localhost:7474');

  if(dataNeedsLoading()) {
    console.log("Need to load ingredient and recipe data.");
    loadData();
  };

  function dataNeedsLoading() {
    console.log("argle");
    return true;
  };

  function loadData() {
    console.log("bargle");

//	db.createNode({initialized: true}).save(function (err, node) {
//    if (err) {
//        console.err('Error saving new node to database:', err);
//    } else {
//        console.log('Node saved to database with id:', node.id);
//    }
//	});
  };

  return db;
}

function initApp() {
  var app = express();
  app.get('/', function(req, res){
    res.send('Hello World');
  });

  app.get('/recipe', recipeController.getRecipe);
  app.post('/recipe', recipeController.createRecipe);

  return app;
}