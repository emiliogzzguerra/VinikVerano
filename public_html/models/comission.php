<?php
	class Comission
	{
		public $monthly_cash;
		public $years;
		public $admin_cost;

		public static function SearchComission($monthly_cash, $years, $risk)
		{

			//Se comienza con un simple select para después agregarle las condiciones de la búsqueda
			$busqueda_query = "SELECT admin_cost FROM ";

			if($risk == "low"){
				$busqueda_query.="lowOld WHERE monthly_cash = $monthly_cash AND years = $years";
			} else if ($risk == "medium") {
				$busqueda_query.="mediumOld WHERE monthly_cash = $monthly_cash AND years = $years";
			} else {
				$busqueda_query.="highOld WHERE monthly_cash = $monthly_cash AND years = $years";
			}

			//Conexion Godaddy
			$conexion =  mysql_pconnect(, 'whatup', 'whAtup1123***Ç');

			//Una vez formado el query este se ejecuta
			$resultado_busqueda = mysql_query($busqueda_query) or die ("ERROR EN EL QUERY en comission.php: " . mysql_error());

			mysql_close($conexion);

			if (!$resultado_busqueda) {
			    die('No hay resultado en comission: ' . mysql_error());
			}
			
			return $resultado_busqueda;
		}
	}
?>