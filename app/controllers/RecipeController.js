var recipeExports = {
  getRecipe: function(req, res) {
    var ingredients = req.query.ingredients; // comma delimited string

    if(typeof ingredients === 'undefined') {
      res.send("Undefined ingredients!");
    } else {
      var recipes = recipeExports._getRecipeFromDB(ingredients);
      res.send("Got recipes -> " + recipes);
    }
  },

  createRecipe: function(req, res) {
    res.send("Created recipe.");
  },

  _getRecipeFromDB: function(ingredients) {
    var ingArr = ingredients.split(",")
    console.log(ingArr);
    
    // need to find recipe nodes connected to ingredient nodes with a max SUBSTITUTES_FOR distance of 1 from supplied ingredients
    return ingArr;
  }
}

module.exports = recipeExports;

