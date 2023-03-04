
const render = new Render()
const module = new Module()


$("button").on("click", function () {
    let input = $("input").val()
    module.input = input
    loadingArraysFiltering()
    filteringByCheckbox()
})

const loadingArraysFiltering = function(){

    module.getRecipes()
    module.getRecipesWithoutGluten()
    module.getRecipesWithoutDiary()
    module.getRecipesWithoutBoth()
}

const filteringByCheckbox = function(){
    const glutenCheckbox = document.getElementById('gluten-checkbox').checked
    const dairyCheckbox = document.getElementById('milk-checkbox').checked

    if (glutenCheckbox && !dairyCheckbox) {
        render.renderData(module.RecipesWithoutGluten)
    }

    else if (dairyCheckbox && !glutenCheckbox) {
       
        render.renderData(module.RecipesWithoutDiary)
    }

    else if (dairyCheckbox && glutenCheckbox) {
  
        render.renderData(module.RecipesWithoutBoth)
    }

    else {
    
        render.renderData(module.recipesData) 
    }

}

$(document).on('click', 'img', function () {
    let firstIngredient = $(this).closest(".recipe").find('ul li').first().text()
    alert(firstIngredient)

});

