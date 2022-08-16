const foodSearch = document.getElementById('food-search');
const searchButton = document.getElementById('btn');
const cardsDisplay = document.getElementById('cards-display');

// const options = {
// 	method: 'GET',
// 	headers: {
//         //to be found in doc
// 		'xxx': 'SIGN-UP-FOR-KEY',
// 		'xxx': 'edamam-recipe-search.p.rapidapi.com'
// 	}
// };

const app_id = '1ab55c64';
const api_key = 'c86872049aff2debad57830e690d77c8'

fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=pizza&app_id=${app_id}&app_key=${api_key}`)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));