const searchButton = document.querySelector("#searchButton");
const recipeResults = document.querySelector("#recipeResults");
const textBox = document.querySelector("#textBox");
const apiKey = "2563b3155a0747ec8b0c5c273a182aff";
let query = "pasta";
let cuisine = "Italian";

function searchRecipes(event) {
  event.preventDefault();
  query = textBox.value;
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&cuisine=${cuisine}`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then((responseData) => {
      const recipes = responseData.results;

      recipes.forEach((recipe) => {
        console.log(recipe);
        const recipeDiv = document.createElement("div");
        recipeDiv.textContent = recipe.title;
        recipeDiv.addEventListener("click", function(event) {
            event.preventDefault();
            searchActualRecipe(recipe.id)
        });
        recipeResults.appendChild(recipeDiv);
      });
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

function searchActualRecipe(recipeID) {
  const url = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${apiKey}&includeNutrition=false`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then((responseData) => {
      const recipe = responseData;
        console.log(recipe)
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

function searchRecipes(event) {
  event.preventDefault();
  query = textBox.value;
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&cuisine=${cuisine}`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then((responseData) => {
      const recipes = responseData.results;

      recipes.forEach((recipe) => {
        console.log(recipe);
        const recipeDiv = document.createElement("div");
        
        
        const imageElement = document.createElement("img");
        imageElement.src = recipe.image;
        imageElement.alt = recipe.title;

       
        const titleElement = document.createElement("p");
        titleElement.textContent = recipe.title;

      
        recipeDiv.appendChild(imageElement);
        recipeDiv.appendChild(titleElement);

        recipeDiv.addEventListener("click", function(event) {
          event.preventDefault();
          searchActualRecipe(recipe.id);
        });

        recipeResults.appendChild(recipeDiv);
      });
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}


searchButton.addEventListener("click", searchRecipes);
