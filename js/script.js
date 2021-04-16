var Name = document.getElementById("name");
var jobRole = document.getElementById("title");
var otherJobRole = document.getElementById("other-job-role");
var Design = document.getElementById("design");
var Color = document.getElementById("color");
var colorOptions = Color.children;
var Register = document.getElementById("activities");
var costText = document.getElementById("activities-cost");
var Cost = 0;
var Payment = document.getElementById("payment");
var creditCard = document.getElementById("credit-card");
var Paypal = document.getElementById("paypal");
var Bitcoin = document.getElementById("bitcoin");	

Name.focus();
otherJobRole.style.display = 'none';
Color.disabled = true;
Paypal.hidden = true;
Bitcoin.hidden = true;
Payment.children[1].selected = true;

jobRole.addEventListener('change', (event) => {
  if (event.target.value == 'other') {
  	otherJobRole.style.display = 'block';
  }
  else {
  	otherJobRole.style.display = 'none';
  }
});

Design.addEventListener('change', (event) => {
	Color.disabled = false;
	var i;
	for (i = 0; i < colorOptions.length; i++) {
	  var value = event.target.value;
	  var dataTheme = colorOptions[i].getAttribute("data-theme");
	  if (value == dataTheme) {
	  	colorOptions[i].hidden = false;
	  	colorOptions[i].selected = true;
	  } else {
	  	colorOptions[i].hidden = true;
	  	colorOptions[i].selected = false;
	  }
	}
});

Register.addEventListener('change', (event) => {
	var dataCost = parseInt(event.target.getAttribute("data-cost"));
	if (event.target.checked == true) {
		Cost = Cost + dataCost;
	} else {
		Cost = Cost - dataCost;
	}
	costText.innerHTML = "Total: $" + Cost;
});

Payment.addEventListener('change', (event) => {
	if (event.target.value == 'paypal') {
		Paypal.hidden = false;
		Bitcoin.hidden = true;
		creditCard.hidden = true;
	} else if (event.target.value == 'bitcoin') {
		Paypal.hidden = true;
		Bitcoin.hidden = false;
		creditCard.hidden = true;
	} else if (event.target.value == 'credit-card') {
		Paypal.hidden = true;
		Bitcoin.hidden = true;
		creditCard.hidden = false;
	}
});