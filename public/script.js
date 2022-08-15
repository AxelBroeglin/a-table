const foodSearch = document.getElementById('food-search');
const btn = document.getElementById('btn');
const cardsDisplay = document.getElementById('cards-display');

const options = {
	method: 'GET',
	headers: {
        //to be found in doc
		'xxx': 'SIGN-UP-FOR-KEY',
		'xxx': 'edamam-recipe-search.p.rapidapi.com'
	}
};

fetch('https://api.edamam.com/api/recipes/v2/', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));