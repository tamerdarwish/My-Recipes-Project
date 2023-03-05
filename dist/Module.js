class Module {

    constructor(input) {
        this.recipesData = []
        this.RecipesWithoutGluten = []
        this.RecipesWithoutDiary = []
        this.RecipesWithoutBoth = []
        this.input = input

        this.currentlyEightValues = []
        this.lastRecipeIndex = 0
    }

    loadNextEight(recipesArray){
        this.currentlyEightValues = []
        let counter = 0
        for(let i in recipesArray){
            if(counter < 8){
                this.currentlyEightValues.push(recipesArray[this.lastRecipeIndex + counter])
                counter++
            }
            else{
                this.lastRecipeIndex += counter
                break
            }
           
        }
        
    }

    loadBackEight(recipesArray){

        this.lastRecipeIndex = this.lastRecipeIndex - 8 
        this.currentlyEightValues = []

       for(let i = 0 ;  i < recipesArray.length ; i++){
            if((this.lastRecipeIndex <= i) &&  i < (this.lastRecipeIndex + 8) ){
                this.currentlyEightValues.push(recipesArray[i])
            }
        }
    }


    getRecipes() {
        const self = this

        $.get(`recipes/${self.input}`, function (recipes) {
            self.recipesData = recipes
        })
    }

    getRecipesWithoutGluten() {
        const self = this

        $.get(`recipes/${self.input}?withoutGluten=true&withoutDiary=false`, function (withoutGlutenRecipes) {
            self.RecipesWithoutGluten = withoutGlutenRecipes
        })
    }

    getRecipesWithoutDiary() {
        const self = this

        $.get(`recipes/${self.input}?withoutGluten=false&withoutDiary=true`, function (withoutDiaryRecipes) {
            self.RecipesWithoutDiary = withoutDiaryRecipes

        })
    }

    getRecipesWithoutBoth() {
        const self = this

        $.get(`recipes/${self.input}?withoutGluten=true&withoutDiary=true`, function (withBothRecipes) {
            self.RecipesWithoutBoth = withBothRecipes

        })
    }

}