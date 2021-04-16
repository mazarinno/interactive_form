var Name = document.getElementById("name");
var jobRole = document.getElementById("title");
var otherJobRole = document.getElementById("other-job-role");
var Design = document.getElementById("design");
var Color = document.getElementById("color");
var colorOptions = Color.children;

Name.focus();
otherJobRole.style.display = 'none';
Color.disabled = true;

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