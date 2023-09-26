<?php
session_start();
@include('connect.php');
header('Content-Type: application/json');
if (!$connect) {
  die("Connection failed: " . mysqli_connect_error());
}
$output = array();
$product = mysqli_query($connect, "SELECT * FROM `formToTable`");
// if (!mysqli_query($connect, $query)) {
//     die("Error: " . mysqli_error($connect));
// }
while($arrayProduct = mysqli_fetch_assoc($product)) {
  $output[] = $arrayProduct;  
}
echo json_encode($output); 
mysqli_close($connect);