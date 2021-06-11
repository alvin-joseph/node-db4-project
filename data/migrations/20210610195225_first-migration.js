
exports.up = function(knex) {
    return knex.schema
        .createTable('recipes', table => {
            table.increments('recipe_id')
            table.string('recipe_name').notNullable()
            table.timestamp('created_at').defaultTo(knex.fn.now())
        })
        .createTable('ingredients', table => {
            table.increments('ingredient_id')
            table.string('ingredient_name').notNullable()
        })
        .createTable('steps', table => {
            table.increments('step_id')
            table.integer('step_number').notNullable()
            table.string('step_instructions').notNullable()
            table.integer('recipe_id')
                .unsigned()
                .notNullable()
                .references('recipe_id')
                .inTable('recipes')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')
        })
        .createTable('steps_ingredients', table => {
            table.increments('steps_ingredients_id')
            table.integer('step_id')
                .unsigned()
                .notNullable()
                .references('step_id')
                .inTable('steps')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')
            table.integer('ingredient_id')
                .unsigned()
                .notNullable()
                .references('ingredient_id')
                .inTable('ingredients')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')
            table.integer('ingredient_quantity').notNullable()
        })
    }
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('steps_ingredients')
    .dropTableIfExists('steps')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('recipes')   
}