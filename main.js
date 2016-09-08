var personalData = {};
var calculatedParam = {
    calories: 0,
    proteins: 0,
    fats: 0,
    carbohydrates: 0

};
var sex = "";
function personalDataHandler() {
    var formList0 = document.forms[0];
    Object.assign(personalData, {
        height: +formList0.height.value,
        weight: +formList0.weight.value,
        age: +formList0.age.value,
        sex: formList0.sex.value,
        formula: formList0.formula.value,
        target: formList0.target.value,
        activity_level: +formList0.activity_level.value,
    });

    if (personalData.sex == 'woman') {
    	sex = "sister!"
    } else {
    	sex = "bro!"
    };

    for (var key in personalData) {
        console.log(key + " : " + personalData[key])
    }
    var activ_target = personalData.target * personalData.activity_level;
    var voo = 0;
    var calories = document.getElementById('result');
    if (personalData.height == 0 || personalData.weight == 0 || personalData.age == 0 || isNaN(personalData.height) || isNaN(personalData.weight) || isNaN(personalData.age)) {
        validate();
    } else calculateCalories();

    function validate() {
        calories.innerHTML = "Введіть коректні дані.."
    };

    function calculateCalories() {
        if (personalData.sex == 'woman' && personalData.formula == 'HB') {
            var voo = (655.1 + 9.6 * personalData.weight + 1.85 * personalData.height - 4.68 * personalData.age) * activ_target;

        } else if (personalData.sex == 'man' && personalData.formula == 'HB') {
            voo = (66.47 + 13.75 * personalData.weight + 5.00 * personalData.height - 6.74 * personalData.age) * activ_target;

        } else if (personalData.sex == 'woman' && personalData.formula == 'MJ') {
            voo = (9.99 * personalData.weight + 6.25 * personalData.height - 4.92 * personalData.age - 161) * activ_target;

        } else if (personalData.sex == 'man' && personalData.formula == 'MJ') {
            voo = (9.99 * personalData.weight + 6.25 * personalData.height - 4.92 * personalData.age + 5) * activ_target;

        }

        var amount_cal = document.getElementById('amount_cal');
        var amount_prot = document.getElementById('amount_prot');
        var amount_fat = document.getElementById('amount_fat');
        var amount_carb = document.getElementById('amount_carb');

        Object.assign(calculatedParam, {
            calories: Math.round(voo),
            proteins: Math.round(voo * 0.4 / 4.1),
            fats: Math.round(voo * 0.15 / 9.3),
            carbohydrates: Math.round(voo * 0.45 / 4.1),
        });

        var cc = calculatedParam.calories;
        var cp = calculatedParam.proteins;
        var cf = calculatedParam.fats;
        var cca = calculatedParam.carbohydrates;
        calories.innerHTML = calculatedParam.calories + ' ккал';
        amount_cal.innerHTML = calculatedParam.calories;
        amount_prot.innerHTML = calculatedParam.proteins;
        amount_fat.innerHTML = calculatedParam.fats;
        amount_carb.innerHTML = calculatedParam.carbohydrates;
    };
};

var button = document.getElementById("calcButton");
button.addEventListener("click", personalDataHandler);
console.log(personalData);

// переключання меню		
var pageStatus = 'consumedProducts';
var tableCreated = false;

function changePage(event) {
    var productTable = document.getElementById("productTable");
    var consumedProducts = document.getElementById("consumedProducts");
    var addProduct = document.getElementById("addProduct");
    var navTable = document.getElementById("navTable");
    var navProducts = document.getElementById("navProducts");
    var navAddProduct = document.getElementById("navAddProduct");

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
            var table = document.getElementById('table1');
            console.log(productDb[0].name);
            productDb.forEach(function(item, i, productDb) {
                var newRow = document.createElement('tr');
                newRow.className = 'tr';

                function createCell(i, className, content) {
                    var newCell = newRow.insertCell(i);
                    newCell.className = className;
                    newCell.innerHTML = content;
                };
                createCell(0, 'name', item.name);
                createCell(1, 'calories', item.calories);
                createCell(2, 'proteins', item.proteins);
                createCell(3, 'fats', item.fats);
                createCell(4, 'carbohydrates', item.carbohydrates);
                createCell(5, 'group', item.group);
                createCell(6, 'weight', item.weight);
                table.appendChild(newRow)
            });
        }
    };
    products.open('GET', 'http://localhost:8000/product', true);
    products.send();
};

var tableCreator = document.getElementById("navTable");
tableCreator.addEventListener("click", loadProducts);

function addProduct() {
    var addpr = new XMLHttpRequest();
    var newProduct = {
        name: '',
        calories: 0,
        proteins: 0,
        fats: 0,
        carbohydrates: 0,
        group: '',
        weight: 0
    };
    var formList1 = document.forms[1].elements;
    Object.assign(newProduct, {
        name: formList1.name.value,
        calories: +formList1.calories.value,
        proteins: +formList1.proteins.value,
        fats: +formList1.fats.value,
        carbohydrates: +formList1.carbohydrates.value,
        group: formList1.group.value,
        weight: 100,
    });
    var body = JSON.stringify(newProduct);
    console.log(body);
    addpr.open('POST', 'http://localhost:8000/product', true);
    addpr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    addpr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        console.log(this.responseText);
    }
    addpr.send(body);

    function clearForm() {
        for (let i = 1; i < formList1.length; i++) {
            formList1[i].value = '';
        }
    };
    clearForm();
};
addProductButton = document.getElementById("addProductButton");
addProductButton.addEventListener('click', addProduct);

var productsSearched = [];

function loadProductsСonsumption() {
    

    var products = new XMLHttpRequest();
    products.onreadystatechange = function() {
        if (products.readyState == 4 && products.status == 200) {
            var response = products.responseText;
            productDb = JSON.parse(response);
            clearTable();
            var search = document.getElementById('productName').value;
            search = search.toLowerCase();

            productsSearched = [];

            searchProducts();
            function searchProducts() {
                for (var i = 0; i < productDb.length; i++) {
                    if (productDb[i].name.toLowerCase().indexOf(search) > -1) {
                        productsSearched.push(productDb[i]);
                    }
                };
            };

            var table = document.querySelector('#tableConsum');
            productsSearched.forEach(function(item, i, productDb) {
                var newRow = document.createElement('tr');
                newRow.className = 'trSearch';

                function createCell(i, className, content) {
                    var newCell = newRow.insertCell(i);
                    newCell.className = className;
                    newCell.innerHTML = content;
                };
                createCell(0, 'name', item.name);
                createCell(1, 'calories', item.calories);
                createCell(2, 'proteins', item.proteins);
                createCell(3, 'fats', item.fats);
                createCell(4, 'carbohydrates', item.carbohydrates);
                createCell(5, 'group', item.group);
                createCell(6, 'weight', '<input type="number" class="inputTable" value="100">');
                createCell(7, 'addButton1', `<button class="addButton" id="${item._id}">+</button>`);
                table.appendChild(newRow);
            });

        }
    };
    products.open('GET', 'http://localhost:8000/product', true);
    products.send();
};

function clearTable() {
    var tableRow = document.querySelectorAll('.trSearch');
    for (var i = 0; i < tableRow.length; i++) {
        tableRow[i].remove();
    }

};

searchProductButton = document.getElementById("searchProductButton");
searchProductButton.addEventListener('click', loadProductsСonsumption);
productName = document.getElementById("productName");
productName.addEventListener('change', loadProductsСonsumption);

var consumedProductsObject = {
    calories: 0,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    weight: 0
};

var consumedFood = [];

function addFood(event) {
    function check() {
        if (event.target.className == 'addButton' & calculatedParam.calories > 0) {
            searchID();
            editProgres();
        } else return;
    };

    check();

    function searchID() {
        var id = event.target.id;
        var table3 = document.getElementById('tableEatenProducts');
        var foodWeight = +event.target.parentNode.previousElementSibling.firstElementChild.value;
        console.log(foodWeight)
        for (var i = 0; i < productsSearched.length; i++) {
            let product = productsSearched[i];
            if (product._id.indexOf(id) > -1) {
                console.log(consumedProductsObject);

                function calc(productProper) {
                    return productProper / 100 * foodWeight;
                };
                Object.assign(consumedProductsObject, {
                    weight: consumedProductsObject.weight + foodWeight,
                    calories: consumedProductsObject.calories + calc(product.calories),
                    proteins: consumedProductsObject.proteins + calc(product.proteins),
                    fats: consumedProductsObject.fats + calc(product.fats),
                    carbohydrates: consumedProductsObject.carbohydrates + calc(product.carbohydrates),
                });
                var eatenProduct = {
                    name: product.name,
                    calories: Math.round(calc(product.calories)),
                    proteins: Math.round(calc(product.proteins)),
                    fats: Math.round(calc(product.fats)),
                    carbohydrates: Math.round(calc(product.carbohydrates)),
                    group: product.group,
                    weight: foodWeight,

                };
                
                consumedFood.push(eatenProduct);
                addEatenFood (eatenProduct);

                function addEatenFood () {
                    var newRow = document.createElement('tr');
                    newRow.className = 'trSecondTable';
                    function createCell(i, className, content) {
                        var newCell = newRow.insertCell(i);
                        newCell.className = className;
                        newCell.innerHTML = content;
                    };
                    createCell(0, 'name', eatenProduct.name);
                    createCell(1, 'calories', eatenProduct.calories);
                    createCell(2, 'proteins', eatenProduct.proteins);
                    createCell(3, 'fats', eatenProduct.fats);
                    createCell(4, 'carbohydrates', eatenProduct.carbohydrates);
                    createCell(5, 'group', eatenProduct.group);
                    createCell(6, 'weight', `${eatenProduct.weight} гр`);
                    table3.appendChild(newRow);
                };
                console.log(product._id.indexOf(id));
                console.log(consumedProductsObject);
            };
        };

    };

    function editProgres() {
        var percent_cal = document.getElementById("percent_cal");
        var percent_prot = document.getElementById("percent_prot");
        var percent_fat = document.getElementById("percent_fat");
        var percent_carb = document.getElementById("percent_carb");
        var progres_cal = percent_cal.previousElementSibling;
        var progres_prot = percent_prot.previousElementSibling;
        var progres_fat = percent_fat.previousElementSibling;
        var progres_carb = percent_carb.previousElementSibling;
        var perCal = Math.round(consumedProductsObject.calories / calculatedParam.calories * 100);
        var perProt = Math.round(consumedProductsObject.proteins / calculatedParam.proteins * 100);
        var perFat = Math.round(consumedProductsObject.fats / calculatedParam.fats * 100);
        var perCarb = Math.round(consumedProductsObject.carbohydrates / calculatedParam.carbohydrates * 100);
        percent_cal.innerHTML = perCal;
        percent_prot.innerHTML = perProt;
        percent_fat.innerHTML = perFat;
        percent_carb.innerHTML = perCarb;
        progres_cal.value = perCal;
        progres_prot.value = perProt;
        progres_fat.value = perFat;
        progres_carb.value = perCarb;

        alert();

        function alert () {

	        var headerAlert = document.getElementById('alert');
	        if (perCal>100) {
	        	headerAlert.className = '';
	        	headerAlert.firstElementChild.innerHTML = "Стоп! Стоп! Стоп! На сьогодні вистачить!!";
	        } else if (perFat>100) {	        	
	        	headerAlert.className = '';
	        	headerAlert.firstElementChild.innerHTML = `Поменше жиру, ${sex}`;
	        } else if (perCarb>100) {	        	
	        	headerAlert.className = '';
	        	headerAlert.firstElementChild.innerHTML = "Цукор - ворог твій!!!";
	        };
		};



    };
};


var table = document.getElementById('tableConsum');
table.addEventListener('click', addFood);
