<?php
include 'connection.php';


try{
  $dbh = new PDO("mysql:host=$host;dbname=$database", $user, $password);
}catch(PDOException $e)
{
  echo json_encode("Error:" . $e->getMessage() . "<br/>");
  die;
}
// try{
//   $db = new PDO ($dsn, $username, $password);
// } catch(PDOException $e)
// {
//   print "Error:" . $e->getMessage() . "<br/>";
//   die;
// }

// $conn = new mysqli($host, $username, $password,$database);


//Perform query
// $myquery = "
// SELECT name FROM users 
//   ";
// $query = mysqli_query($conn, $myquery);


////Error handling
// if ( ! $query ) {
//     echo json_encode(mysql_error());
//     die;
// }

// echo json_encode($query);

// // close connection
// mysqli_close($server);
// ?>
