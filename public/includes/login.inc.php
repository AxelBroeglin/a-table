<?php

if(isset($_POST["submit"])){

    // //Grabbing the data
    $uid = $_POST["uid"];
    $password = $_POST["password"];

    // //Instantiate LoginContr class

    include "../classes/connection.classes.php";
    include "../classes/login.classes.php";
    include "../classes/login-contr.classes.php";
    $login = new LoginContr($uid, $password);

    // //Running error handlers and user login
    $login->loginUser();

    //Going back to front page
    header("location: ../index.php?error=none");

}   
