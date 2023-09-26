<?php
session_start();
@include('connect.php');
//header('Content-Type: application/json');
if (!$connect) {
  die("Connection failed: " . mysqli_connect_error());
}
$id = $_POST['id'] ?? '';
$query = mysqli_query($connect, "DELETE FROM `formToTable` WHERE `formToTable`.`id` = '$id'");
if(!mysqli_query($connect, $query)) {
  die("Error: " . mysqli_error($connect));
}
 
mysqli_close($connect);
