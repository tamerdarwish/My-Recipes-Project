
const render = new Render()
const module = new Module()

$("button").on("click", function () {
    let input = $("input").val()
    module.getDataFromServer(input)
    filteringByCheckbox()
})

const filteringByCheckbox = function(){
    const glutenCheckbox = document.getElementById('gluten-checkbox').checked
    const dairyCheckbox = document.getElementById('milk-checkbox').checked

    if (glutenCheckbox && !dairyCheckbox) {
        module.getGlutenFilteredArray()
        render.renderData(module.filteredRecipesData)
    }

    else if (dairyCheckbox && !glutenCheckbox) {
        module.getdairyFilteredArray()
        render.renderData(module.filteredRecipesData)
        
    }

    else if (dairyCheckbox && glutenCheckbox) {
        module.getDairyGlutenFilteredArray()
        render.renderData(module.filteredRecipesData)
        
    }

    else {
        render.renderData(module.recipesData)
        
    }

}

$(document).on('click', 'img', function () {
    let firstIngredient = $(this).closest(".recipe").find('ul li').first().text()
    alert(firstIngredient)

});

