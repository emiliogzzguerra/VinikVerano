<?php

/*mysqli_connect es un método especial para realizar la conexión a la BD,
los parámetros pueden ser revisados en www.php.net*/

//Conexion Godaddy
$conexion =  mysqli_connect('localhost', 'emiliogzzguerra', 'Emilio1212');

//Conexion XAMPP
//$conexion =  mysqli_connect('localhost', 'root', '');

//Se establece el charset para la conexión
mysqli_set_charset('utf8',$conexion);

//Verificando que la conexión con el servidor con mysqli se haya realizado con éxito
if (!$conexion) {
    die('No pudo conectarse: ' . mysqli_error());
}

//Abrir base de datos
$conexion_base = mysqli_select_db('vinik', $conexion);

//Verificando que la conexión se haya hecho a la BD
if (!$conexion_base) {
    die ('No se encuentra la base de datos seleccionada : ' . mysqli_error());
    
}
?>
