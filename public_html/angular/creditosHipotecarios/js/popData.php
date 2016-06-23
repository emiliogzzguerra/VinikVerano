<?php
	include('config.php');

	$db = new DB();

	$data = $db->qryFire();

	echo json_encode($data);

	/*
	<?php
		include('config.php');



		$db = new DB();
		$sql = "SELECT * FROM `leads`";
		$data = $db->qryFire();
		echo json_encode($data);
		
		//$db = new DB();

		// Create connection
		$conn = new mysqli(__HOST__, __USER__, __PASS__, __BASE__);
		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		}

		$sql = "SELECT * FROM leads";
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
		    // output data of each row
		    while($row = $result->fetch_assoc()) {
		        echo "id: " . $row["nombre"]. " - Name: " . $row["telefono"]. " " . $row["email"]. "<br>";
		    }
		} else {
		    echo "0 results";
		}
		$conn->close();



		//$data = $db->qryFire();

		echo json_encode($result);

*/
