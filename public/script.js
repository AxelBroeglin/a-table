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

		console.log(response.hits[i])

		recipes.push(
			`<div class="w-1/2 gap-y-1 gap-x-1" data-title = "${trimmedTitle}" data-image = "${response.hits[i].recipe.images.SMALL.url}" data-total-time = "${response.hits[i].recipe.totalTime}" data-ingredients ="${response.hits[i].recipe.ingredients}" data-url="${response.hits[i].recipe.url}">
			<img src="${response.hits[i].recipe.images.SMALL.url}" alt="">
			<div>
			<h3>${trimmedTitle}</h3>
			</div>
			<p class="open-recipe cursor-pointer">More details</p>
			</div>`)
			cardsDisplay.innerHTML = recipes.join('');
		}
	// Need to find a way to give each card the right data
		// let [i] = {
		// 	'image': 'response.hits[i].recipe.images.SMALL.url',
		// 	'totalTitle': 'recipe.totalTime',
		// 	'ingredients': 'response.hits[i].recipe.ingredients',
		// 	'url': 'response.hits[i].recipe.url',
		// }
		//console.log(recipe[i])
	let moreDetailsRecipe = document.querySelectorAll(".open-recipe");
	moreDetailsRecipe.forEach(element => element.addEventListener('click', (e)=>{
		modalForRecipe()
		console.log(e.target.response)
	//or create here a function that will take value of clicked recipe to create modal
	}))
}

function modalForRecipe(){
	modalWindow.style.display = "block";
	modalWindow.innerHTML = `
	<div class="modal-content w-4/5 bg-gray-50 m-auto p-5 rounded border border-inherit border-solid">
		<span class="close-span text-slate-400 float-right text-2xl font-bold hover:text-black hover:cursor-pointer">&times;</span>
		<p>Some text in the Modal..</p>
  	</div>
	`


	// Get the <span> element that closes the modal
	let closeSpan = document.getElementsByClassName("close-span")[0];

	// When the user clicks on <span> (x), close the modal
	closeSpan.addEventListener('click', ()=>{ 
		modalWindow.style.display = "none";
	})
}

// Get the modal
let modalWindow = document.getElementById("modal-window");

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (e)=>{
  if (e.target == modalWindow) {
    modalWindow.style.display = "none";
  }
})

let add_new_element = () => {
	let header = document.getElementById('cards-display');
	let newEle = document.createElement('p');
	newEle.innerHTML = 'Content inside p element';
	
	cardsDisplay.parentNode.insertBefore(modalWindow, header.cardsDisplay);
  }
  
  add_new_element();