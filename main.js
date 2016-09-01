
		



var personalData = {};

function personalDataHandler () {
	var formList0 = document.forms[0];
	personalData.height = +formList0.height.value;
	personalData.weight = +formList0.weight.value;
	personalData.age = +formList0.age.value;
	personalData.sex = formList0.sex.value;
	personalData.formula = formList0.formula.value;
	personalData.target = formList0.target.value;
	personalData.activity_level = +formList0.activity_level.value;

	
	for (var key in personalData) {
		console.log(key + " : " + personalData[key])
	}
	var activ_target = personalData.target*personalData.activity_level;
	var voo = 0;
	function calculateCalories () {
		if (personalData.sex == 'woman' && personalData.formula == 'HB') {
			var voo = (655.1 + 9.6 * personalData.weight + 1.85 * personalData.height - 4.68 * personalData.age) 
			* activ_target;

		} else if (personalData.sex == 'man' && personalData.formula == 'HB') {
			voo = (66.47 + 13.75 * personalData.weight + 5.00 * personalData.height - 6.74 * personalData.age) 
			* activ_target;

		} else if (personalData.sex == 'woman' && personalData.formula == 'MJ') {
			voo = (9.99 * personalData.weight + 6.25 * personalData.height - 4.92 * personalData.age - 161) 
			* activ_target;

		} else if (personalData.sex == 'man' && personalData.formula == 'MJ') {
			voo = (9.99 * personalData.weight + 6.25 * personalData.height - 4.92 * personalData.age + 5) 
			* activ_target;

		}
		var calories = document.getElementById('result');
		var amount_cal = document.getElementById('amount_cal');
		var amount_prot = document.getElementById('amount_prot'); 
		var amount_fat = document.getElementById('amount_fat');
		var amount_carb = document.getElementById('amount_carb');

		calories.innerHTML = Math.round(voo) + ' ккал';
		amount_cal.innerHTML = Math.round(voo);
		amount_prot.innerHTML = Math.round(voo*0.4/4.1);
		amount_fat.innerHTML = Math.round(voo*0.15/9.3);
		amount_carb.innerHTML = Math.round(voo*0.45/4.1);


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

var navigation = document.getElementById("menu");
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
	var newProduct = {
		name:'',
		calories:0,
		proteins:0,
		fats:0,
		carbohydrates:0 ,
		group:'',
		weight:0 
	};
	var formList1 = document.forms[1].elements;
	newProduct.name = formList1.name.value;
	newProduct.calories = +formList1.calories.value;
	newProduct.proteins = +formList1.proteins.value;
	newProduct.fats = +formList1.fats.value;
	newProduct.carbohydrates = +formList1.carbohydrates.value;
	newProduct.group = formList1.group.value;
	newProduct.weight = 100;
	var body = JSON.stringify(newProduct);

	console.log(body);
	
	addpr.open('POST', 'http://localhost:8000/product', true);
	addpr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	addpr.onreadystatechange = function() {
		if (this.readyState != 4) return;
		console.log( this.responseText );
	}
	addpr.send(body);

	function clerForm() {
		for (let i=1; i<formList1.length;i++) {
			formList1[i].value = '';
		}
	};
	clerForm();
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