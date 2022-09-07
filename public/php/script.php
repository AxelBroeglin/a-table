<?php
print_r('test');

$username = "axelbrgln";  
$password = "Lepanache35";
$host = "ftp.cluster031.hosting.ovh.net";
$database="axelbrgln";

$dsn = 'mysql:host=ftp.cluster031.hosting.ovh.net;dbname=axelbrgln';
print_r($dsn);
try{
    $pdo = new PDO($dsn, $username, $password);
}catch(PDOException $ex){
    echo $ex->getMessage()." la ligne est".$ex->getLine();
}
// include 'connection.php';

?>
