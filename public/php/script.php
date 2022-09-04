<?php
include 'connection.php';

//Connect to database
$server = mysql_connect($host, $username, $password);
$connection = mysql_select_db($database, $server);

//Perform query
$myquery = "
  SELECT * FROM  `users`
  ";
$query = mysql_query($myquery);

$data = 'dsddsdsds';

//Error handling
if ( ! $query ) {
    echo mysql_error();
    die;
}

echo json_encode('query');

// close connection
mysql_close($server);


?>