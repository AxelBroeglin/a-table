<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


if(isset($_POST["save"])){

    //Grabbing the data
    //Will have to grqbe users_id as well
    $date = $_POST["date"];
    $lunch = $_POST["lunch"];
    $lunchname = $_POST["lunch_name"];
    $diner = $_POST["diner"];
    $dinername = $_POST["diner_name"];



    // //Instantiate LoginContr class

    include "../classes/connection.classes.php";
    include "../classes/add-to-calendar.classes.php";
    include "../classes/add-to-calendar-contr.classes.php";
    $login = new LoginContr($uid, $password);

    // //Running error handlers and user login
    $login->loginUser();

    //Going back to front page
    header("location: ../index.php?error=none");

    ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

}   
