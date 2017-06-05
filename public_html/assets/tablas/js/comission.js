function reqListener (a) {
    console.log("reqListener started");
    var monthly_cash = a.monthly_cash.value;
    var years = a.years.value;
    var risk = a.risk.value;
    console.log("Cash = " + monthly_cash + ", Years = " + years, "Risk = " + risk);
    var xmlhttp = new XMLHttpRequest();
    console.log("Still Alive");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            document.getElementById("comission_text").innerHTML = this.responseText;
        }
    };

    xmlhttp.open("GET", "controllers/getComission.php?monthly_cash="+ monthly_cash + "&years=" + years + "&risk=" + risk, true);
    console.log("Still Alive2");
    xmlhttp.send();
    console.log("Sent");
}
