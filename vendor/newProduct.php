
<?php
session_start();
@include('connect.php');
if (!$connect) {
  die("Connection failed: " . mysqli_connect_error());
}

$manufacturer = $_POST['manufacturer'] ?? '';
$name = $_POST['name'] ?? '';
$price = $_POST['price'] ?? '';
$quantity = $_POST['quantity'] ?? '';


mysqli_query($connect, "INSERT INTO `formToTable`(`id`, `manufacturer`, `name`, `price`, `quantity`) VALUES (NULL,'$manufacturer','$name','$price','$quantity')");

// if (!mysqli_query($connect, $query)) {
//   die("Error: " . mysqli_error($connect));
// }
mysqli_close($connect);