<?php


$connect = mysqli_connect('localhost', 'root', '', 'formToTable');
if(!$connect){
    die('Error connect to database');
}



define("TIME_ACTIVE_LINK", 60);