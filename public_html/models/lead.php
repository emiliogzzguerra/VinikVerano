<?php
	class Lead
	{
		public $name;
		public $phone;
		public $postal_code;
		public $email;
		public $taxes;
		
		function __construct($name, $phone, $postal_code, $email, $taxes)
		{
			$this->name = $name;
			$this->phone = $phone;
			$this->postal_code = $postal_code;
			$this->email = $email;
			$this->taxes = $taxes;
		}
		
		public function InsertLead($success)
		{
			$insercion_lead = mysqli_query($success,"INSERT INTO lead (name,phone,postal_code,email,taxes) VALUES ('$this->name', '$this->phone', '$this->postal_code', '$this->email', '$this->taxes')") or die('ERROR EN INSERCION DE Lead: '. mysql_error());
			$url_colonia = 'https://api-codigos-postales.herokuapp.com/v2/codigo_postal/' . $this->postal_code;
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url_colonia);
			// Set so curl_exec returns the result instead of outputting it.
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			// Get the response and close the channel.
			$response = curl_exec($ch);
			curl_close($ch);
			ChromePhp::log($response);
			//'asesores-online@vinik.com.mx'
			$to      = 'emilio.gonzalez@vinik.com.mx'; 
			$subject = '[LEAD] ' . $this->name . '$$$';
			$message = 'Acaba de llegar un lead\n Nombre = ' .  $this->name . '\nTelefono = ' .  $this->phone . '\nCodigo postal = ' .  $this->postal_code . '\n Codigo postal traducido: ' . $response . '\nCorreo = ' .  $this->email . '\nDeducción de impuestos = ' .  $this->taxes;
			$headers  = 'MIME-Version: 1.0' . "\r\n";
			$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
			$headers .= 'From: asesores-online@vinik.com.mx <no-reply@vinik.com.mx>\r\n';

			if(mail($to, $subject, $message, $headers)){
				ChromePhp::log("Email sent");
			}
		}
	}
?>
