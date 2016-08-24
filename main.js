

var personalData = {

};

function personalDataHandler () {
	personalData.height = +document.forms[0].elements.height.value;
	personalData.weight = +document.forms[0].elements.weight.value;
	personalData.age = +document.forms[0].elements.age.value;
	personalData.sexWoman = document.getElementById('sexWoman').checked;
	personalData.sexMan = document.getElementById('sexMan').checked;	
	personalData.formulaHB = document.getElementById('Harris-ben').checked;
	personalData.formulaMJ = document.getElementById('Mifflin-jeor').checked;

	function takeTarget () {
		var target = document.getElementsByName('target')
		if(target[0].checked){
		return personalData.target = 0.85;		
		 }
		if(target[1].checked){
		return personalData.target = 1;
		 }
		if(target[2].checked){
		return personalData.target = 1.15;
		 };
	};
takeTarget();

	function takeActivityLevel () {
	var select = document.forms[0].elements.activity_level;
	for (var i = 0; i < select.options.length; i++) {
	  var option = select.options[i];
	  if(option.selected) {
	  	personalData.activity_level = option.value;
	  	}
	  }
	  return personalData.activity_level;
	};
takeActivityLevel();

for (var key in personalData) {

	console.log(key + " : " + personalData[key])

	}

	var voo = 0
	function calculateCalories () {
	if (personalData.sexWoman == true && personalData.formulaHB == true) {
		var voo = (655.1 + 9.6 * personalData.weight + 1.85 * personalData.height - 4.68 * personalData.age) * personalData.activity_level * personalData.target;
		return console.log(voo);
	} else if (personalData.sexMan == true && personalData.formulaHB == true) {
		voo = (66.47 + 13.75 * personalData.weight + 5.00 * personalData.height - 6.74 * personalData.age) * personalData.activity_level * personalData.target;
		return console.log(voo);
	} else if (personalData.sexWoman == true && personalData.formulaMJ == true) {
		voo = (9.99 * personalData.weight + 6.25 * personalData.height - 4.92 * personalData.age - 161) * personalData.activity_level * personalData.target;
		return console.log(voo);
	} else if (personalData.sexMan == true && personalData.formulaMJ == true) {
		voo = (9.99 * personalData.weight + 6.25 * personalData.height - 4.92 * personalData.age + 5) * personalData.activity_level * personalData.target;
		return console.log(voo);
	}
	
	};
	calculateCalories();

};


var button = document.getElementById("calcButton");
button.addEventListener("click", personalDataHandler);
console.log(personalData);