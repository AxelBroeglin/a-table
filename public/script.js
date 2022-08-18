const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('btn');
const cardsDisplay = document.getElementById('cards-display');
const app_id = '1ab55c64';
const api_key = 'c86872049aff2debad57830e690d77c8';
let foodSearch = '';

searchButton.addEventListener('click', (e)=>{
	e.preventDefault();
	foodSearch = searchInput.value;
	foodSearch == '' ? searchInput.classList.add('input-red') : foodQuery(foodSearch);
})

searchInput.addEventListener('focus', ()=>{
	searchInput.classList.remove('input-red')
})

async function foodQuery(){await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${foodSearch}&app_id=${app_id}&app_key=${api_key}`)
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