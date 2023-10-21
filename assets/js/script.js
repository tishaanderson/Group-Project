const searchButton = document.querySelector("#searchButton");
const recipeResults = document.querySelector("#recipeResults");
const textBox = document.querySelector("#textBox");
const searchHistory = document.querySelector("#keyword-list");
const apiKey = "a1db763ce0894faf95a8510b5764d7ae";
let query = "pasta";
let cuisine = "Italian";

//adding function to save previous searched keywords and from previous visits to the page
window.addEventListener("load", loadSearchHistory);

function updateSearchHistory(keyword) {
  const listItem = document.createElement("li");
  listItem.textContent = keyword;
  searchHistory.appendChild(listItem);
}


function searchRecipes(event) {
  event.preventDefault();
  recipeResults.innerHTML = '';
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
        recipeDiv.classList.add("card");

        const recipeImg = document.createElement("div");
        recipeImg.classList.add("card-img");

        //recipeImg.setAttribute("id", recipe.id)

        const recipeTitle = document.createElement("span");
        recipeTitle.classList.add("card-title");

        const recipeContent = document.createElement("div");
        recipeContent.classList.add("card-content");
        

        recipeTitle.textContent = recipe.title;
        const imgSrc = document.createElement("img");
        imgSrc.src = recipe.image;

        

        //added button, still need help with redirecting
        const button = document.createElement("a");
        button.classList.add("btn", "waves-effect", "waves-light");
        button.textContent = "View Recipe";
        button.href = 'recipe.html';


        recipeDiv.addEventListener("click", function(event) {
            event.preventDefault();
            searchActualRecipe(recipe.id)
        });
        recipeResults.appendChild(recipeDiv);
        recipeDiv.appendChild(recipeImg);
        
        recipeContent.appendChild(button);


        recipeImg.appendChild(recipeTitle);
        recipeImg.appendChild(imgSrc);
        recipeTitle.appendChild(recipeContent);
      });

      updateSearchHistory(query);

        const keywords = JSON.parse(localStorage.getItem("searchKeywords")) || [];
        keywords.push(query);
        localStorage.setItem("searchKeywords", JSON.stringify(keywords));
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

function loadSearchHistory() {
  const keywords = JSON.parse(localStorage.getItem("searchKeywords")) || [];
  keywords.forEach((keyword) => {
    updateSearchHistory(keyword);
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
        var detailsDiv = document.getElementById(recipeID)
        console.log(detailsDiv)
        window.open(recipe.spoonacularSourceUrl, "_blank")
        
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

searchButton.addEventListener("click", searchRecipes);
