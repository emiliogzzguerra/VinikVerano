<?php

$conexion =  mysql_pconnect('localhost:3306', 'whatup', 'whAtup1123***Ç');
if (!$conexion) {
    die('No pudo conectarse: ' . mysql_error());
    
}

//Abrir base de datos
$conexion_base = mysql_select_db('vinik', $conexion);

//Verificando que la conexión se haya hecho a la BD
if (!$conexion_base) {
    die ('No se encuentra la base de datos seleccionada : ' . mysql_error());
    
}
?>
