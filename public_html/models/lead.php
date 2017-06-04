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
		
		public function InsertLead()
		{
			$insercion_lead=mysql_query("INSERT INTO lead (name,phone,postal_code,email,taxes) VALUES ('$this->name', '$this->phone', '$this->postal_code', '$this->email', '$this->taxes')")  or die('ERROR EN INSERCIÓN DE Lead: '. mysql_error());	
		}
	}
?>