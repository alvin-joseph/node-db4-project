const request = require('supertest')
const server = require('./server')
const db = require('../data/db-config')

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

test('sanity', () => {
    expect(true).toBeTruthy()
})

describe('[GET] /', () => {
    it('returns a status 200 OK', async () => {
        const res = await request(server).get('/api/recipes')
        expect(res.status).toBe(200)
    })
})
describe('[GET] /:recipe_id', () => {
    it('returns a status 200 OK', async () => {
        const res = await request(server).get('/api/recipes/1')
        expect(res.status).toBe(200)
        expect(res.body).toMatchObject(
            {"created_at": res.body.created_at, "recipe_id": 1, 
            "recipe_name": "Spaghetti Bolognese", 
            "steps": [{"ingredients": [], "step_id": 1, 
            "step_instructions": "make da food", "step_number": 1}]})
    })
})