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


import { alert } from  '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
  form: document.querySelector('#form'),
  input: document.querySelector('#search'),
  container: document.querySelector('.container'),
  ul: document.querySelector('.test'),
}

// //посылает запрос и обрабатывает ответ
const hendlerSubmit = (e) => {
  e.preventDefault()
  clearContainer ();
  const value = refs.input.value
  axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`)
  .then(result => renderCollection(result.data.drinks))
  .catch(err => 
     { alert ({text: 'Not found.' })}
)}

//создает елемент интерфейса
function createItem ({strDrinkThumb, strDrink, strAlcoholic, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7}) {
  const article = `<article>
    <img src='${strDrinkThumb}' alt='${strDrink}'/>
    <p>${strDrink}</p>
    <h3 class="alco">${strAlcoholic}</h3>
    <ul>
   <li class="test">${strIngredient1}</li>
   <li class="test">${strIngredient2}</li>
   <li class="test">${strIngredient3}</li>
   <li class="test">${strIngredient4}</li>
   <li class="test">${strIngredient5}</li>
   <li class="test">${strIngredient6}</li>
   <li class="test">${strIngredient7}</li>
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


// function getin(drink) {
//   const ingredients = [];
//     for (let i = 1; i <= 20; i++) {
//       if (drink[`strIngredient${i}`]) {
//         ingredients.push(drink[`strIngredient${i}`]);
//       } else {
//         break;
//       }
//     }
//   return ingredients;
// }
// refs.ul.addEventListener('submit', getin)


//  <h2>Ingredients</h2>
// <ul>
//   ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
// </ul>

