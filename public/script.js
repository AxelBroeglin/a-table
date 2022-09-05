// window.addEventListener('load', (event) => {
// 	console.log('mabite')
// 	fetch("./php/script.php", { method: "GET"})
//   .then(res => console.log(res))
//   .catch((err) => { console.error(err); });
//   return false;  });

  const xmlhttp = new XMLHttpRequest();
  xmlhttp.addEventListener('load', (event) => {
	const myObj = JSON.parse(event.target.responseText);
	document.getElementById("demo").innerHTML = myObj;
  })
  xmlhttp.open("GET", "./php/script.php");
  xmlhttp.send();


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

//Event listener for search criteria
searchRecapCriteria.forEach(criterion => criterion.addEventListener('click', (event)=>{
	checkSearchCriteriaArray(searchCriteriaArray, event.target.name)
}))

//Event listener for search recap container
searchRecapContainer.addEventListener('click', event => {
	//Unselect checkbox related to clicked icon
	const iconClicked = event.target.name;
	document.getElementById(iconClicked).checked = false;
	//Send array to check function alongside with event target name
	checkSearchCriteriaArray(searchCriteriaArray, event.target.name);
})

//Function to check if value already in array or not
function checkSearchCriteriaArray(searchCriteriaArray, criterion) {
	//If index === -1 : absent -> push in array
    if (searchCriteriaArray.indexOf(criterion) === -1) {
        searchCriteriaArray.push(criterion);
    } else if (searchCriteriaArray.indexOf(criterion) > -1) {
		//If index > -1 : present -> splice item
		for( let i = 0; i < searchCriteriaArray.length; i++){
			if ( searchCriteriaArray[i] === criterion) {
				searchCriteriaArray.splice(i, 1);
			}
    	}
	}
	//Send array to its render function
	renderSearchCriteriaArray(searchCriteriaArray);
}

//Function to render array
function renderSearchCriteriaArray(searchCriteriaArray){
	//Reset container html
	searchRecapContainer.innerHTML = '';
	//Take each item in array
	searchCriteriaArray.forEach(function (i) {
		//Create an image
		const healthLabelIcon = document.createElement("img");
		//Gives alt of event target name
		healthLabelIcon.alt = i
		//SRC is set to event target name
		healthLabelIcon.src = `./images/criteria-icons/${i}.png`;
		//Same for name
		healthLabelIcon.setAttribute('name', i);
		//Add styling classes
		healthLabelIcon.classList.add("cursor-pointer", "shadow-lg", "mr-2");
		//Append newly created image to container
		searchRecapContainer.append(healthLabelIcon);
	})
}


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

//Add event listener to ul with event delegation
menu.addEventListener('click', event => { 
	if (event.target.id === 'menu-search') {
		calendarSection.innerHTML = '';
		searchSection.style.display = "block";
	} else {
		searchSection.style.display = "none";
	  	renderCalendar();
	}
  });

//Event listener for submit button
searchButton.addEventListener('click', (e)=>{
	e.preventDefault();
	//Health labels
	labelValues = [];
	//Get all selected health labels checkboxes
	let healthLabelsChecked = document.querySelectorAll('.health-labels:checked');
	//Push url part + each of them in labelValues array
	healthLabelsChecked.forEach((checkbox) => {
		labelValues.push('&health='+checkbox.name);
	});
	//Regex to replace ',' by nothing in order to make a proper url
	labelValues = labelValues.toString().replace(/,/g, '');

	//Cuisine types
	cuisineValues = [];
	//Get all selected cuisine types checkboxes
	let cuisineTypesChecked = document.querySelectorAll('.cuisine-types:checked');
	//Push url part + each of them in labelValues array
	cuisineTypesChecked.forEach((checkbox) => {
		cuisineValues.push('&cuisineType='+checkbox.name);
	});
	//Regex to replace ',' by nothing in order to make a proper url
	cuisineValues = cuisineValues.toString().replace(/,/g, '');
	//Declaration of foodSearch
	foodSearch = searchInput.value;
	//Check if foodSearch is empty -> red box around input
	if(foodSearch == ''){
		searchInput.classList.add('input-red');
	}
	//Check if labelValues is not empty, if not execute foodQuery with it
	if(labelValues!==''){
		foodQuery(foodSearch, labelValues)
	}else{
		//If it is empty, foodQuery without it, check necessary because labels come before cuisine types
		foodQuery(foodSearch);
	}
})

//Event listener for reveal button for more criteria
moreCriteria.addEventListener('click', ()=>{
	revealCriteria.style.display = revealCriteria.style.display === '' ? 'none' : '';
})

//Event listener on search input to remove red box if focus
searchInput.addEventListener('focus', ()=>{
	searchInput.classList.remove('input-red')
})

//Async await function that calls the API
async function foodQuery(){await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${foodSearch}${app_id}${api_key}${labelValues}${cuisineValues}`)
				.then(response => response.json())
				.then(response => useApiResponse(response))
				.catch(err => console.error(err));
}


//Function that handles the answer from API
function useApiResponse(response){
	console.log(response);
	//Create array that will contain the different recipes from answer
	let recipes = [];
	//Create array that will contain the different recipes info from answer
	let arrayOfRecipesInfo = [];
	//Create variable to trim the titles
	let trimmedTitle;
	//For loop for the 12 answers
	for (let i = 0; i < 12; i++) {
		//Trimmed title takes value of recipe label
		trimmedTitle = response.hits[i].recipe.label;
		//If length > 5 -> limit number of words and characters
		if(trimmedTitle.split(" ").length >= 5){
			trimmedTitle = trimmedTitle.split(' ').slice(0, 4).join(' ').substring(0,24)+' [...]';
		}
		//Push values into recipes array
		recipes.push(
			//Data index i allows identification of clicked card
			`<div class="w-4/6 gap-y-1 gap-x-1 mb-8 shadow-md rounded-md">
				<img src="${response.hits[i].recipe.images.REGULAR.url}" alt="" class="rounded-t-md">
				<div class="flex flex-col justify-between pt-2 pb-4 text-center h-28 bg-neutral-50">
					<h3 class="font-semibold">${trimmedTitle}</h3>
					<button class="open-recipe cursor-pointer font-bold text-green-600" data-index="${[i]}">More details</button>
				</div>
			</div>`)
		//Container receives the joined cards
		cardsDisplay.innerHTML = recipes.join('');
		//Array of info take created object for easy riding
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
	//Get the modal window that will receive recipe info
	let moreDetailsRecipe = document.querySelectorAll(".open-recipe");
	//Add event listener for each element in container
	moreDetailsRecipe.forEach(element => element.addEventListener('click', (e)=>{
		//Create variable for readability
		let recipeIndex = e.target.dataset.index;
		//Array of info and recipeIndex sent to the modal window function
		modalForRecipe(arrayOfRecipesInfo, recipeIndex);
	}))
}

//Function that renders modal window content
function modalForRecipe(arrayOfRecipesInfo, recipeIndex){
	//Make the modal appear
	modalWindow.style.display = "block";
	//cuisineType takes value for readability
	cuisineType = arrayOfRecipesInfo[recipeIndex].cuisineType.toString();
	//Calc that determines calories per serving
	let calPerServing = arrayOfRecipesInfo[recipeIndex].calories / arrayOfRecipesInfo[recipeIndex].servings;
	//HTML structure and values of the modal window
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
	//The API does not always return a cooking total time, this checks if it is the case and acts accordingly
	if(arrayOfRecipesInfo[recipeIndex].totalTime > 0){
		//Created cuisineTypeP variable in order to append totalTime after it
		let cuisineTypeP = document.getElementById('cuisine-type');
		//Create the p for total time
		let totalTimeP = document.createElement("p");
		//Total time HTML
		totalTimeP.innerHTML = 'Total time: ' + arrayOfRecipesInfo[recipeIndex].totalTime + ' minutes';
		//Append totalTimeP
		cuisineTypeP.after(totalTimeP);
	}
	
	//Render the 2nd part of the modal window, the list of ingredients
	let listOfIngredients = document.getElementById("ingredients-list");
	//For loop that will create the li
	for(let i = 0; i < arrayOfRecipesInfo[recipeIndex].ingredients.length; i++){
		let liIngredient = document.createElement("li");
		liIngredient.innerText = "- " + arrayOfRecipesInfo[recipeIndex].ingredients[i].text;
		//Append ingredients in the list
		listOfIngredients.appendChild(liIngredient);
	}


}

//Modal windows variables
let modalWindow = document.getElementById('modal-window');
let modalContent = document.getElementById('modal-content');

//Event listener outside of the modal to close it
window.addEventListener('click', (e)=>{
	if (e.target == modalWindow) {
		modalWindow.style.display = "none";
	}
})

//Close span variable
let closeSpan = document.getElementsByClassName("close-span")[0];

//Event listener on the close span to close modal
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