const fs = require('fs')
const data = require('../data.json')

exports.index = function(req, res) {
   return res.render('admin/index', {recipes: data.recipes})
};
exports.create = function(req, res) {
   return res.render('admin/create')
};
exports.show = function(req, res) {
   const id = req.params.id;
   const recipe = data.recipes[id];
   return res.render('admin/show', {recipe: recipe, id})
};
exports.edit = function(req, res) {
   const id = req.params.id;
   const recipe = data.recipes[id];
   return res.render('admin/edit', {recipe: recipe, id})
};
exports.post = function(req, res) {
   let {image, title, author, ingredients, preparation, information} = req.body

   function notEmpty(item) {
      return item != ""
   }

   ingredients = ingredients.filter(notEmpty)
   preparation = preparation.filter(notEmpty)

   data.recipes.push({
      image,
      title,
      author,
      ingredients,
      preparation,
      information
   })

   fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
      if(err)
        return res.send("Write file error!")

      return res.redirect('/admin/recipes')
   })
};
exports.put = function(req, res) {
   let {id, image, title, author, ingredients, preparation, information} = req.body

   function notEmpty(item) {
      return item != ""
   }

   ingredients = ingredients.filter(notEmpty)
   preparation = preparation.filter(notEmpty)

   const recipe = {
      image,
      title,
      author,
      ingredients,
      preparation,
      information
   }

   data.recipes[id] = recipe

   fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
      if(err)
        return res.send("Write file error!")

      return res.redirect(`/admin/recipes/${id}`)
   })
};
exports.delete = function(req, res) {
   const index = req.params.id
   data.recipes.splice(index, 1)

   fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
      if(err)
        return res.send("Write file error!")

      return res.redirect('/admin/recipes')
   })
};