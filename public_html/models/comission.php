<?php
	class Comission
	{
		public $monthly_cash;
		public $years;
		public $admin_cost;

		public static function SearchComission($monthly_cash, $years, $risk)
		{
			echo "Hello";
			print "Hello";
			//Se comienza con un simple select para despu�s agregarle las condiciones de la b�squeda
			$busqueda_query = "SELECT admin_cost FROM ";

			if($risk == "low"){
				$busqueda_query.="lowOld WHERE monthly_cash = $monthly_cash AND years = $years";
			} else if ($risk == "medium") {
				$busqueda_query.="mediumOld WHERE monthly_cash = $monthly_cash AND years = $years";
			} else {
				$busqueda_query.="highOld WHERE monthly_cash = $monthly_cash AND years = $years";
			}
			
			print $busqueda_query;
			echo $busqueda_query;

			//Una vez formado el query este se ejecuta
			$resultado_busqueda = mysql_query($busqueda_query) or die ("ERROR EN EL QUERY: " . mysql_error());

			
			return $resultado_busqueda;
		}
	}
?>