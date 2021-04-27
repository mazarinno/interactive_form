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
var Email = document.getElementById("email");
var cardNumber = document.getElementById("cc-num");
var zipCode = document.getElementById("zip");
var CVV = document.getElementById("cvv");
var Form = document.querySelector("form[action='index.html']");
var Boxes = document.querySelectorAll("input[type='checkbox']");

Name.focus();   // focuses on the name when the site is first loaded
otherJobRole.style.display = 'none';    // ensuring that the other job box is hidden
Color.disabled = true;   // the color option box is disabled and cannot be chosen from without choosing which t shirt is wanted
Paypal.hidden = true;   // other payment options are also hidden since credit card is the default choice
Bitcoin.hidden = true;
Payment.children[1].selected = true;  // this makes sure that credit card is the pre-selected payment method

// this event listens for the job role dropdown menu changing options, and if it is the other option, the text box will display
jobRole.addEventListener('change', (event) => {
  if (event.target.value == 'other') {
  	otherJobRole.style.display = 'block';
  }
  else {
  	otherJobRole.style.display = 'none';
  }
});

Design.addEventListener('change', (event) => {
	Color.disabled = false;   // once a design is selected, the user is then able to choose a color
	for (var i = 0; i < colorOptions.length; i++) {   // looping over the color options to make sure the right theme is shown
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
	var dataCost = parseInt(event.target.getAttribute("data-cost"));  // the data-cost is the price attached to each checkbox
	if (event.target.checked == true) {
		Cost = Cost + dataCost;  // cost is a variable preset to zero, so it gets updated automatically through this event listener
	} else {  // the else is for if the box is not checked, so its cost can be removed from the total
		Cost = Cost - dataCost;
	}
	costText.innerHTML = "Total: $" + Cost;   // then the actual HTML is updated
});

Payment.addEventListener('change', (event) => {
	if (event.target.value == 'paypal') {   // this event shows the payment selected and hides other possible options
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

// on form submit, this listener checks through all helper functions making sure they are valid
Form.addEventListener('submit', (event) => {
	nameValue = Name.value;
	emailValue = Email.value;

	if (nameCheck(nameValue) == false) {
		Name.parentElement.classList.add("not-valid");
		Name.parentElement.classList.remove("valid");
		Name.parentElement.lastElementChild.style.display = "block"; // error text is shown if incorrect
		event.preventDefault(); // the page does not refresh if any are invalid
	} else {
		Name.parentElement.classList.remove("not-valid");
		Name.parentElement.classList.add("valid"); // if correct, valid status is shown
		Name.parentElement.lastElementChild.style.display = "none"; // checkmark appears and error text is removed
	}

	if (emailCheck(emailValue) == false) {
		Email.parentElement.classList.add("not-valid");
		Email.parentElement.classList.remove("valid");
		Email.parentElement.lastElementChild.style.display = "block";
		event.preventDefault();
	} else {
		Email.parentElement.classList.remove("not-valid");
		Email.parentElement.classList.add("valid");
		Email.parentElement.lastElementChild.style.display = "none";
	}

	if (Cost == 0) {
		costText.parentElement.classList.add("not-valid");
		costText.parentElement.classList.remove("valid");
		costText.parentElement.lastElementChild.style.display = "block";
		event.preventDefault();
	} else {
		costText.parentElement.classList.remove("not-valid");
		costText.parentElement.classList.add("valid");
		costText.parentElement.lastElementChild.style.display = 'none';
	}

	if (creditCard.hidden == false) {
		if (cardCheck(cardNumber) == false) {
			cardNumber.parentElement.classList.add("not-valid");
			cardNumber.parentElement.classList.remove("valid");
			cardNumber.parentElement.lastElementChild.style.display = "block";
			event.preventDefault();
		} else {
			cardNumber.parentElement.classList.remove("not-valid");
			cardNumber.parentElement.classList.add("valid");
			cardNumber.parentElement.lastElementChild.style.display = 'none';
		}

		if (zipCheck(zipCode) == false) {
			zipCode.parentElement.classList.add("not-valid");
			zipCode.parentElement.classList.remove("valid");
			zipCode.parentElement.lastElementChild.style.display = "block";
			event.preventDefault();
		} else {
			zipCode.parentElement.classList.remove("not-valid");
			zipCode.parentElement.classList.add("valid");
			zipCode.parentElement.lastElementChild.style.display = 'none';
		}

		if (CVVCheck(CVV) == false) {
			CVV.parentElement.classList.add("not-valid");
			CVV.parentElement.classList.remove("valid");
			CVV.parentElement.lastElementChild.style.display = "block";
			event.preventDefault();
		} else {
			CVV.parentElement.classList.remove("not-valid");
			CVV.parentElement.classList.add("valid");
			CVV.parentElement.lastElementChild.style.display = 'none';
		}
	}
});

// this is the helper function that checks whether or not the name field is empty
function nameCheck(name) {
	if (name == '') {
		return false;
	} else {
		return true;
	}
}

// the email helper function tests if the inputted text isnt blank and fits within the email regex
function emailCheck(email) {
	valid = /^[^@\s]+@[^@\s]+\.com+$/;
	if (email == '') {
		return false;
	} else {
		if (valid.test(email) == true) {
			return true;
		} else {
			return false;
		}
	}
}

// card number helper function checks that the card length is valid
function cardCheck(card) {
	if (card.value.length == 13 || card.value.length == 16) {
		return true;
	}
	else {
		return false;
	}
}

// zip helper function checks that the zip code is a valid length
function zipCheck(zip) {
	if (zip.value.length == 5) {
		return true;
	} else {
		return false;
	}
}

// cvv function also checks if it is the valid length
function CVVCheck(cvv) {
	if (cvv.value.length == 3) {
		return true;
	} else {
		return false;
	}
}

// each box in the checkboxes variable is looped over, checking for focus and defocus events
Boxes.forEach(function(box) {
	box.addEventListener('focus', function() {
		box.parentElement.classList.add("focus");
  	});

	box.addEventListener('blur', function() {
		box.parentElement.classList.remove("focus");
  	});
});