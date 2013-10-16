var express = require('express');
var neo4j = require('neo4j');
var jade = require('jade');
var fs = require('fs');

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
    return true;
  };

  function loadData() {
    _load('./data/RecipeData.txt', loadRecipes);
    _load('./data/IngredientData.txt', loadIngredients)
    _load('./data/RecipeRequiresData.txt', loadRecipeRequirements)
    _load('./data/IngredientSubstitutesData.txt', loadIngredientSubstitutions)
  };

  function _load(file, handler) {
    fs.readFile(file, function(e, data) {
      var records = data.toString().split("\n");
      records.forEach(function(record) {
        handler(record.split(","));
      });
    });
  };

  function loadRecipes(fields) {
    if(fields.length < 3) {
      return;
    }
    var id = fields[0];
    var name = fields[1];
    var meal = fields[2];

    var node = db.createNode({type: "recipe", name: name, meal: meal, wfdid: id});

    node.save(function (err, node) {
      if (err) {
        console.err('Error saving new node to database:', err);
      } else {
        console.log('Recipe ' + name + ' saved to database with id:', node.id);
      }
    });
  };

  function loadIngredients(fields) {
    if(fields.length < 2) {
      return;
    }

    var id = fields[0];
    var name = fields[1];

    var node = db.createNode({name: name, type: "ingredient", wfdid: id});

    node.save(function (err, node) {
      if (err) {
        console.err('Error saving new node to database:', err);
      } else {
        console.log('Ingredient ' + name + ' saved to database with id:', node.id);
      }
    });
  };

  function loadRecipeRequirements(fields) {
    if(fields.length < 3) {
      return;
    }

    var recipeId = fields[0];
    var relationship = fields[1];
    var ingredientId = fields[2];
    console.log("Trying to load a recipe->ingredient relationship - {recipe: " + recipeId + " " + relationship + " ingredient: " + ingredientId + "}");
  };

  function loadIngredientSubstitutions(fields) {
    if(fields.length < 3) {
      return;
    }
    var aId = fields[0];
    var relationship = fields[1];
    var bId = fields[2];
    console.log("Trying to load an ingredient->ingredient relationship - {ingredient A: " + aId + " " + relationship + " ingredient B: " + bId + "}");
  };

  return db;
}

function initApp() {
  var app = express();
  app.get('/', function(req, res){
    res.send('<a href="/recipe">Recipe Controller </a>');
  });

  app.get('/recipe', recipeController.getRecipe);
  app.post('/recipe', recipeController.createRecipe);

  return app;
}