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