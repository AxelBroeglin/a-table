const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('btn');
const cardsDisplay = document.getElementById('cards-display');
const criteria = document.getElementById('criteria');
const moreCriteria = document.getElementById('more-criteria');

const app_id = '&app_id=1ab55c64';
const api_key = '&app_key=c86872049aff2debad57830e690d77c8';

let foodSearch = '';
let values = [];

searchButton.addEventListener('click', (e)=>{
	e.preventDefault();
	values = [];
	let healthLabelsChecked = document.querySelectorAll('.health-labels:checked');
	console.log(healthLabelsChecked);
	healthLabelsChecked.forEach((checkbox) => {
		values.push('&health='+checkbox.name);
	});
	values = values.toString().replace(/,/g, '');
	console.log(values);
	foodSearch = searchInput.value;
	if(foodSearch == ''){
		searchInput.classList.add('input-red');
	}
	if(values!==''){
		foodQuery(foodSearch, values)
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

async function foodQuery(){await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${foodSearch}${app_id}${api_key}${values}`)
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