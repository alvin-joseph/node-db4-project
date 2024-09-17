const db = require('../../data/db-config')
const Recipe = require('./recipe-model')

test('sanity', () => {
    expect(process.env.NODE_ENV).toBe('testing')
})

beforeAll(async () => {
    //reconstruct the db from scratch
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    //reseed the tables
    await db('recipes').truncate()
    await db('ingredients').truncate()
    await db('steps').truncate()
    await db('steps_ingredients').truncate()
    await db.seed.run()
})
afterAll(async () => {
    //disconnect from the db
    await db.destroy()
})

describe('recipes model', () => {
    describe('getAll', () => {
        test('returns all recipes in db', async () => {
            const data = await Recipe.getAll()
            expect(data).toHaveLength(3)
        })
        test('returns the correct recipes with all their props', async () => {
            const data = await Recipe.getAll()
            expect(data).toMatchObject([
                {"created_at": data[0].created_at, "recipe_id": 1, "recipe_name": "Spaghetti Bolognese", 
                "steps": [{"ingredients": [], "step_id": 1, "step_instructions": "make da food", "step_number": 1}, 
                {"ingredients": [], "step_id": 2, "step_instructions": "eat da food", "step_number": 1}, 
                {"ingredients": [], "step_id": 3, "step_instructions": "take a nap", "step_number": 1}]}, 
                {"created_at": data[1].created_at, "recipe_id": 2, "recipe_name": "Pizza!", 
                "steps": [{"ingredients": [], "step_id": 1, "step_instructions": "make da food", "step_number": 1}, 
                {"ingredients": [], "step_id": 2, "step_instructions": "eat da food", "step_number": 1}, 
                {"ingredients": [], "step_id": 3, "step_instructions": "take a nap", "step_number": 1}]}, 
                {"created_at": data[2].created_at, "recipe_id": 3, "recipe_name": 
            "Ribs", "steps": [{"ingredients": [], "step_id": 1, "step_instructions": "make da food", "step_number": 1}, 
            {"ingredients": [], "step_id": 2, "step_instructions": "eat da food", "step_number": 1}, 
            {"ingredients": [], "step_id": 3, "step_instructions": "take a nap", "step_number": 1}]}])
        })
    })
    describe('getbyId', () => {
        test('returns the recipe by the given id', async () => {
            const pizza = await Recipe.getRecipeById(2)
            expect(pizza).toMatchObject({ "recipe_id": 2, "recipe_name": "Pizza!" })
        })
    })
})