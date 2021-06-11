exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('steps_ingredients').del()
    .then(function () {
      // Inserts seed entries
      return knex('steps_ingredients').insert([
        {step_id: 1, ingredient_id: 1, ingredient_quantity: 0.1},
        {step_id: 2, ingredient_id: 2, ingredient_quantity: 0.05},
      ]);
    });
};
