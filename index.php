<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">

	<title>Const Elation :^)</title>
	<meta name="description" content="Form for ssss hackathon">
	<meta name="author" content="Gabe and Alvin">

	<link rel="stylesheet" href="main.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="drawing.js"></script>
	<!-- <script src="gravity.js"></script> -->
</head>
<body>
	<form action='addStars.php' id='formboi' method='POST'>
		<h1> Make a constellation! </h1>
		<label for='name'>
			<p>Title</p>
			<input type='text' name='name'>
		</label>
		<label for='creator'>
			<p>Creator</p>
			<input type='text' name='creator'>
		</label>
		<input type='hidden' name='path'  id='hidden-path' value=''>
		<button type='button' id='submit-button'>Add your stars</button>
	</form>
	<canvas id='canvas' width='500' height='500'></canvas>
</body>
</html>
