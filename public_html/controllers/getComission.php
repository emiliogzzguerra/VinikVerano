<?php
include '../conexion.php';
include '../models/comission.php';

//Se verifica si se ha presionado el botón de buscar, si es así se forma el query de la búsqueda

//Se comienza con un simple select para después agregarle las condiciones de la búsqueda
//print "Ya llegue...";

$monthly_cash = $_GET['monthly_cash'];
$years = $_GET['years'];
$risk = $_GET['risk'];

//echo $first_name;

$resultado_busqueda = Comission::SearchComission($monthly_cash, $years, $risk);

$row = mysql_fetch_assoc($resultado_busqueda);

echo json_encode($row);

//return 

?>
