<?php
include '../conexion.php';
include '../models/estimacion.php';
include '../ChromePhp.php';

//Se reciben todas las variables por medio de post, el strin que viene dentro de los [] es el nombre del elemento html
//$value = $_POST['value'] ?? '';

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$aportaciones_totales = $_POST['aportaciones_totales'] ?? '';
$interes_ganado = $_POST['interes_ganado'] ?? '';
$costo_administracion = $_POST['costo_administracion'] ?? '';
$ahorro_esperado = $_POST['ahorro_esperado'] ?? '';
$devoluciones_fiscales = $_POST['devoluciones_fiscales'] ?? '';
$ahorro_acumulado = $_POST['ahorro_acumulado'] ?? '';
$ahorro_acumulado_fixed = $_POST['ahorro_acumulado_fixed'] ?? '';

ChromePhp::log($_POST);

$estimacion = new Estimacion($aportaciones_totales,
                 $interes_ganado,
                 $costo_administracion,
                 $ahorro_esperado,
                 $devoluciones_fiscales,
                 $ahorro_acumulado,
                 $ahorro_acumulado_fixed);
$lead->InsertEstimacion($conexion);
?> 
