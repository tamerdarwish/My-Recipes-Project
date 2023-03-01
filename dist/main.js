dairyIngredients = ["Cream", "Cheese", "Milk", "Butter", "Creme", "Ricotta", "Mozzarella", "Custard", "Cream Cheese"]
glutenIngredients = ["Flour", "Bread", "spaghetti", "Biscuits", "Beer"]


const fetchRecipesData = function () {
    $('#recipes-container').empty()
    let input = $("input").val()
    $.get(`recipes/${input}`, function (recipesData) {

        if (document.getElementById('gluten-checkbox').checked && !document.getElementById('milk-checkbox').checked) {
           
            render(getGlutenFilteredArray(recipesData))
            
        }

        else if (document.getElementById('milk-checkbox').checked && !document.getElementById('gluten-checkbox').checked) {
             
            render(getdairyFilteredArray(recipesData))
            
        }

        else if(document.getElementById('milk-checkbox').checked && document.getElementById('gluten-checkbox').checked) {
            render(getBothFilteredArray(recipesData))
            
        }
        else {
            render(recipesData)
        }

        


        //render(recipesData)



    })
}

const getGlutenFilteredArray = function (recipesData) {
    let filteredRecipedArray = []
    for (let recipe of recipesData) {
        const found = checkForCommon(recipe.ingredients, glutenIngredients)
        if (found && filteredRecipedArray.includes(recipe)) {
            filteredRecipedArray.splice(filteredRecipedArray.indexOf(recipe), 1)
            break
        }else if(found && !filteredRecipedArray.includes(recipe)){
            break
        }else if(!found && !filteredRecipedArray.includes(recipe)){
            filteredRecipedArray.push(recipe)
        } else if(!found && filteredRecipedArray.includes(recipe)){
            filteredRecipedArray.pop()
            filteredRecipedArray.push(recipe)
        }
    }

    return filteredRecipedArray
}

const getdairyFilteredArray = function (recipesData) {
    let filteredRecipedArray = []
    for (let recipe of recipesData) {
        const found = checkForCommon(recipe.ingredients, dairyIngredients)
        if (found && filteredRecipedArray.includes(recipe)) {
            filteredRecipedArray.splice(filteredRecipedArray.indexOf(recipe), 1)
            break
        }else if(found && !filteredRecipedArray.includes(recipe)){
            break
        }else if(!found && !filteredRecipedArray.includes(recipe)){
            filteredRecipedArray.push(recipe)
        } else if(!found && filteredRecipedArray.includes(recipe)){
            filteredRecipedArray.pop()
            filteredRecipedArray.push(recipe)
        }
    }
    return filteredRecipedArray
}

const getBothFilteredArray = function(recipesData) {
const Both = [... dairyIngredients, ...glutenIngredients]
let filteredRecipedArray = []
    for (let recipe of recipesData) {
        const found = checkForCommon(recipe.ingredients, Both)
        if (found && filteredRecipedArray.includes(recipe)) {
            filteredRecipedArray.splice(filteredRecipedArray.indexOf(recipe), 1)
            break
        }else if(found && !filteredRecipedArray.includes(recipe)){
            break
        }else if(!found && !filteredRecipedArray.includes(recipe)){
            filteredRecipedArray.push(recipe)
        } else if(!found && filteredRecipedArray.includes(recipe)){
            filteredRecipedArray.pop()
            filteredRecipedArray.push(recipe)
        }
    }
    return filteredRecipedArray

}

function checkForCommon(arr1, arr2) {

    //outer loop travere the first array colors1
    for (let i = 0; i < arr1.length; i++) {

        //inner loop travere the second array colors2
        for (let j = 0; j < arr2.length; j++) {

            //check if present element of colors1 is equal to present element of colors2
            if (arr1[i] == arr2[j]) {
                return true;
            }
        }

    }

    //returns false if no common elements found
    return false;
}



const render = function (recipesData) {
    const source = $('#recipes-template').html();
    const template = Handlebars.compile(source);
    const newHTML = template({ recipe: recipesData });
    $('#recipes-container').append(newHTML);
}



$(document).on('click', 'img', function () {
    //let firstIngredient = $(this).find("ul").text()
    alert($(this).find("li").value)

});
