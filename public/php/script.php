<?php
include 'connection.php';


$conn = new mysqli($host, $username, $password,$database) or die("Connect failed: %s\n". $conn -> error);
// //Connect to database
// $server = mysqli_connect($host, $username, $password);
// $connection = mysqli_select_db($database, $server);

//Perform query
$myquery = "
SELECT `name` FROM `users` 
  ";
$query = mysqli_query($conn, $myquery);


//Error handling
if ( ! $query ) {
    echo json_encode(mysql_error());
    die;
}

echo json_encode($query);

// close connection
mysqli_close($server);
?>