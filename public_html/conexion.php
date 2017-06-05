<?php

/*mysql_connect es un método especial para realizar la conexión a la BD,
los parámetros pueden ser revisados en www.php.net*/

//Conexion Godaddy
$conexion =  mysql_connect('localhost', 'whatup', 'whAtup1123***Ç');

//Conexion XAMPP
//$conexion =  mysql_connect('localhost', 'root', '');

//Se establece el charset para la conexión
mysql_set_charset('utf8',$conexion);

//Verificando que la conexión con el servidor con mysql se haya realizado con éxito
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
