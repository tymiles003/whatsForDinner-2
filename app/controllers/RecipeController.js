module.exports = {
  getRecipe: function(req, res) {
    res.send("Got recipe. Ingredient is ", ingredient);
  },

  createRecipe: function(req, res) {
    res.send("Created recipe.");
  }
}