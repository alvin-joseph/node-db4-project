const db = require('../../data/db-config')

const checkRecipeId = async (req, res, next) => {
    try {
        const existing = await db('recipes')
            .where('recipe_id', req.params.recipe_id)
            .first()
        
        if (!existing) {
            next({
                status: 404,
                message: "can't find id"
            })
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    checkRecipeId
}