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
    $searchurl = $_GET["searchurl"];

    $column = "";
    if($type == "lunch") {
        $column = "lunch";
    } else if($type == "dinner") {
        $column = "dinner";
    }

    // First, check if a row already exists in the Meals table for the given user and date
    $check_query = "SELECT * FROM Meals WHERE users_id = '$userid' AND date = '$date'";
    $result = $connection->query($check_query);

    if (!$result) {
        // query failed
    } else {
        if ($result->rowCount() > 0) {
            // a row already exists, so update it
            $update_query = "UPDATE Meals SET ".$column."_name = '$title', ".$column."_url = '$url' WHERE users_id = '$userid' AND date = '$date'";
            $result = $connection->query($update_query);
        } else {
            // a row does not exist, so insert a new one
            $insert_query = "INSERT INTO Meals (users_id, date, $column"."_name, $column"."_url) VALUES ('$userid', '$date', '$title', '$url')";
            $result = $connection->query($insert_query);
        }
    }

    if (!$result) {
        // query failed
    } else {
        //Going back to front page
        header("location: $searchurl");
    }

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

}   