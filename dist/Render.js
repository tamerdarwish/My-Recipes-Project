class Render{
   
 renderData(recipesData){
    $('#recipes-container').empty()
    const source = $('#recipes-template').html();
    const template = Handlebars.compile(source);
    const newHTML = template({ recipe: recipesData });
    $('#recipes-container').append(newHTML);
 }

}