<?php
//$servername = "35.203.164.52";
$servername = "34.82.80.183";
$username = "root";
$password = "uhohhotdog";

// Create connection
try {
	$conn = new PDO("mysql:host=$servername;dbname=space", $username, $password);
	// set the PDO error mode to exception
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	echo "Connected successfully";
} catch(PDOException $e) {
	echo "Connection failed: " . $e->getMessage();
}
