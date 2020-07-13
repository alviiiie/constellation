<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	include('connect.php');

	//sql query
	$sql = "SELECT * FROM stars;";
	
	$result = $conn->query($sql);
	$rows = array();
	while($r = $result->fetch(PDO::FETCH_ASSOC)) {
    		$rows[] = $r;
	}

	print json_encode($rows);

?>
