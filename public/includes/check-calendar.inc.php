<?php
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include "../classes/connection.classes.php";

$dbh = new Dbh();
$connection = $dbh->getConnection();

$userid = $_SESSION["userid"];

$date = json_decode(file_get_contents('php://input'), true)["date"];

$query = "SELECT lunch_name, lunch_url, dinner_name, dinner_url FROM Meals WHERE users_id = '$userid' AND date = '$date'";
$result = $connection->query($query);
if ($result->rowCount() > 0) {
    $row = $result->fetch(PDO::FETCH_ASSOC);
    $lunch_name = $row['lunch_name'];
    $lunch_url = $row['lunch_url'];
    $dinner_name = $row['dinner_name'];
    $dinner_url = $row['dinner_url'];

    $data = array(
        'lunch_name' => $lunch_name,
        'lunch_url' => $lunch_url,
        'dinner_name' => $dinner_name,
        'dinner_url' => $dinner_url
    );
    echo json_encode($data);
} else {
    $data = array();
    echo json_encode($data);
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL); 