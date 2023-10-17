const axios = require('axios');

const apiKey = '2563b3155a0747ec8b0c5c273a182aff'; // Replace with your actual API key
const query = 'pasta';
const cuisine = 'Italian';

const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&cuisine=${cuisine}`;

axios.get(url)
  .then((response) => {
    const recipes = response.data.results;

    recipes.forEach((recipe) => {
      console.log(recipe.title);
    });
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });


