const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('btn');

const cardsDisplay = document.getElementById('cards-display');

const criteria = document.getElementById('criteria');
const moreCriteria = document.getElementById('more-criteria');
const revealCriteria = document.getElementById('reveal-criteria');

const openRecipe = document.querySelectorAll('.open-recipe');

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

moreCriteria.addEventListener('click', ()=>{
	revealCriteria.style.display = revealCriteria.style.display === '' ? 'none' : '';
	console.log('bite')
})

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
	let trimmedTitle;
	for (let i = 0; i < 9; i++) {
		trimmedTitle = response.hits[i].recipe.label;
		if(trimmedTitle.split(" ").length >= 5){
			trimmedTitle = trimmedTitle.split(' ').slice(0, 5).join(' ')+' [...]';
		}
		recipes.push(
		`<div class="w-1/2 gap-y-1 gap-x-1">
			<img src="${response.hits[i].recipe.images.SMALL.url}" alt="">
			<div>
				<h3>${trimmedTitle}</h3>
			</div>
			<p class="open-recipe cursor-pointer">More details</p>
		</div>`)
		cardsDisplay.innerHTML = recipes.join('');
	}
}

/**
 * TODO For each see recipe buttons, attach event that will open the modal window taking response.hits[i] to show photo, title, ingredients, fat carb sugar, calories per serving.
 * Attaching event listeners can be done outside of the for loop w/ foreach
 */


// Get the modal
let modalWindow = document.getElementById("modal-window");

// Get the button that opens the modal
let modalBtn = document.getElementById("modal-button");

// Get the <span> element that closes the modal
let closeSpan = document.getElementsByClassName("close-span")[0];

// When the user clicks the button, open the modal 
modalBtn.onclick = function() {
	modalWindow.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeSpan.onclick = function() {
	modalWindow.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalWindow) {
    modalWindow.style.display = "none";
  }
}