const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')

module.exports = {
   index(req, res) {
      Recipe.all(function(recipes) {
         return res.render('index', {recipes})
      })
   },
   about(req, res) {
      return res.render('about')
   },
   recipes(req, res) {
      let {filter, page, limit} = req.query

      page = page || 1
      limit = limit || 6
      let offset = limit * (page -1)

      const params = {
         filter,
         page,
         limit,
         offset,
         callback(recipes) {
            const pagination = {
               total: Math.ceil(recipes[0].total / limit),
               page
            }

            return res.render('recipes', {recipes, pagination, filter})
         }
      }

      Recipe.paginate(params)
   },
   filteredRecipes(req, res) {
      let {filter, page, limit} = req.query

      page = page || 1
      limit = limit || 6
      let offset = limit * (page -1)

      const params = {
         filter,
         page,
         limit,
         offset,
         callback(recipes) {
            const pagination = {
               total: Math.ceil(recipes[0].total / limit),
               page
            }

            return res.render('filteredRecipes', {recipes, pagination, filter})
         }
      }

      Recipe.paginate(params)
   },
   chefs(req, res) {
      Chef.countRecipes(function(chefs) {
         return res.render('chefs', {chefs})
      })
   },
   show(req, res) {
      Recipe.find(req.params.id, function(recipe) {
         return res.render('recipe', {recipe})
      })
   }
}