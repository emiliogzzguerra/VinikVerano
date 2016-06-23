<?php
	$data = json_decode(file_get_contents("php://input"));

	include('config.php');

	$db = new DB();

	$sql = "INSERT INTO `leads`(`nombre`,`telefono`,`email`)VALUES('$data->nombre','$data->telefono','$data->email')";

	$data = $db->qryFire($sql);

	echo json_encode($data);
