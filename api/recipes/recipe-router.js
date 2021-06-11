const express = require('express')
const { checkRecipeId } = require('./recipe-middleware')
const Recipe = require('./recipe-model.js')

const router = express.Router()

router.get('/:recipe_id', checkRecipeId, (req, res, next) => {
    Recipe.getRecipeById(req.params.recipe_id)
        .then(recipe => {
            res.json(recipe)
        })
        .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      sageAdvice: 'Finding the real error is 90% of the bug fix',
      message: err.message,
      stack: err.stack,
    })
  })

module.exports = router