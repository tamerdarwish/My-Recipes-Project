class Module {

    constructor(){
        this.recipesData = []
        this.filteredRecipesData = []
        this.dairyIngredients = ["Cream", "Cheese", "Milk", "Butter", "Creme", "Ricotta", "Mozzarella", "Custard", "Cream Cheese"]
        this.glutenIngredients = ["Flour", "Bread", "spaghetti", "Biscuits", "Beer"]
        this.dairyGlutenIngredients = this.dairyIngredients.concat(this.glutenIngredients);
    }

     getDataFromServer(input){
       // let dataRecipes = []
       let self = this
        $.get(`recipes/${input}`, function (recipes) {
           self.recipesData = recipes
        })
  
    }

    checkCommonsItems (arr1, arr2) {

        for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr2.length; j++) {

                if (arr1[i] == arr2[j]) {
                    return true;
                }
            }
        }
        return false;
    }

    getFilterRecipes( ingredientsArray) {
        let filteredRecipedArray = []

        for (let recipe of this.recipesData) {
            let alreadyInside = filteredRecipedArray.includes(recipe)
            const containStatus = this.checkCommonsItems(recipe.ingredients, ingredientsArray)

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
        this.filteredRecipesData = filteredRecipedArray
    }

    getGlutenFilteredArray() {

         this.getFilterRecipes(this.glutenIngredients)
    }

    getdairyFilteredArray() {
         this.getFilterRecipes(this.dairyIngredients)
    }

    getDairyGlutenFilteredArray() {

         this.getFilterRecipes(this.dairyGlutenIngredients)
    }
}