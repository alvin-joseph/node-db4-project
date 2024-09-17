const db = require('../../data/db-config')

async function getAll() {
  const rows = await db('recipes as rp')
        .select('rp.*', 'st.recipe_id', 'st.step_id', 'st.step_number', 'st.step_instructions', 'ing.*', 'si.ingredient_quantity')
        .join('steps as st', 'rp.recipe_id', 'st.recipe_id')
        .join('steps_ingredients as si', 'st.step_id', 'si.step_id')
        .join('ingredients as ing', 'si.ingredient_id', 'ing.ingredient_id')
        .groupBy('st.recipe_id')
  
  
  const used = []
  const steps = rows.map(x => {
      const currentStep = x.step_id
      if(!used.includes(x.step_id)){
          return {
            step_id: x.step_id,
            step_number: x.step_number,
            step_instructions: x.step_instructions,
            ingredients: rows.filter(a => {
                a.step_id == currentStep
              }).map(a => {
                return {
                  ingredient_id: a.ingredient_id,
                  ingredient_name: a.ingredient_name,
                  ingredient_quantity: a.ingredient_quantity
                }
              })
            }
          }
          used.push(x.step_id)
        })
          
    const transformedData = rows.map(row => {
      return {recipe_id: row.recipe_id,
      recipe_name: row.recipe_name,
      created_at: row.created_at,
      steps: steps}
    })
    return transformedData
}

async function getRecipeById(recipe_id) {
    const rows = await db('recipes as rp')
        .select('rp.*', 'st.step_id', 'st.step_number', 'st.step_instructions', 'ing.*', 'si.ingredient_quantity')
        .join('steps as st', 'rp.recipe_id', 'st.recipe_id')
        .join('steps_ingredients as si', 'st.step_id', 'si.step_id')
        .join('ingredients as ing', 'si.ingredient_id', 'ing.ingredient_id')
        .where('rp.recipe_id', recipe_id)
    //select rp.*, st.*, ing.*,si.ingredient_quantity FROM recipes as rp
    // join steps as st on rp.recipe_id = st.recipe_id
    // join steps_ingredients as si on st.step_id = si.step_id
    // join ingredients as ing on si.ingredient_id = ing.ingredient_id
    // const result = {
    //     recipe_id: rows[0].recipe_id,
    //     recipe_name: rows[0].recipe_name,
    //     created_at: rows[0].created_at,
    //     steps: []
    // }

    // rows.forEach(row => {
    //     if(row.step_id) {
    //         result.steps.push({
    //             step_id: row.step_id,
    //             step_number: row.step_number,
    //             step_instructions: row.step_instructions,
    //             ingredients: []
    //         })
    //     }
    // })

    // rows.forEach(row => {
    //     if(row.ingredient_id) {
    //         result.steps.ingredients.push({
    //             ingredient_id: row.ingredient_id,
    //             ingredient_name: row.ingredient_name,
    //             quantity: row.ingredient_quantity
    //         })
    //     }
    // })
    const used = []
    const steps = rows.map(x => {
        const currentStep = x.step_id
        if(!used.includes(x.step_id)){
            return {
              step_id: x.step_id,
              step_number: x.step_number,
              step_instructions: x.step_instructions,
              ingredients: rows.filter(a => {
                  a.step_id == currentStep
                }).map(a => {
                  return {
                    ingredient_id: a.ingredient_id,
                    ingredient_name: a.ingredient_name,
                    ingredient_quantity: a.ingredient_quantity
                  }
                })
              }
            }
            used.push(x.step_id)
          })
            
      const transformedData = {
        recipe_id: rows[0].recipe_id,
        recipe_name: rows[0].recipe_name,
        created_at: rows[0].created_at,
        steps: steps[0].step_id == null ? [] : steps
      }
      return transformedData

    //return result
}

module.exports = {
    getAll,
    getRecipeById
}