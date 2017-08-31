<?php
	class Estimacion
	{
        public $aportaciones_totales;
        public $interes_ganado;
        public $costo_administracion;
        public $ahorro_esperado;
        public $devoluciones_fiscales;
        public $ahorro_acumulado;
        public $ahorro_acumulado_fixed;
		
		function __construct(
            $aportaciones_totales,
            $interes_ganado,
            $costo_administracion,
            $ahorro_esperado,
            $devoluciones_fiscales,
            $ahorro_acumulado,
            $ahorro_acumulado_fixed
            )
		{
            $this->aportaciones_totales = $aportaciones_totales;
            $this->interes_ganado = $interes_ganado;
            $this->costo_administracion = $costo_administracion;
            $this->ahorro_esperado = $ahorro_esperado;
            $this->devoluciones_fiscales = $devoluciones_fiscales;
            $this->ahorro_acumulado = $ahorro_acumulado;
            $this->ahorro_acumulado_fixed = $ahorro_acumulado_fixed;
		}
		
		public function InsertLead($conexion)
		{
			$insercion_estimacion = mysqli_query($conexion,"INSERT INTO submission (aportaciones_totales,
                                                                                    interes_ganado,
                                                                                    costo_administracion,
                                                                                    ahorro_esperado,
                                                                                    devoluciones_fiscales,
                                                                                    ahorro_acumulado,
                                                                                    ahorro_acumulado_fixed)
                                                            VALUES (
                                                                '$this->aportaciones_totales',
                                                                '$this->interes_ganado',
                                                                '$this->costo_administracion',
                                                                '$this->ahorro_esperado',
                                                                '$this->devoluciones_fiscales',
                                                                '$this->ahorro_acumulado',
                                                                '$this->ahorro_acumulado_fixed')")
                                    or die('ERROR EN INSERCION DE Estimacion: '. mysql_error());
			$url_colonia = 'https://api-codigos-postales.herokuapp.com/v2/codigo_postal/' . $this->postal_code;
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url_colonia);
			// Set so curl_exec returns the result instead of outputting it.
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			// Get the response and close the channel.
			$response = curl_exec($ch);
			curl_close($ch);
			ChromePhp::log($response);
			https://api.trello.com/1/cards?key=myKey&token=myToken&name=newCardName&desc=newCarddescription&idList=myListId
			//'asesores-online@vinik.com.mx'
			$to      = 'emilio.gonzalez@vinik.com.mx'; 
			$subject = '[LEAD] ' . $this->name . '$$$';
			$message = wordwrap('Acaba de llegar un lead\n Nombre = ' .  $this->name . '\nTelefono = ' .  $this->phone . '\nCodigo postal = ' .  $this->postal_code . '\n Codigo postal traducido: ' . $response . '\nCorreo = ' .  $this->email . '\nDeducción de impuestos = ' .  $this->taxes);
			/*
			$encoding = "utf-8";

			// Preferences for Subject field
			$subject_preferences = array(
				"input-charset" => $encoding,
				"output-charset" => $encoding,
				"line-length" => 76,
				"line-break-chars" => "\r\n"
			);

			// Mail header
			$header = "Content-type: text/html; charset=".$encoding." \r\n";
			$header .= "From: asesores-online@vinik.com.mx <asesores-online@vinik.com.mx> \r\n";
			$header .= "MIME-Version: 1.0 \r\n";
			$header .= "Content-Transfer-Encoding: 8bit \r\n";
			$header .= "Date: ".date("r (T)")." \r\n";
			$header .= iconv_mime_encode("Subject", $subject, $subject_preferences);

			// Send mail
			$sent = mail($mail_to, $mail_subject, $mail_message, $header);

			if($sent){
				ChromePhp::log("Email sent");
			} else {
				ChromePhp::log("NOT sent");
			}
			*/
		}
	}
?>