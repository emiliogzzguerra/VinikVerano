<?php
	$data = json_decode(file_get_contents("php://input"));

	include('config.php');

	$db = new DB();

	$sql = "INSERT INTO `prueba`(`name`,`email`,`phone`,`message`)VALUES('$data->name','$data->email','$data->phone','$data->message')";

	$data = $db->qryFire($sql);

	echo json_encode($data);
