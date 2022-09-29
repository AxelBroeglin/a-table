<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


if(isset($_POST["submit"])){

    // //Grabbing the data
    $uid = $_POST["uid"];
    $password = $_POST["password"];
    $passwordRepeat = $_POST["passwordrepeat"];
    $email = $_POST["email"];

    // //Instantiate SignupContr class

    include "../classes/connection.classes.php";
    include "../classes/signup.classes.php";
    include "../classes/signup-contr.classes.php";
    $signup = new SignupContr($uid, $password, $passwordRepeat, $email);

    // //Running error handlers and user signup
    $signup->signupUser();

    //Going back to front page
    header("location: ../index.php?error=none");

    ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

}   
