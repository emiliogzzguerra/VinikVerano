<?php
include '../conexion.php';
include '../models/lead.php';

//Se reciben todas las variables por medio de post, el strin que viene dentro de los [] es el nombre del elemento html
$name = $_POST['name'];
$phone = preg_replace("/[^0-9]/", "", $_POST['phone']);
$postal_code = $_POST['postal_code'];
$email = $_POST['email'];
$taxes = $_POST['taxes'];

$lead = new Lead($name, $phone, $postal_code, $email, $taxes);
$lead->InsertLead();

//redireccionamiento
header("Location: ../confirmacion.php");
?> 
