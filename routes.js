const express = require('express')
const router = express()
const axios = require('axios');

router.get('/recipes/:value', function (request, response) {
    let ingredient = request.params.value

axios.get('http://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/'+ingredient)
.then(res => {
    let results = res.data.results
    let relivantResults = []

    for(let result of results){
        relivantResults.push({idMeal: result.idMeal, title: result.title, thumbnail: result.thumbnail, href: result.href, ingredients: result.ingredients})
    }
   response.send(relivantResults)
})
})

module.exports = router