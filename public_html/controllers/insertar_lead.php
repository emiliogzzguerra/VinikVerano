<?php
include '../conexion.php';
include '../models/lead.php';
include '../ChromePhp.php';

//Se reciben todas las variables por medio de post, el strin que viene dentro de los [] es el nombre del elemento html
//$value = $_POST['value'] ?? '';

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$name = $_POST['name'] ?? '';
$phone = preg_replace("/[^0-9]/", "", $_POST['phone'] ?? '');
$postal_code = $_POST['postalCode'] ?? '';
$email = $_POST['email'] ?? '';
$taxes = $_POST['taxes'] ?? '';

ChromePhp::log($_POST);

$lead = new Lead($name, $phone, $postal_code, $email, $taxes);
$lead->InsertLead($conexion);

//redireccionamiento
//header("Location: ../confirmacion.php");

?> 
