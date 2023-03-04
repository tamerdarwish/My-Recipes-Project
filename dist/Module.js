class Module {

    constructor(input) {
        this.recipesData = []
        this.RecipesWithoutGluten = []
        this.RecipesWithoutDiary = []
        this.RecipesWithoutBoth = []
        this.input = input
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