<?php
include 'connection.php';


$conn = new mysqli($host, $username, $password,$database) or die("Connect failed: %s\n". $conn -> error);
// //Connect to database
// $server = mysqli_connect($host, $username, $password);
// $connection = mysqli_select_db($database, $server);

//Perform query
$myquery = "
  SELECT * FROM  `users`
  ";
$query = mysqli_query($myquery);


//Error handling
if ( ! $query ) {
    echo json_encode(mysql_error());
    die;
}

echo json_encode($query);

// close connection
mysqli_close($server);

// //Create connection
// $conn = new mysqli($host, $username, $password, $database);
// echo json_encode($conn->host_info . "\n");


// // Check connection
// if ($conn->connect_error) {
//    die("Connection failed: " . $conn->connect_error);
// }
//   echo json_encode("Connected successfully");
?>