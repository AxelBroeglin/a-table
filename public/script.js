//Content container variable
let contentContainer = document.getElementById('content-container');

//Search form variables
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('btn');

//Food search variables
let foodSearch = '';
let labelValues = [];
let cuisineValues = [];

//Menu variables
const menu = document.getElementById('menu');
const menuSearch = document.getElementById('menu-search');
const menuCalendar = document.getElementById('menu-calendar');

//Card display variable
const cardsDisplay = document.getElementById('cards-display');

//Criteria variables
const criteria = document.getElementById('criteria');
const moreCriteria = document.getElementById('more-criteria');
const revealCriteria = document.getElementById('reveal-criteria');

//Modal window variable
const openRecipe = document.querySelectorAll('.open-recipe');

//API variables
const app_id = '&app_id=1ab55c64';
const api_key = '&app_key=c86872049aff2debad57830e690d77c8';


//Added event listener to ul with event delegation
menu.addEventListener('click', event => { 
	if (event.target.id === 'menu-search') {
	  console.log('search');
	} else {
	  console.log('calendar')
	}
  });
//By default, search. Maybe later, your favorite recipes or your calories this week
//By clicking items in the menu, innerHTML of the container changes, and shows clicked section


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
	let arrayOfRecipesInfo = [];
	let trimmedTitle;
	for (let i = 0; i < 9; i++) {
		trimmedTitle = response.hits[i].recipe.label;
		if(trimmedTitle.split(" ").length >= 5){
			trimmedTitle = trimmedTitle.split(' ').slice(0, 5).join(' ')+' [...]';
		}
		recipes.push(
			//Data index i allows identification of clicked card
			`<div class="w-1/2 gap-y-1 gap-x-1">
			<img src="${response.hits[i].recipe.images.SMALL.url}" alt="">
			<div>
			<h3>${trimmedTitle}</h3>
			</div>
			<p class="open-recipe cursor-pointer" data-index="${[i]}">More details</p>
			</div>`)
		cardsDisplay.innerHTML = recipes.join('');
		arrayOfRecipesInfo.push(
			{title : response.hits[i].recipe.label, 
			image : response.hits[i].recipe.images.SMALL.url, 
			totalTime : response.hits[i].recipe.totalTime, 
			ingredients : response.hits[i].recipe.ingredients, 
			url : response.hits[i].recipe.url}
		)
	}

	let moreDetailsRecipe = document.querySelectorAll(".open-recipe");
	
	moreDetailsRecipe.forEach(element => element.addEventListener('click', (e)=>{
		let recipeIndex = e.target.dataset.index
		modalForRecipe(arrayOfRecipesInfo, recipeIndex)
	}))
}

function modalForRecipe(arrayOfRecipesInfo, recipeIndex){
	modalWindow.style.display = "block";
	modalWindow.innerHTML = `
	<div class="modal-content w-4/5 bg-gray-50 m-auto p-5 rounded border border-inherit border-solid">
		<span class="close-span text-slate-400 float-right text-2xl font-bold hover:text-black hover:cursor-pointer">&times;</span>
		<h3>${arrayOfRecipesInfo[recipeIndex].title}<h3>
        <img src="${arrayOfRecipesInfo[recipeIndex].image}" alt="arrayOfRecipesInfo[recipeIndex].title">
        <ul id="ingredients-list"></ul>
		<a href="${arrayOfRecipesInfo[recipeIndex].url}" target="_blank"><p>See the recipe</p></a>
  	</div>
	`

	let listOfIngredients = document.getElementById("ingredients-list");
	for(let i = 0; i < arrayOfRecipesInfo[recipeIndex].ingredients.length; i++){
		let liIngredient = document.createElement("li");
		liIngredient.innerText = arrayOfRecipesInfo[recipeIndex].ingredients[i].text;
		listOfIngredients.appendChild(liIngredient);
	}

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

const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h3").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date text-2xl	m-1	days-div-width h-20	flex justify-center items-center shadow-lg hover:border-solid hover:border-2 hover:bg-gray-800 hover:border-gray-300 hover:cursor-pointer opacity-50">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today text-2xl m-1 days-div-width h-20	flex justify-center items-center shadow-lg bg-green-700 hover:cursor-pointer">${i}</div>`;
    } else {
      days += `<div class="text-2xl	m-1	days-div-width h-20	flex justify-center items-center shadow-lg hover:border-solid hover:border-2 hover:bg-gray-800	 hover:border-gray-300 hover:cursor-pointer">${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date text-2xl	m-1	days-div-width h-20	flex justify-center items-center shadow-lg hover:border-solid hover:border-2 hover:bg-gray-800	 hover:border-gray-300 hover:cursor-pointer  opacity-50">${j}</div>`;
    monthDays.innerHTML = days;
  }
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();