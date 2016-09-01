
		



var personalData = {};

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
			return 0.85;		
		}
		if(target[1].checked){
			return 1;
		}
		if(target[2].checked){
			return 1.15;
		};
	};
	personalData.target = takeTarget ();

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
			var voo = (655.1 + 9.6 * personalData.weight + 1.85 * personalData.height - 4.68 * personalData.age) * personalData.activity_level * takeTarget();

		} else if (personalData.sexMan == true && personalData.formulaHB == true) {
			voo = (66.47 + 13.75 * personalData.weight + 5.00 * personalData.height - 6.74 * personalData.age) * personalData.activity_level * takeTarget();

		} else if (personalData.sexWoman == true && personalData.formulaMJ == true) {
			voo = (9.99 * personalData.weight + 6.25 * personalData.height - 4.92 * personalData.age - 161) * personalData.activity_level * takeTarget();

		} else if (personalData.sexMan == true && personalData.formulaMJ == true) {
			voo = (9.99 * personalData.weight + 6.25 * personalData.height - 4.92 * personalData.age + 5) * personalData.activity_level * takeTarget();

		}
		var calories = document.getElementById('result');
		var amount_cal = document.getElementById('amount_cal');
		calories.innerHTML = Math.round(voo);
		amount_cal.innerHTML = Math.round(voo);

		var amount_prot = document.getElementById('amount_prot'); 
		var amount_fat = document.getElementById('amount_fat');
		var amount_carb = document.getElementById('amount_carb');
		amount_prot.innerHTML = Math.round(voo*0.4/4.1);
		amount_fat.innerHTML = Math.round(voo*0.15/9.3);
		amount_carb.innerHTML = Math.round(voo*0.45/4.1 );


	};
	calculateCalories();

};


var button = document.getElementById("calcButton");
button.addEventListener("click", personalDataHandler);
console.log(personalData);

// переключання меню		
var pageStatus = 'consumedProducts';
var tableCreated = false;

function changePage (event) {
	var productTable = document.querySelector("#productTable");
	var consumedProducts = document.querySelector("#consumedProducts");
	var addProduct = document.querySelector("#addProduct");
	var navTable = document.querySelector("#navTable");
	var navProducts = document.querySelector("#navProducts");
	var navAddProduct = document.querySelector("#navAddProduct");


	console.log(productTable.className);
	console.log(consumedProducts.className);
	console.log(addProduct.className);
	console.log(event.target.id);

	if (event.target.id == "navTable") {
		console.log("таблиця");
		productTable.className = "";
		consumedProducts.className = "hidden";
		addProduct.className = "hidden";
		navTable.className = "active";
		navProducts.className = "";
		navAddProduct.className = "";
		pageStatus = 'productTable';
		tableCreated = true;
	} else if (event.target.id == "navProducts") {
		console.log("Схавані продукти");
		productTable.className = "hidden";
		consumedProducts.className = "";
		addProduct.className = "hidden";
		navTable.className = "";
		navProducts.className = "active";
		navAddProduct.className = "";
		pageStatus = 'consumedProducts';
	} else if (event.target.id == "navAddProduct") {
		console.log("додати продукт");
		productTable.className = "hidden";
		consumedProducts.className = "hidden";
		addProduct.className = "";	
		navTable.className = "";
		navProducts.className = "";
		navAddProduct.className = "active";
		pageStatus = 'addProduct';
	} else console.log("ніхуя")

};	

var navigation = document.getElementById("navbar");
navigation.addEventListener("click", changePage);

// відображення таблиці
var productDb = {};


function loadProducts() {

	if (tableCreated == true) 
		return;

	var products = new XMLHttpRequest();
	products.onreadystatechange = function() {
		if (products.readyState == 4 && products.status == 200) {
			var response = products.responseText;
			productDb = JSON.parse(response);
			var table = document.querySelector('#table1');
			productDb.forEach(function(item, i, productDb) {
				var newRow = document.createElement('tr');
				newRow.className = 'tr';				
				var newCell = newRow.insertCell(0);
				newCell.className = 'name';
				newCell.innerHTML = item.name;

				var newCell = newRow.insertCell(1);
				newCell.className = 'calories';
				newCell.innerHTML = item.calories;

				var newCell = newRow.insertCell(2);
				newCell.className = 'proteins';
				newCell.innerHTML = item.proteins;

				var newCell = newRow.insertCell(3);
				newCell.className = 'fats';
				newCell.innerHTML = item.fats;

				var newCell = newRow.insertCell(4);
				newCell.className = 'carbohydrates';
				newCell.innerHTML = item.carbohydrates;

				var newCell = newRow.insertCell(5);
				newCell.className = 'group';
				newCell.innerHTML = item.group;

				var newCell = newRow.insertCell(6);
				newCell.className = 'weight';
				newCell.innerHTML = item.weight;
				table.appendChild(newRow)

			});
		}
	};
	products.open('GET', 'http://localhost:8000/product', true);
	products.send();



};

var tableCreator = document.getElementById("navTable");
tableCreator.addEventListener("click", loadProducts);





function addProduct () {
	var addpr = new XMLHttpRequest();
	var NewProduct = {
		name:'',
		calories:0,
		proteins:0,
		fats:0,
		carbohydrates:0 ,
		group:'',
		weight:0 
	};
	NewProduct.name = document.getElementById('name').value;
	NewProduct.calories = +document.getElementById('calories').value;
	NewProduct.proteins = +document.getElementById('proteins').value;
	NewProduct.fats = +document.getElementById('fats').value;
	NewProduct.carbohydrates = +document.getElementById('carbohydrates').value;
	NewProduct.group = document.getElementById('group').value;
	NewProduct.weight = +document.getElementById('weight').value;
	var body = JSON.stringify(NewProduct);

	console.log(body);
	
	addpr.open('POST', 'http://localhost:8000/product', true);
	addpr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	addpr.onreadystatechange = function() {
		if (this.readyState != 4) return;
		console.log( this.responseText );
	}
	addpr.send(body);


};

addProductButton = document.getElementById("addProductButton");
addProductButton.addEventListener('click', addProduct);

       	// var clear = document.querySelectorAll('td .addProductField');
       	// for (let i=0; i<clear.length; ++i) {
       	// 	clear[i].value = '';

	 // products.onreadystatechange = function() {

  //       if (products.readyState == 4 && products.status == 201) {

  //   		};
  //   	}
  
  //     products.open('POST', 'http://localhost:8000/product', true);
  //     products.send(body);
  //    