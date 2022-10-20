<?php
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


if(isset($_GET["date"]) && isset($_GET["title"]) && isset($_GET["url"]) && isset($_GET["type"])){
    //Grabbing the data
    $userid = $_SESSION["useruid"];
    $date = $_GET["date"];
    $title = $_GET["title"];
    $url = $_GET["url"];
    $type = $_GET["type"];



    //Instantiate LoginContr class

    include "../classes/connection.classes.php";
    include "../classes/add-to-calendar.classes.php";
    include "../classes/add-to-calendar-contr.classes.php";


    //Going back to front page
    header("location: ../index.php?error=none");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

}   
