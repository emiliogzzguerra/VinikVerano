<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);
$conexion = mysqli_connect("localhost","whatup","whAtup1123***Ç") or die ("could not connect to mysql"); 
mysqli_select_db($conexion, "vinik") or die ("no database");   


//$conexion = new PDO('mysql:host=localhost;dbname=vinik;charset=utf8mb4', 'whatup', 'whAtup1123***Ç', array(PDO::ATTR_EMULATE_PREPARES => false, 
                                                                                                //PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
if (!$conexion) {
    die('No pudo conectarse: ' . mysql_error());
}
//echo("success!");
?>
