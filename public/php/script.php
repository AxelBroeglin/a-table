<?php

require_once 'connection.php';



// select all users
$stmt = $pdo->prepare("SELECT * FROM `Meals`");
$stmt->execute();

print("Fetch the result set:\n");
$result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
print "<pre>";
print_r($result);
print "</pre>";

?>
