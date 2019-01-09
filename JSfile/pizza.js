//get receipt function
function getReceipt() {
	// This initializes our string so it can get passed from  
	// function to function, growing line by line into a full receipt
	var text1 = "<h3>You Ordered: </h3>";
	var runningTotal = 0.00;
	var sizeTotal = 0.00;
	var numToppings = 0;
	var sizeArray = document.getElementsByClassName("size");
	var cheeseArray = document.getElementsByClassName("cheese");
	var breadArray = document.getElementsByClassName("crust");
	var sauceArray = document.getElementsByClassName("sauce");
	var selectedSize;
	var selectedBread;
	var selectedCheese;
	var selectedSauce;
	//else statements are there incase there are no 
	for (var i = 0; i < sizeArray.length; i++) {
		if (sizeArray[i].checked) {
			selectedSize = sizeArray[i].value;
		} 
	}
	for (var j = 0; j < breadArray.length; j++) {
		if (breadArray[j].checked) {
			selectedBread = breadArray[j].value;
		} 	
	}
	for (var k = 0; k < cheeseArray.length; k++) {
		if (cheeseArray[k].checked) {
			selectedCheese = cheeseArray[k].value;
		} 
	}
	for (var l = 0; l < sauceArray.length; l++) {
		if (sauceArray[l].checked) {
			selectedSauce = sauceArray[l].value;
		}
	}
	
	text1 = text1+selectedSize+" pizza with "+selectedCheese+" cheese with the "+selectedBread+" crust and "+selectedSauce+" sauce."+"<br>";
	
	if (selectedSize === "Personal") {
		sizeTotal += 5.00;
	} else if (selectedSize === "Small") {
		sizeTotal += 8.00;
	} else if (selectedSize === "Medium") {
		sizeTotal += 12.00;
	} else if (selectedSize === "Large") {
		sizeTotal += 18.00;
	} else if (selectedSize === "Extra Large") {
		sizeTotal += 22.00;
	} if (selectedCheese === "Extra") {
		sizeTotal *= 1.1;
	} if (selectedBread === "Vegan") {
		sizeTotal *= 1.5;
	} else if (selectedBread === "Cheese Stuffed") {
		sizeTotal *= 1.2;
	} if (selectedSauce === "None") {
		sizeTotal *= 0.9;
	} else {
		sizeTotal += 0;
	}
	
	runningTotal = sizeTotal;
	console.log(selectedSize+" = $"+sizeTotal+".00");
	console.log("size text1: "+text1);
	console.log("subtotal: $"+runningTotal+".00");
	
	//function call for get toppings
	getToppings(selectedSize, selectedCheese, selectedBread, selectedSauce, runningTotal, text1); 
};	

// With both the meat and veggie functions each item in the array will be
// 1 dollar but the first is going to be free so we can count the total
// of items in their array and subtract 1 to get the total item cost
//
// Now we can add the item cost to our running total to get the new
// running total and then pass this new running total to the next function
// Just keep up this process until we've added all items to the running total
function getToppings(selectedSize, selectedCheese, selectedBread, selectedSauce, runningTotal, text1) {
	//the selected variables are used in the receipt function call
	var toppingTotal = 0;
	var selectedMeat = [];
	var selectedVeg = [];
	var meatArray = document.getElementsByClassName("meats");
	var vegArray = document.getElementsByClassName("veg");
	
	for (var m = 0; m < meatArray.length; m++) {
		if (meatArray[m].checked) {
			selectedMeat.push(meatArray[m].value);
			console.log("selected meat item: ("+meatArray[m].value+")");
			text1 = text1+meatArray[m].value+"<br>";
		}
	}
	for (var v = 0; v < vegArray.length; v++) {
		if (vegArray[v].checked) {
			selectedVeg.push(vegArray[v].value);
			console.log("selected meat item: ("+vegArray[v].value+")");
			text1 = text1+vegArray[v].value+"<br>";
		}
	}
	var meatCount = selectedMeat.length;
	var vegCount = selectedVeg.length;
	var toppingCount = (meatCount + vegCount);
	if (vegCount > 1 || meatCount > 1) {
		toppingTotal = (toppingCount - 1);
	} else {
		toppingTotal = 0;
	}
	
	runningTotal = (runningTotal + toppingTotal);
	console.log("total selected topping items: "+toppingCount);
	console.log(toppingCount+" topping - 1 free topping = "+"$"+toppingTotal+"<br>");
	console.log("topping text1: "+text1);
	runningTotal = runningTotal.toFixed(2);
	console.log("Purchase Total: "+"$"+runningTotal);
	document.getElementById("showText").innerHTML=text1;
	document.getElementById("totalPrice").innerHTML = "<h3>Total: <strong>$"+runningTotal+"</strong></h3>";
	//call the receipt function
	displayRecipt(selectedSize, selectedCheese, selectedBread, selectedSauce, selectedMeat, selectedVeg, runningTotal);
};

function displayRecipt(selectedSize, selectedCheese, selectedBread, selectedSauce, selectedMeat, selectedVeg, runningTotal) {
	//initializing numerical variables from the start to avoid any trouble
	var receiptString = "HERE'S YOUR ORDER FROM SHARATH'S PIZZA KITCHEN: <br><br>";
	document.getElementById("receipt").innerHTML=receiptString;
	console.log("<br><br> HERE'S YOUR ORDER FROM SHARATH'S PIZZA KITCHEN: <br>");
	if (selectedSize === "Personal") {
		receiptString = (receiptString + "Personal Pizza:       $5.00 <br>");
	} else if (selectedSize === "Small") {
		receiptString = (receiptString + "Small Pizza:          $8.00 <br>");
	} else if (selectedSize === "Medium") {
		receiptString = (receiptString + "Medium Pizza:         $12.00 <br>");
	} else if (selectedSize === "Large") {
		receiptString = (receiptString + "Large Pizza:          $18.00 <br>");
	} else if (selectedSize === "Extra Large") {
		receiptString = (receiptString + "ExtraLarge Pizza:     $22.00 <br>");
	} if (selectedCheese === "Extra") {
		receiptString = (receiptString + "Extra Cheese:         10% fee <br>");
	} if (selectedSauce === "None") {
		receiptString = (receiptString + "No Sauce:             10% discount <br>");
	} if (selectedBread === "Cheese Stuffed") {
		receiptString = (receiptString + "Cheese Stuffed Crust: 20% fee <br>");
	} if (selectedBread === "Vegan") {
		receiptString = (receiptString + "Vegan Crust:          40% fee <br>");
	} else {
		receiptString = (receiptString + "Everything else included <br>");
	}
	
	console.log("selectedSize: " +selectedSize
	+ "Cbeese: " + selectedCheese + "<br>"
	+ "Bread: " + selectedBread + "<br>"
	+ "Sauce: " + selectedSauce + "<br>"
	+ "Meat: " + selectedMeat + "<br>"
	+ "Veg: " + selectedVeg + "<br>")
	if (selectedSize === "Personal") {
		console.log("Personal Pizza:       $5.00 <br>");
	} else if (selectedSize === "Small") {
		console.log("Small Pizza:          $8.00 <br>");
	} else if (selectedSize === "Medium") {
		console.log("Medium Pizza:         $12.00 <br>");
	} else if (selectedSize === "Large") {
		console.log("Large Pizza:          $18.00 <br>");
	} else if (selectedSize === "Extra Large") {
		console.log("Extra Large Pizza:    $22.00 <br>");
	} if (selectedCheese === "Extra") {
		console.log("Extra Cheese:         10% fee <br>");
	} if (selectedSauce === "None") {
		console.log("No Sauce:             10% discount <br>");
	} if (selectedBread === "Cheese Stuffed") {
		console.log("Cheese Stuffed Crust: 20% fee <br>");
	} if (selectedBread === "Vegan") {
		console.log("Vegan Crust:          40% fee <br>");
	} else {
		console.log("Everything else included <br>");
	}
	
	var n = selectedMeat.length;
	var q = selectedVeg.length;
	if (selectedMeat !== []) {
			receiptString = (receiptString + selectedMeat + "       $"+n.toFixed(2)+"<br>");     
	}
	if (selectedVeg !== []) {
			receiptString = (receiptString + selectedVeg + "       $"+q.toFixed(2)+"<br>");
	}
	
	receiptString = (receiptString + "Free topping: -$1.00 <br><br>");
	receiptString = (receiptString + "Your total is: $"+runningTotal+"<br><br>");
	document.getElementById("receipt").innerHTML=receiptString;
	
};