<?php

//include 'connection.php';

$username = "axelbrgln";  
$password = "Enfoire35";
$host = "axelbrgln.mysql.db";
$database="axelbrgln";

$dsn = 'mysql:host=axelbrgln.mysql.db;dbname=axelbrgln';

$pdo = new PDO($dsn, $username, $password);

// select all users
$stmt = $pdo->prepare("SELECT * FROM Meals");
$stmt->execute();

$result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
echo $result;
?>
