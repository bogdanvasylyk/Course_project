

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
};


var button = document.getElementById("calcButton");
button.addEventListener("click", personalDataHandler);
