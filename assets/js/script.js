const searchButton = document.querySelector("#searchButton");
const recipeResults = document.querySelector("#recipeResults");
const wineResults = document.querySelector("#wineResults")
const textBox = document.querySelector("#textBox");
const searchHistory = document.querySelector("#keyword-list");
const cuisines = document.querySelector("#cuisineOptions");
const mealType = document.querySelector("#mealType");
const wineType = document.querySelector("#wineType")
const searchForm = document.querySelector("#searchForm");

const apiKey = "a1db763ce0894faf95a8510b5764d7ae";
let query = "text";
let cuisine = "text";
let wine = "select"


document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});

wineType.addEventListener("change", searchWines)

function updateSearchHistory(keyword) {
  const listItem = document.createElement("li");
  const uppercaseKeyword = keyword.toUpperCase();
  listItem.textContent = uppercaseKeyword;
  searchHistory.appendChild(listItem);
  
}

window.addEventListener("load", loadSearchHistory);

function updateSearchHistory(keyword) {
  const listItem = document.createElement("li");
  const uppercaseKeyword = keyword.toUpperCase();
  listItem.textContent = uppercaseKeyword;
  searchHistory.appendChild(listItem);
}



function searchRecipes(event) {
  event.preventDefault();
  searchGiphy()
  recipeResults.innerHTML = '';
  query = textBox.value;
  cuisine = cuisines.value
  type = mealType.value
  console.log(cuisines)
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&cuisine=${cuisine}&type=${type}`;
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

function searchWines(event) {
  event.preventDefault();
  wineResults.innerHTML = '';
  wineSelect = wineType.value;
  console.log(wineSelect)

  const url = `https://api.spoonacular.com/food/wine/dishes?wine=${wineSelect}&apiKey=${apiKey}`
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then((responseData) => {
      console.log(responseData)
      const wines = responseData.results;
        const wineDiv = document.createElement("div");
        wineDiv.classList.add("card");

   

        const wineTitle = document.createElement("span");
        wineTitle.classList.add("card-title");

        const wineContent = document.createElement("div");
        wineContent.classList.add("card-content");
        

        wineTitle.textContent = wine.title;
        const wineDescription = document.createElement("p")
        wineDescription.textContent = responseData.text

      wineResults.appendChild(wineDescription)
})

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


// searchForm.addEventListener("submit", function (event){
//     event.preventDefault();    
//     searchRecipes();
//   })

function searchGiphy() {
  const apiKey = 'n8TQ0Jng6MCQ7aU7EY3wa7cdBlkCiazf'; 
  const searchQuery = document.getElementById('textBox').value;
  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchQuery}`;

  fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
          const gifsDiv = document.getElementById('gifs');
          gifsDiv.innerHTML = '';

          if (data.data.length > 0) {
              const gif = data.data[0];
              const gifImage = document.createElement('img');
              gifImage.src = gif.images.fixed_height.url;
              gifsDiv.appendChild(gifImage);
          } else {
              gifsDiv.innerHTML = 'No GIFs found for your search.';
          }
      })
      .catch((error) => console.error(error));
}
searchButton.addEventListener("click", searchRecipes);