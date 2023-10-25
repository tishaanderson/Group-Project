# Taste Buds Unite (First SMU Group Project)

## Description

We're building an app where users can enter the main ingredient or the type of food they want to make. Once they do that, the app will show them a list of meal ideas they can cook with that ingredient or cuisine in mind.

### User Story

```
AS THE primary cook for the household
I WANT to find ways to mix our weekly meals up with fresh ingredients
SO THAT I can create a more diverse meal prep
```

#### Acceptance Criteria

```
GIVEN I am the primary cook for the household
WHEN I open the app
THEN I see a search bar where I can enter the main ingredient or type of food I want to cook
WHEN I enter a main ingredient or food type
THEN the app provides me with a list of meal ideas based on my input and saves my search history
WHEN I review the meal ideas
THEN I can select one that interests me
WHEN I select a meal idea
THEN I receive detailed information about that meal, including the recipe
WHEN I explore multiple meal ideas
THEN I can mix up our weekly meals with fresh ingredients and diverse recipes
WHEN I use the app
THEN I can enhance my meal prep by trying new and diverse recipes
```


##### Screenshot
![Taste Buds Unite demo](https://user-images.githubusercontent.com/143395836/277847750-3ba6aa99-b7e5-4ec9-bd2c-733c2f910f8f.png)
##### Links

[Original TBU github](https://github.com/tishaanderson/Group-Project)

[Taste Buds Unite](https://tishaanderson.github.io/TasteBudsUnite/)


## Preview

```python
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
```
###### APIs

https://spoonacular.com/food-api/docs

https://developers.giphy.com/docs/api/#quick-start-guide




