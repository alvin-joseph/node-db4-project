
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('steps').del()
    .then(function () {
      // Inserts seed entries
      return knex('steps').insert([
        {step_number: 1, step_instructions: "do it", recipe_id: 1},
        {step_number: 2, step_instructions: "do it again", recipe_id: 1},
      ]);
    });
};
