const express = require('express')
const router = express()
const axios = require('axios');

const dairyIngerdients = ["Cream", "Cheese", "Milk", "Butter", "Creme", "Ricotta", "Mozzarella", "Custard", "Cream Cheese"]
const glutenIngredients = ["Flour", "Bread", "spaghetti", "Biscuits", "Beer"]
const dairyGlutenIngredients = dairyIngerdients.concat(glutenIngredients);

const checkCommonsItems = function (arr1, arr2) {

    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {

            if (arr1[i] == arr2[j]) {
                return true;
            }
        }
    }
    return false;
}

function toLowerCaseArray(arr) {
    return arr.map(function(item) {
      return item.toLowerCase();
    });
  }
  

router.get('/recipes/:value', function (request, response) {
    let ingredient = request.params.value
    let withoutGlutenStatus = request.query.withoutGluten
    let withoutDiaryStatus = request.query.withoutDiary
    let recipesWithoutGluten = []
    let recipesWithoutDiary = []
    let recipesWithoutBoth = []

    axios.get('http://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/' + ingredient)
        .then(res => {
            let results = res.data.results
            let relivantResults = []

            for (let result of results) {
                relivantResults.push({ idMeal: result.idMeal, title: result.title, thumbnail: result.thumbnail, href: result.href, ingredients: result.ingredients })
            }

            for (let recipe of relivantResults) {
                if (!checkCommonsItems(toLowerCaseArray(recipe.ingredients), toLowerCaseArray(glutenIngredients))) {
                    recipesWithoutGluten.push(recipe)
                }
                if(!checkCommonsItems(toLowerCaseArray(recipe.ingredients), toLowerCaseArray(dairyIngerdients))){
                    recipesWithoutDiary.push(recipe)
                }
                if(!checkCommonsItems(toLowerCaseArray(recipe.ingredients), toLowerCaseArray(dairyGlutenIngredients))){
                    recipesWithoutBoth.push(recipe)
                }
            }

            if(withoutGlutenStatus == 'true' && withoutDiaryStatus == 'false'){
                response.send(recipesWithoutGluten)
            }
            else if(withoutGlutenStatus  == 'false' && withoutDiaryStatus == 'true'){
                response.send(recipesWithoutDiary)
            }
            else if(withoutGlutenStatus == 'true' && withoutDiaryStatus == 'true'){
                response.send(recipesWithoutBoth)
            } 
            else{
                response.send(relivantResults)
            }
            
        })
})

module.exports = router