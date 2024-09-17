
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('steps').del()
    .then(function () {
      // Inserts seed entries
      return knex('steps').insert([
        {step_number: 1, step_instructions: "make da food", recipe_id: 1},
        {step_number: 1, step_instructions: 'eat da food', recipe_id: 2},
        {step_number: 1, step_instructions: 'take a nap', recipe_id: 3},
      ]);
    });
};
