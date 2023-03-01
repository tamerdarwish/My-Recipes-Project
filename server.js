const express = require('express')
const path = require('path')
const app = express()
const axios = require('axios');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.get('/recipes/:value', function (request, response) {
    let ingredient = request.params.value
   //response.send(ingredient)

   
axios.get('http://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/'+ingredient)
.then(res => {
    let results = res.data.results
    let relivantResults = []

    for(let result of results){
        relivantResults.push({idMeal: result.idMeal, title: result.title, thumbnail: result.thumbnail, href: result.href, ingredients: result.ingredients})
    }
   //console.log(relivantResults);
   response.send(relivantResults)
})
})


const port = 3456 //because why not
app.listen(port, function () {
    console.log(`Server running on ${port}`)
})