class Render {

   renderData(recipesData) {
      let filteredRecipesData = []
      for (let i in recipesData) {
         if (recipesData[i] != undefined) {
            filteredRecipesData.push(recipesData[i])
         }

      }
      $('#recipes-container').empty()
      const source = $('#recipes-template').html();
      const template = Handlebars.compile(source);
      const newHTML = template({ recipe: filteredRecipesData });
      $('#recipes-container').append(newHTML);
   }

}