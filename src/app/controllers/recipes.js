const Recipe = require("../models/Recipe");

module.exports = {
   index(req, res) {
      Recipe.all(function(recipes) {
         return res.render('admin/recipes/index', {recipes})
      })
   },
   create(req, res) {
      Recipe.chefSelectOption(function(chefOptions) {
         return res.render('admin/recipes/create', {chefOptions})
      })
   },
   show(req, res) {
      Recipe.find(req.params.id, function(recipe) {
         if(!recipe) return res.send('Recipe not found!')
         return res.render('admin/recipes/show', {recipe})
      })
   },
   edit(req, res) {
      Recipe.find(req.params.id, function(recipe) {
         if(!recipe) return res.send('Recipe not found!')
         Recipe.chefSelectOption(function(chefOptions) {
            return res.render('admin/recipes/edit', {recipe, chefOptions})
         })
      })
   },
   post(req, res) {
      const keys = Object.keys(req.body)

      function notEmpty(item) {
         return item != ""
      }
      
      req.body.ingredients = req.body.ingredients.filter(notEmpty)
      req.body.preparation = req.body.preparation.filter(notEmpty)
      
      for(key of keys) {
         if(req.body[key] == "")
            return res.send('Por favor, preencha todos os campos!')
      }

      Recipe.create(req.body, function(chef) {
         return res.redirect('/admin/recipes')
      })
   
      
   },
   put(req, res) {
      const keys = Object.keys(req.body)

      function notEmpty(item) {
         return item != ""
      }
      
      req.body.ingredients = req.body.ingredients.filter(notEmpty)
      req.body.preparation = req.body.preparation.filter(notEmpty)
      
      for(key of keys) {
         if(req.body[key] == "")
            return res.send('Por favor, preencha todos os campos!')
      }

      Recipe.update(req.body, function() {
         return res.redirect(`/admin/recipes/${req.body.id}`)
      })
   },
   delete(req, res) {
      Recipe.delete(req.body.id, function() {
         return res.redirect('/admin/recipes')
      })
   }
}