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
  <link rel="stylesheet" href="./styles.css">
</head>
<body class="">

<!-- Header -->
    <div style="padding:15px 0 15px 0;" class="sticky top-0 z-40 text-slate-50 bg-green-600">
      <div class="w-4/5 m-auto flex justify-between	items-center">
        <div>
          <h1 class="font-bold uppercase text-2xl">
            <a href="/">À table</a>
          </h1>
        </div>
        <!-- Search and Calendar -->
        <div class="bg-slate-50 flex grow items-center border-slate-100 border border-solid rounded-full m-1 p-3">
          <span class="font-bold text-green-600">I am looking for</span>
          <input type="search" placeholder="a recipe, an ingredient..." value="">
          <button aria-label="Filtrer"></button>
        </div>

        <!--<div class="">
          <ul id="menu" class="flex text-lg font-bold">
            <li id="menu-search" data-menu="search" class="mr-2 cursor-pointer">Search</li>
            <?php
              if(isset($_SESSION["userid"])){
            ?>
            <li id="menu-calendar" data-menu="calendar" class="calendar-buttons cursor-pointer">Calendar</li>
            <?php
              }
            ?>
          </ul>
        </div>End of Search and Calendar -->
        <div><!-- Login and Sign in -->
        <ul id="menu-connexion" class="flex text-lg font-bold">
          
          <?php
              if(isset($_SESSION["userid"])){
                ?>
            <li class="mr-2 cursor-pointer"><a href="#"><?php echo $_SESSION["useruid"];?></a></li>
            <li class="cursor-pointer"><a href="includes/logout.inc.php">Logout</a></li>
            <?php
              } else {
                ?>
            <li id="user-sign-up" data-user="sign-up" class="mr-2 cursor-pointer">Sign up</li>
            <li id="user-login" data-user="login" class="cursor-pointer">Login</li>
            <?php
              }
              ?>
          </ul>
        </div><!-- Login and Sign in -->
      </div>
    </div><!-- End of header -->

  <main class="pt-8 w-4/5 m-auto"><!-- Main -->
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pellentesque nunc tellus, vel blandit metus feugiat congue. Ut id pellentesque ligula, nec iaculis elit. Phasellus porttitor pellentesque semper. Duis eget pharetra urna.</p>
    <div id="content-container" class="pt-8">
      <!-- Search container -->
      <div id="search-section">
          <!-- Search -->
          <section>            
              <form>
                <div class="flex flex-row items-center">
                  <label for="food-search" class="pr-4 font-semibold">Search for food:</label>
                  <input class="bg-slate-200 mx-2" id="search-input" type="text" name="foodSearch">
                  <input class="border-2 border-green-600 bg-green-600 rounded px-2 text-slate-50" id="btn" type="submit" value="Submit">
                  <!-- Preparation for search recap -->
                  <div id="search-recap-container" class="pl-4 flex flex-row"></div>
                </div>
                
                <!-- Criteria -->
                <div id="criteria" class="pt-2">
                  <div id="health-labels">
                    <input type="checkbox" id="vegetarian" class='health-labels search-criteria' name="vegetarian">
                    <label for="vegetarian">Vegetarian</label>

                    <input type="checkbox" id="vegan" class='health-labels search-criteria' name="vegan">
                    <label for="vegan">Vegan</label>

                    <input type="checkbox" id="pescatarian" class='health-labels search-criteria' name="pescatarian">
                    <label for="pescatarian">Pescatarian</label>
                    <p id="more-criteria" class="pt-3 pb-3 font-semibold">More criteria 	&ensp;<i class="arrow down pl-1"></i></p>
                  </div>  

                  <!-- Reveal Criteria -->
                  <div id="reveal-criteria" style="display:none;">
                    <!-- Health labels -->
                    <div>
                        <h3 class="pb-1 font-bold text-green-600">Health labels</h3>
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

                </div> <!-- End of criteria -->

              </form>
          </section>
        
          
        <!-- Result container -->
        <section class="flex justify-center pt-6">
          <div id="cards-display" class="grid grid-cols-4 justify-items-center content-between">
            <!-- cards go here -->
          </div>

         
        </section><!-- End of result container -->
      </div><!-- End of search -->

      <!-- The Modal -->
      <div id="modal-window" class="modal hidden fixed z-50 pt-24 left-0 top-0 w-full h-full backdrop-blur-sm bg-slate-white/50 overflow-auto">   
      	<div id="modal-content-container" class="bg-gray-50 m-auto p-10 rounded border border-inherit border-solid">
          <span class="close-span text-green-600 float-right text-2xl font-bold hover:text-green-800 hover:cursor-pointer">&times;</span>
          <div id="modal-content"></div>
        </div>
      </div>
      
      <!-- Calendar container -->
      <section id="calendar-section" class="calendar-container w-full text-slate-300	flex	items-center	">
        
      </section><!-- End of calendar container -->
    </div>
  </main><!-- End of Main -->
<script type="text/javascript" src="script.js"></script>
</body>
</html>
