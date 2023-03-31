<?php
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


if(isset($_GET["date"]) && isset($_GET["title"]) && isset($_GET["url"]) && isset($_GET["type"])){
    include "../classes/connection.classes.php";
    $dbh = new Dbh();
    $connection = $dbh->getConnection();


    //Grabbing the data
    $userid = $_SESSION["userid"];
    $date = $_GET["date"];
    $title = $_GET["title"];
    $url = $_GET["url"];
    $type = $_GET["type"];

    $column_name = $type == "lunch" ? "lunch" : "dinner";
    $delete_query = "UPDATE Meals SET $column_name" . "_name = '', $column_name" . "_url = '' WHERE date = '$date' AND users_id = '$userid';";
    $result = $connection->query($delete_query);
    
    header("location: ../index.php");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

}