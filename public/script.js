//Content container variable
let contentContainer = document.getElementById('content-container');

//Search form variables
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('btn');

//Food search variables
let foodSearch = '';
let labelValues = [];
let cuisineValues = [];

//Food search recap variables
const searchRecapContainer = document.getElementById('search-recap-container');
const searchRecapCriteria = document.querySelectorAll('.search-criteria');
let searchCriteriaArray = [];


searchRecapCriteria.forEach(criterion => criterion.addEventListener('click', (event)=>{
	checkSearchCriteriaArray(searchCriteriaArray, event.target.name)
}))


searchRecapContainer.addEventListener('click', event => {
	//Unselect checkbox related to clicked icon
	const iconClicked = event.target.name;
	document.getElementById(iconClicked).checked = false;

	checkSearchCriteriaArray(searchCriteriaArray, event.target.name)
})


function checkSearchCriteriaArray(searchCriteriaArray, criterion) {
    if (searchCriteriaArray.indexOf(criterion) === -1) {
        searchCriteriaArray.push(criterion);
    } else if (searchCriteriaArray.indexOf(criterion) > -1) {
		for( let i = 0; i < searchCriteriaArray.length; i++){
			if ( searchCriteriaArray[i] === criterion) {
				searchCriteriaArray.splice(i, 1);
			}
    	}
	}
	renderSearchCriteriaArray(searchCriteriaArray);
}


function renderSearchCriteriaArray(searchCriteriaArray){
	searchRecapContainer.innerHTML = '';
	searchCriteriaArray.forEach(function (i) {
		const healthLabelIcon = document.createElement("img");
		healthLabelIcon.alt = i
		healthLabelIcon.src = `./images/criteria-icons/${i}.png`
		healthLabelIcon.setAttribute('name', i);
		healthLabelIcon.classList.add("cursor-pointer", "shadow-lg", "mr-2")
		searchRecapContainer.append(healthLabelIcon);
	})
}

//PROBLEM WITH RESULTS ?

//Menu variables
const menu = document.getElementById('menu');
const menuSearch = document.getElementById('menu-search');
const menuCalendar = document.getElementById('menu-calendar');

//Sections variables
const calendarSection = document.getElementById('calendar-section');
const searchSection = document.getElementById('search-section');

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
		calendarSection.innerHTML = '';
		searchSection.style.display = "block";
	} else {
		searchSection.style.display = "none";
	  	renderCalendar();
	}
  });

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
	let cuisineTypesChecked = document.querySelectorAll('.cuisine-types:checked');
	cuisineTypesChecked.forEach((checkbox) => {
		cuisineValues.push('&cuisineTypes='+checkbox.name);
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

//Search Recap
let searchRecapP = [];


async function foodQuery(){await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${foodSearch}${app_id}${api_key}${labelValues}${cuisineValues}`)
				.then(response => response.json())
				.then(response => useApiResponse(response))
				.catch(err => console.error(err));
}

function useApiResponse(response){
	console.log(response);
	let recipes = [];
	let arrayOfRecipesInfo = [];
	let trimmedTitle;
	for (let i = 0; i < 12; i++) {
		trimmedTitle = response.hits[i].recipe.label;
		if(trimmedTitle.split(" ").length >= 5){
			trimmedTitle = trimmedTitle.split(' ').slice(0, 4).join(' ').substring(0,24)+' [...]';
		}
		recipes.push(
			//Data index i allows identification of clicked card
			`<div class="w-4/6 gap-y-1 gap-x-1 mb-8 shadow-md rounded-md">
				<img src="${response.hits[i].recipe.images.REGULAR.url}" alt="" class="rounded-t-md">
				<div class="flex flex-col justify-between pt-2 pb-4 text-center h-28 bg-neutral-50">
					<h3 class="font-semibold">${trimmedTitle}</h3>
					<button class="open-recipe cursor-pointer font-bold text-green-600" data-index="${[i]}">More details</button>
				</div>
			</div>`)
		cardsDisplay.innerHTML = recipes.join('');
		arrayOfRecipesInfo.push(
			{title : response.hits[i].recipe.label, 
			image : response.hits[i].recipe.images.REGULAR.url, 
			totalTime : response.hits[i].recipe.totalTime, 
			servings : response.hits[i].recipe.yield,
			calories : response.hits[i].recipe.calories,
			fat : Math.trunc(response.hits[i].recipe.digest[0].total),
			carbs : Math.trunc(response.hits[i].recipe.digest[1].total),
			protein : Math.trunc(response.hits[i].recipe.digest[2].total),
			cuisineType : response.hits[i].recipe.cuisineType,
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
	cuisineType = arrayOfRecipesInfo[recipeIndex].cuisineType.toString();
	let calPerServing = arrayOfRecipesInfo[recipeIndex].calories / arrayOfRecipesInfo[recipeIndex].servings;
	modalContent.innerHTML = `
		<h3 class="font-bold uppercase text-xl text-green-600 text-center">${arrayOfRecipesInfo[recipeIndex].title}</h3>
        <div class="flex justify-between pt-12 pb-6">
			<img src="${arrayOfRecipesInfo[recipeIndex].image}" alt="arrayOfRecipesInfo[recipeIndex].title" class="w-4/12">
			<div class="w-7/12">
				<h4 class="font-bold uppercase text-green-600">Nutritional information</h4>
				<p>${arrayOfRecipesInfo[recipeIndex].servings} Servings</p>
				<p>Per serving :</p>
				<p>Calories: ${Math.trunc(calPerServing)}</p>
				<p>Fat: ${Math.trunc(arrayOfRecipesInfo[recipeIndex].fat / arrayOfRecipesInfo[recipeIndex].servings)} grams</p>
				<p>Carbs: ${Math.trunc(arrayOfRecipesInfo[recipeIndex].carbs / arrayOfRecipesInfo[recipeIndex].servings)} grams</p>
				<p>Protein: ${Math.trunc(arrayOfRecipesInfo[recipeIndex].protein / arrayOfRecipesInfo[recipeIndex].servings)} grams</p>
				<p id="cuisine-type">Cuisine type: ${cuisineType.charAt(0).toUpperCase() + cuisineType.slice(1)}</p>
				
				<a href="${arrayOfRecipesInfo[recipeIndex].url}" target="_blank" class="cursor-pointer font-bold text-green-600"><button>See the recipe</button></a>
			</div>
		</div>
        <ul id="ingredients-list" class="columns-2"></ul>
	`
	if(arrayOfRecipesInfo[recipeIndex].totalTime > 0){
		let cuisineTypeP = document.getElementById('cuisine-type');
		let totalTimeP = document.createElement("p");
		totalTimeP.innerHTML = 'Total time: ' + arrayOfRecipesInfo[recipeIndex].totalTime + ' minutes';
		cuisineTypeP.after(totalTimeP);
	}
	
	
	let listOfIngredients = document.getElementById("ingredients-list");
	for(let i = 0; i < arrayOfRecipesInfo[recipeIndex].ingredients.length; i++){
		let liIngredient = document.createElement("li");
		liIngredient.innerText = "- " + arrayOfRecipesInfo[recipeIndex].ingredients[i].text;
		listOfIngredients.appendChild(liIngredient);
	}


}

// Get the modal
let modalWindow = document.getElementById('modal-window');
let modalContent = document.getElementById('modal-content');

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (e)=>{
	if (e.target == modalWindow) {
		modalWindow.style.display = "none";
	}
})

// Get the <span> element that closes the modal
let closeSpan = document.getElementsByClassName("close-span")[0];

// When the user clicks on <span> (x), close the modal
closeSpan.addEventListener('click', ()=>{ 
	modalWindow.style.display = "none";
})


//Calendar code
const date = new Date();

const renderCalendar = () => {
	//Injects the HTML in the proper section
	calendarSection.innerHTML = `
	<!-- Calendar container -->
	<section id="calendar-section">
		<div class="calendar	bg-zinc-900	shadow-lg">
			<div class="month w-full	h-48	bg-green-700	flex justify-between	items-center py-0	px-8	text-center	shadow-lg">
			<i class="fas fa-angle-left prev cursor-pointer text-4xl	"><</i>
			<div class="date">
				<h3  class="text-5xl	uppercase tracking-wide	mb-4	"></h3>
				<p class="text-2xl	"></p>
			</div>
			<i class="fas fa-angle-right next cursor-pointer text-4xl	">></i>
			</div>
			<div class="weekdays text-2xl h-20	py-0 px-1.5	flex items-center">
			<div class="text-2xl tracking-wide	flex justify-center items-center shadow-lg days-width">Sun</div>
			<div class="text-2xl tracking-wide	flex justify-center items-center shadow-lg days-width">Mon</div>
			<div class="text-2xl tracking-wide	flex justify-center items-center shadow-lg days-width">Tue</div>
			<div class="text-2xl tracking-wide	flex justify-center items-center shadow-lg days-width">Wed</div>
			<div class="text-2xl tracking-wide	flex justify-center items-center shadow-lg days-width">Thu</div>
			<div class="text-2xl tracking-wide	flex justify-center items-center shadow-lg days-width">Fri</div>
			<div class="text-2xl tracking-wide	flex justify-center items-center shadow-lg days-width">Sat</div>
			</div>
			<div class="days w-full flex flex-wrap	p-1"></div>
		</div>
	</section><!-- End of calendar container -->	
	`
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


  let dateH3 = document.querySelector(".date h3");
  dateH3.innerHTML = months[date.getMonth()];
  dateH3.dataset.currentMonth = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toDateString();


  //Check if a specific ID will be necessary to communicate with the DB, like 20220925.
  //If so, will have to fix the issue of 1 to 9, since it will change the format.

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date text-2xl	m-1	days-div-width h-20	flex justify-center items-center shadow-lg hover:border-solid hover:border-2 hover:bg-gray-800 hover:border-gray-300 hover:cursor-pointer opacity-50">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
    	days += `<div class="today text-2xl m-1 days-div-width h-20	flex justify-center items-center shadow-lg bg-green-700 hover:cursor-pointer">${i}</div>`;
    }else{
    	days += `<div class="text-2xl	m-1	days-div-width h-20	flex justify-center items-center shadow-lg hover:border-solid hover:border-2 hover:bg-gray-800	 hover:border-gray-300 hover:cursor-pointer">${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date text-2xl	m-1	days-div-width h-20	flex justify-center items-center shadow-lg hover:border-solid hover:border-2 hover:bg-gray-800	 hover:border-gray-300 hover:cursor-pointer  opacity-50">${j}</div>`;
    monthDays.innerHTML = days;
  }
  document.querySelector(".prev").addEventListener("click", () => {
	date.setMonth(date.getMonth() - 1);
	renderCalendar();
  });
  
  document.querySelector(".next").addEventListener("click", () => {
	date.setMonth(date.getMonth() + 1);
	renderCalendar();
  });
  

//Later recap of calories, fat etc... ?

//Event listener for days in the calendar
monthDays.addEventListener('click', event =>{
	modalWindow.style.display = "block";
	//Switch to check last number and date it accordingly
	let dateNumber = event.target.innerHTML;
	switch (dateNumber.slice(-1)) {
		case '1':
			dateNumber += 'st ';
		break;
		case '2':
			dateNumber += 'nd ';
		break;
		case '3':
			dateNumber += 'rd ';
			break;
		default:
			dateNumber += 'th ';
		break;
	}

	modalContent.innerHTML = `
	<h3>${dateNumber + 'of ' + dateH3.dataset.currentMonth}<h3>
    	<h4>Breakfast</h4>
			<div>Contains recipe link<div/>
			<p>or "Add recipe" button leading to search</p>
			<h4>Lunch</h4>
			<div>Contains recipe link<div/>
			<p>or "Add recipe" button leading to search</p>
			<h4>Diner</h4>
			<div>Contains recipe link<div/>
			<p>or "Add recipe" button leading to search</p>
	 	<a href="" target="_blank"><p>See the recipe</p></a>
	`
 });
};

//Days from previous month and next month take current month as value, need to correct