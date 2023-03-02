dairyIngredients = ["Cream", "Cheese", "Milk", "Butter", "Creme", "Ricotta", "Mozzarella", "Custard", "Cream Cheese"]
glutenIngredients = ["Flour", "Bread", "spaghetti", "Biscuits", "Beer"]


const fetchRecipesData = function () {
    $('#recipes-container').empty()
    let input = $("input").val()


    $.get(`recipes/${input}`, function (recipesData) {
        renderByFiltering(recipesData)
    })
}

const renderByFiltering = function (recipesData) {
    const glutenCheckbox = document.getElementById('gluten-checkbox').checked
    const dairyCheckbox = document.getElementById('milk-checkbox').checked

    if (glutenCheckbox && !dairyCheckbox) {
        render(getGlutenFilteredArray(recipesData))
    }
    else if (dairyCheckbox && !glutenCheckbox) {

        render(getdairyFilteredArray(recipesData))
    }
    else if (dairyCheckbox && glutenCheckbox) {

        render(getDairyGlutenFilteredArray(recipesData))
    }
    else {
        render(recipesData)
    }
}

const getFilterRecipes = function (recipesData, ingredientsArray) {
    let filteredRecipedArray = []
    for (let recipe of recipesData) {
        let alreadyInside = filteredRecipedArray.includes(recipe)
        const containStatus = checkCommonsItems(recipe.ingredients, ingredientsArray)

        if (containStatus && alreadyInside) {
            filteredRecipedArray.splice(filteredRecipedArray.indexOf(recipe), 1)
            break
        }
        else if (containStatus && !alreadyInside) {

            break
        }
        else if (!containStatus && !alreadyInside) {

            filteredRecipedArray.push(recipe)
        }
        else if (!containStatus && alreadyInside) {

            filteredRecipedArray.pop()
            filteredRecipedArray.push(recipe)
        }
    }

    return filteredRecipedArray
}

const getGlutenFilteredArray = function (recipesData) {

    return getFilterRecipes(recipesData, glutenIngredients)
}

const getdairyFilteredArray = function (recipesData) {
    return getFilterRecipes(recipesData, dairyIngredients)
}

const getDairyGlutenFilteredArray = function (recipesData) {

    const dairyGlutenIngredients = dairyIngredients.concat(glutenIngredients);
    return getFilterRecipes(recipesData, dairyGlutenIngredients)

}

function checkCommonsItems(arr1, arr2) {

    for (let i = 0; i < arr1.length; i++) {

        for (let j = 0; j < arr2.length; j++) {

            if (arr1[i] == arr2[j]) {
                return true;
            }
        }
    }
    return false;
}

const render = function (recipesData) {
    const source = $('#recipes-template').html();
    const template = Handlebars.compile(source);
    const newHTML = template({ recipe: recipesData });
    $('#recipes-container').append(newHTML);
}

$(document).on('click', 'img', function () {
    let firstIngredient = $(this).closest(".recipe").find('ul li').first().text()
    alert(firstIngredient)

});
