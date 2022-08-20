const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('btn');
const cardsDisplay = document.getElementById('cards-display');
const criteria = document.getElementById('criteria');
const moreCriteria = document.getElementById('more-criteria');

const app_id = '&app_id=1ab55c64';
const api_key = '&app_key=c86872049aff2debad57830e690d77c8';

let foodSearch = '';
let labelValues = [];
let cuisineValues = [];

searchButton.addEventListener('click', (e)=>{
	e.preventDefault();
	//Health labels
	labelValues = [];
	let healthLabelsChecked = document.querySelectorAll('.health-labels:checked');
	healthLabelsChecked.forEach((checkbox) => {
		labelValues.push('&health='+checkbox.name);
	});
	labelValues = labelValues.toString().replace(/,/g, '');

	//Cuisine types
	cuisineValues = [];
	let cuisineTypesChecked = document.querySelectorAll('.cuisine-type:checked');
	cuisineTypesChecked.forEach((checkbox) => {
		cuisineValues.push('&cuisineType='+checkbox.name);
	});
	cuisineValues = cuisineValues.toString().replace(/,/g, '');

	foodSearch = searchInput.value;
	if(foodSearch == ''){
		searchInput.classList.add('input-red');
	}
	//Do check for cuisine type
	if(labelValues!==''){
		foodQuery(foodSearch, labelValues)
	}else{
		foodQuery(foodSearch);
	}
})

//Need to work on hide/reveal, best way to do it ( x != x or smth like this)
// moreCriteria.addEventListener('click', ()=>{

// })

searchInput.addEventListener('focus', ()=>{
	searchInput.classList.remove('input-red')
})

async function foodQuery(){await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${foodSearch}${app_id}${api_key}${labelValues}${cuisineValues}`)
				.then(response => response.json())
				.then(response => useApiResponse(response))
				.catch(err => console.error(err));
}

function useApiResponse(response){
	let recipes = [];
	for (let i = 0; i < 9; i++) {
		console.log(response.hits[i].recipe.label.split(' ').length)
		recipes.push(
		`<div class="w-1/2 gap-y-1 gap-x-1">
			<img src="${response.hits[i].recipe.images.SMALL.url}" alt="">
			<div>
				<h3>${response.hits[i].recipe.label}</h3>
			</div>
		</div>`)
		cardsDisplay.innerHTML = recipes.join('');
	}
}

// const length = 6;
// const trimmedString = string.substring(0, length);