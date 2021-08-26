import './sass/main.scss';
import axios from 'axios';


// Search cocktail by name
// www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita

// List all cocktails by first letter
// www.thecocktaildb.com/api/json/v1/1/search.php?f=a

// Search ingredient by name
// www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka

// Lookup full cocktail details by id
// www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007

// Lookup ingredient by ID
// www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=552

// Lookup a random cocktail
// www.thecocktaildb.com/api/json/v1/1/random.php

// Search by ingredient
// www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
// www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka

// Filter by alcoholic
// www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic
// www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic

// Filter by Category
// www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink
// www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail

// Filter by Glass
// www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass
// www.thecocktaildb.com/api/json/v1/1/filter.php?g=Champagne_flute

const refs = {
  form: document.querySelector('#form'),
  input: document.querySelector('#search'),
  container: document.querySelector('.container'),
}

// //посылает запрос и обрабатывает ответ
const hendlerSubmit = (e) => {
  e.preventDefault()
  clearContainer ();
  clearInput ();
  const value = refs.input.value
  axios.get(`https:www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`)
  .then(result => renderCollection(result.data.drinks))
  .catch(err => console.log(err))
}

//создает елемент интерфейса
function createItem ({strDrinkThumb, strDrink, strAlcoholic, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5}) {
  const article = `<article>
    <img src='${strDrinkThumb}' alt='${strDrink}'/>
    <p>${strDrink}</p>
    <h3 class="alco">${strAlcoholic}</h3>
    <ul>
      <li>${strIngredient1}</li>
      <li>${strIngredient2}</li>
      <li>${strIngredient3}</li>
      <li>${strIngredient4}</li>
      <li>${strIngredient5}</li>
    </ul>
  </article>`
refs.container.insertAdjacentHTML('beforeend', article)
}

//рендерит на экран
function renderCollection (arr) {
  arr.forEach(el => createItem(el))
}

refs.form.addEventListener('submit', hendlerSubmit);

function clearContainer () {
  refs.container.innerHTML = '';
}
function clearInput () {
  refs.input.innerHTML = '';
}
