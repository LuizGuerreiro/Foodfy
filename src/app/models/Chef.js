const db = require('../../config/db')

module.exports = {
   all(callback) {
      db.query(`SELECT * FROM chefs ORDER BY name`, function(err,results) {
         if(err) throw `DATABASE ERROR! ${err}`
         callback(results.rows)
      })
   },
   create(data, callback) {
      const query = `
         INSERT INTO chefs (
            name,
            avatar_url,
            created_at
         ) VALUES ($1, $2, $3)
         RETURNING id
      `
      const values = [
         data.name,
         data.avatar_url,
         new Date()
      ]

      db.query(query, values, function(err, results) {
         if(err) throw `DATABASE ERROR! ${err}`
         callback(results.rows[0])
      })
   },
   find(id, callback) {
      db.query(`
         SELECT chefs.*, COUNT(recipes) as totalrecipes
         FROM chefs
         LEFT JOIN recipes
         ON (chefs.id = recipes.chef_id)
         WHERE chefs.id = $1
         GROUP BY chefs.id
      `, [id],
      function(err, results) {
         if(err) throw `DATABASE ERROR! ${err}`
         callback(results.rows[0])
      })
   },
   update(data, callback) {
      const query = `
         UPDATE chefs SET
         name = ($1),
         avatar_url = ($2)
         WHERE id = $3
      `

      const values = [
         data.name,
         data.avatar_url,
         data.id
      ]

      db.query(query, values, function(err, results) {
         if(err) throw `DATABASE ERROR! ${err}`
         callback()
      })
   },
   delete(id, callback) {
      db.query(`
         DELETE FROM chefs
         WHERE id = $1
      `, [id],
      function(err, results) {
         if(err) throw `DATABASE ERROR! ${err}`
         callback()
      })
   },
   countRecipes(callback) {
      const query = `
         SELECT chefs.*, COUNT(recipes) as totalrecipes
         FROM chefs
         LEFT JOIN recipes
         ON (chefs.id = recipes.chef_id)
         GROUP BY chefs.id
      `
      db.query(query, function(err,results) {
         if(err) throw `DATABASE ERROR! ${err}`
         callback(results.rows)
      })
   }
}