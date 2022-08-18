const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('btn');
const cardsDisplay = document.getElementById('cards-display');

const app_id = '&app_id=1ab55c64';
const api_key = '&app_key=c86872049aff2debad57830e690d77c8';
let apiKeyAndValues = ''

let foodSearch = '';
const criterionVegetarian = document.getElementById('vegetarian');
const criterionVegan = document.getElementById('vegan');
const criterionPecatarian = document.getElementById('pecatarian');

const criteria = document.getElementById('criteria');

searchButton.addEventListener('click', (e)=>{
	e.preventDefault();
	let checkboxes = document.querySelectorAll('input:checked');
	let values = [];
	checkboxes.forEach((checkbox) => {
		values.push(checkbox.name);
	});
	if(values.toString()!==''){
		apiKeyAndValues = api_key.concat('&health=',values.toString())
	}
	console.log(apiKeyAndValues)
	foodSearch = searchInput.value;
	foodSearch == '' ? searchInput.classList.add('input-red') : foodQuery(foodSearch, apiKeyAndValues);
})

searchInput.addEventListener('focus', ()=>{
	searchInput.classList.remove('input-red')
})

async function foodQuery(){await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${foodSearch}${app_id}${api_key}`)
				.then(response => response.json())
				.then(response => useApiResponse(response))
				.catch(err => console.error(err));
}

function useApiResponse(response){
	console.log(response);
	let recipes = [];
	for (let i = 0; i < 10; i++) {
		recipes.push(		
		`<div>
			<img src="${response.hits[i].recipe.images.THUMBNAIL.url}" alt="">
			<div>
				<h3>${response.hits[i].recipe.label}</h3>
			</div>
		</div>`)
		cardsDisplay.innerHTML = recipes.join('');
	}
}