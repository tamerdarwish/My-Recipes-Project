
const render = new Render()
const module = new Module()

$("#search-button").on("click", function () {
    let input = $("input").val()
    module.input = input
    loadingArraysFiltering()
    filteringByCheckbox()
})

const loadingArraysFiltering = function () {

    module.getRecipes()
    module.getRecipesWithoutGluten()
    module.getRecipesWithoutDiary()
    module.getRecipesWithoutBoth()
}


const filteringByCheckbox = function () {
    const glutenCheckbox = document.getElementById('gluten-checkbox').checked
    const dairyCheckbox = document.getElementById('milk-checkbox').checked

    if (glutenCheckbox && !dairyCheckbox) {
        module.loadFirstEight(module.RecipesWithoutGluten)
        render.renderData(module.currentlyEightValues)
    }

    else if (dairyCheckbox && !glutenCheckbox) {

        module.loadFirstEight(module.RecipesWithoutDiary)
        render.renderData(module.currentlyEightValues)
    }

    else if (dairyCheckbox && glutenCheckbox) {

        module.loadFirstEight(module.RecipesWithoutBoth)
        render.renderData(module.currentlyEightValues)
    }

    else {
        module.loadFirstEight(module.recipesData)
        render.renderData(module.currentlyEightValues)
    }

    renderNext8 = function () {
        const glutenCheckbox = document.getElementById('gluten-checkbox').checked
        const dairyCheckbox = document.getElementById('milk-checkbox').checked

        if (glutenCheckbox && !dairyCheckbox) {
            module.loadNextEight(module.RecipesWithoutGluten)
            render.renderData(module.currentlyEightValues)
        }
    
        else if (dairyCheckbox && !glutenCheckbox) {
            module.loadNextEight(module.RecipesWithoutDiary)
            render.renderData(module.currentlyEightValues)
        }
    
        else if (dairyCheckbox && glutenCheckbox) {
            module.loadNextEight(module.RecipesWithoutBoth)
            render.renderData(module.currentlyEightValues)
        }
    
        else {
            module.loadNextEight(module.recipesData)
            render.renderData(module.currentlyEightValues)
        }

    }

    renderBack8 = function () {
        module.loadBackEight(module.recipesData)
        render.renderData(module.currentlyEightValues)
    }

}

$(document).on('click', 'img', function () {
    let firstIngredient = $(this).closest(".recipe").find('ul li').first().text()
    alert(firstIngredient)

});





