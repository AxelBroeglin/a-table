<?php
session_start();
  ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
?> 
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>A table</title>
  <meta name="description" content="With À table, find your recipes, plan your meals, make your life easier !"/>
  <link rel="stylesheet" href="./public/styles.css">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="">

  <!-- Panel -->
  <div id="panel-menu" class="absolute top-0 right-0 h-full w-1/5 bg-white shadow-md z-10 hidden">
    <!-- Login and Sign in -->
    <div class="flex">
      <?php
          if(isset($_SESSION["userid"])){
            ?>
        <button id="menu-calendar" data-user="" class="mr-4 cursor-pointer"><img class="w-8 h-auto" src="./images/calendar-icon.png" alt=""></button>
      <ul id="menu-connexion" class="flex items-center text-lg font-bold">
        <li class="mr-4 cursor-default"><?php echo $_SESSION["useruid"];?></li>
        <li class="cursor-pointer"><a href="includes/logout.inc.php">Logout</a></li>
        <?php
          } else {
            ?>
      <ul id="menu-connexion" class="flex items-center text-lg font-bold">
        <li id="user-sign-up" data-user="sign-up" class="mr-4 cursor-pointer">Sign up</li>
        <li id="user-login" data-user="login" class="cursor-pointer">Login</li>
        <?php
          }
          ?>
      </ul>
    </div><!-- End of Login and Sign in -->
  </div><!-- end panel -->
  
  <!-- Header -->
  <div style="padding:15px 0 15px 0;" class="sticky top-0 z-40 text-slate-50 bg-green-600">    
    <div class="w-4/5 m-auto flex justify-between	items-center">
      <div>
        <h1 class="font-bold uppercase text-2xl">
          <a href="https://axelbroeglin.dev/projects/a-table/public/">À table</a>
        </h1>
      </div>
      <!-- Search section -->
      <div class="w-1/2 relative">
        <div class="w-full bg-slate-50 flex justify-between	 items-center border-slate-100 border border-solid rounded-full p-2">
          <form action="submit" id="search-form" class="w-full flex items-center" >
            <button id="magnifying-glass-search-button" class="px-2">
              <svg name="icon_search" class="w-5 h-auto fill-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M13.404 25.205c-6.96 0-12.603-5.642-12.603-12.603S6.443-.001 13.404-.001c6.96 0 12.603 5.642 12.603 12.603-.022 6.952-5.651 12.581-12.601 12.603h-.002zm0-23.057c-5.75 0-10.411 4.661-10.411 10.411S7.654 22.97 13.404 22.97s10.411-4.661 10.411-10.411c-.019-5.742-4.669-10.392-10.409-10.411h-.002zM30.105 32h-.006a1.09 1.09 0 0 1-.772-.318l-5.145-5.151a1.096 1.096 0 1 1 1.545-1.551l.001.001 5.151 5.151a1.095 1.095 0 0 1 0 1.55 1.095 1.095 0 0 1-.772.318h-.001z"></path></svg>
            </button>
            <span class="font-bold text-green-600 pr-1.5 shrink-0">I am looking for</span>
            <input id="search-input"class="bg-slate-50 text-slate-600 focus:outline-0 w-full" type="search" placeholder="a recipe, an ingredient..." value="">
          </form>
          <button id="more-criteria" class="px-2 cursor-pointer border-l" aria-label="Filtrer"><img src="./images/filter-icon.png" class="w-10 h-auto" alt="Filter icon, click to filter"></button>
        </div>
        <!-- The Criteria modal -->
        <div id="criteria-modal-window" class="hidden rounded-xl w-auto absolute inset-x-0 z-50 bg-slate-white-50 shadow-md overflow-auto">   
          <div id="criteria-modal-content-container" class="bg-gray-50 m-auto p-6 rounded border border-inherit border-solid">
            <div id="criteria-modal-content">
              <!-- Reveal Criteria -->
              <div id="reveal-criteria" class="text-slate-600">
                    <!-- Health labels -->
                    <div>
                        <h3 class="pb-1 font-bold text-green-600">Health labels</h3>
                        <input type="checkbox" id="vegetarian" class='health-labels search-criteria' name="vegetarian">
                        <label for="vegetarian">Vegetarian</label>

                        <input type="checkbox" id="vegan" class='health-labels search-criteria' name="vegan">
                        <label for="vegan">Vegan</label>

                        <input type="checkbox" id="pescatarian" class='health-labels search-criteria' name="pescatarian">
                        <label for="pescatarian">Pescatarian</label>

                        <input type="checkbox" id="crustacean-free" class='health-labels search-criteria' name="crustacean-free">
                        <label for="crustacean-free">Crustacean-free</label>

                        <input type="checkbox" id="dairy-free" class='health-labels search-criteria' name="dairy-free">
                        <label for="dairy-free">Dairy-free</label>

                        <input type="checkbox" id="egg-free" class='health-labels search-criteria' name="egg-free">
                        <label for="egg-free">Egg-free</label>

                        <input type="checkbox" id="gluten-free" class='health-labels search-criteria' name="gluten-free">
                        <label for="gluten-free">Gluten-free</label>

                        <input type="checkbox" id="kosher" class='health-labels search-criteria' name="kosher">
                        <label for="kosher">Kosher</label>

                        <input type="checkbox" id="peanut-free" class='health-labels search-criteria' name="peanut-free">
                        <label for="peanut-free">Peanut-free</label>

                        <input type="checkbox" id="pork-free" class='health-labels search-criteria' name="pork-free">
                        <label for="pork-free">Pork-free</label>

                        <input type="checkbox" id="shellfish-free" class='health-labels search-criteria' name="shellfish-free">
                        <label for="shellfish-free">Shellfish-free</label>

                        <input type="checkbox" id="tree-nut-free" class='health-labels search-criteria' name="tree-nut-free">
                        <label for="tree-nut-free">Tree-nut-free</label>
                    </div><!-- End of health labels -->

                    <!-- Cuisine types -->
                    <div id="cuisine-types" class="pt-2 pb-1">
                      <h3 class="font-bold text-green-600">Cuisine type</h3>
                      <input type="checkbox" id="chinese" class='cuisine-types search-criteria' name="chinese">
                      <label for="chinese">Chinese</label>

                      <input type="checkbox" id="french" class='cuisine-types search-criteria' name="french">
                      <label for="french">French</label>

                      <input type="checkbox" id="greek" class='cuisine-types search-criteria' name="greek">
                      <label for="greek">Greek</label>

                      <input type="checkbox" id="indian" class='cuisine-types search-criteria' name="indian">
                      <label for="indian">Indian</label>

                      <input type="checkbox" id="italian" class='cuisine-types search-criteria' name="italian">
                      <label for="italian">Italian</label>

                      <input type="checkbox" id="japanese" class='cuisine-types search-criteria' name="japanese">
                      <label for="japanese">Japanese</label>
                      
                      <input type="checkbox" id="korean" class='cuisine-types search-criteria' name="korean">
                      <label for="korean">Korean</label>

                      <input type="checkbox" id="mexican" class='cuisine-types search-criteria' name="mexican">
                      <label for="mexican">Mexican</label>

                      <input type="checkbox" id="nordic" class='cuisine-types search-criteria' name="nordic">
                      <label for="nordic">Nordic</label>

                      <input type="checkbox" id="south-american" class='cuisine-types search-criteria' name="south-american">
                      <label for="south-american">South American</label>
                    </div><!-- End of cuisine types -->

                  </div> <!-- End of reveal Criteria -->
                  <div id="search-button" class="flex justify-center items-center text-lg font-bold text-slate-50">
                    <button class="w-4/12 bg-green-600 rounded-lg mt-6">Search</button>
                  </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End of Criteria modal -->
      <!-- End of Search Section -->
      <!-- Hamburger menu -->  
      <div class="relative flex flex-col">
        <div id="hamburger-menu" class="flex flex-col items-center justify-center w-8 h-8 cursor-pointer">
          <div class="w-8 h-1.5 bg-white rounded-full"></div>
          <div class="w-8 h-1.5 bg-white rounded-full my-1"></div>
          <div class="w-8 h-1.5 bg-white rounded-full"></div>
        </div>
      </div><!-- end hamburger menu -->
    </div>
  </div><!-- End of header -->

  <main class="pt-8 w-4/5 m-auto"><!-- Main -->
    <p>Welcome to A table! We are thrilled to offer you an easy and convenient way to find delicious recipes tailored to your preferences and dietary requirements. With just a few clicks, you can search for recipes from a vast collection of dishes and create an account to save your favorite recipes in your calendar.

    Whether you're looking for vegan, gluten-free, or low-carb recipes, we've got you covered. A table allows you to customize your search results based on your dietary and country preferences. Plus, with our user-friendly interface, you can easily browse through recipes and find the perfect meal for any occasion.

    We want to remind you that the recipes you'll find on our website are sourced from external websites, and sometimes the links might be down due to various reasons. But don't worry, we are sure that you will find the perfect dish amongst the plethoric catalogue.

    So, whether you're a seasoned chef or just starting out in the kitchen, we hope our recipe search website becomes your go-to resource for all your cooking needs. Happy cooking!</p>
    <div id="content-container" class="pt-8">
      <!-- Search container -->
      <div id="search-section">
          <!-- Search -->        
          
        <!-- Result container -->
        <section class="flex justify-center pt-6">
          <div id="cards-display" class="grid grid-cols-4 justify-items-center content-between">
            <!-- cards go here -->
          </div>

         
        </section><!-- End of result container -->
      </div><!-- End of search -->

      <!-- The Main Modal -->
      <div id="modal-window" class="modal hidden fixed z-50 pt-24 left-0 top-0 w-full h-full backdrop-blur-sm bg-slate-white-50 overflow-auto">   
      	<div id="modal-content-container" class="bg-gray-50 m-auto p-10 rounded border border-inherit border-solid">
          <span class="close-span text-green-600 float-right text-2xl font-bold hover:text-green-800 hover:cursor-pointer">&times;</span>
          <div id="modal-content"></div>
        </div>
      </div><!-- End of Main Modal -->

      <!-- Small Modal -->
      <div id="small-modal" class="hidden bg-white w-1/6 rounded-lg shadow-lg p-6 z-50 fixed">
          <h4>Lunch</h4>
          <div id="small-modal-lunch"></div>
          <h4>Dinner</h4>
          <div id="small-modal-dinner"></div>
      </div><!-- End of Small Modal -->

      <!-- Calendar container -->
      <section id="calendar-section" class="calendar-container w-full text-slate-300	flex	items-center	">
        
      </section><!-- End of calendar container -->
    </div>
  </main><!-- End of Main -->
<script type="text/javascript" src="script.js"></script>
</body>
</html>
