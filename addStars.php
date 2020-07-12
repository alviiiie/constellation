<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	//connect to db
	include('connect.php');

	//constructing query
	$sql = "INSERT INTO stars (name, creator, image) VALUES ('";
	
	//getting posted variables
	$name = $_POST['name'] ? $_POST['name'] : 'untitled';
	$creator = $_POST['creator'] ? $_POST['creator'] : 'unknown';
	//$image_url = "/images/" . $name;
	$image_url = $_POST['path'] ? $_POST['path'] : 'images/broken.png';
	//appending to sql query
	$sql .= $name . "', '" . $creator . "', '" . $image_url . "');";
	
	//execute sql query
	try {
		$conn->exec($sql);
		echo "record added";
	} catch(PDOException $e) {
		echo $sql . "<br>" . $e.getMessage();
	}
	

	$conn = null;

	//redirect to the cool page
?>
