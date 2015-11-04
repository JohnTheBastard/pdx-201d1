/* * * * * * * * * * * * *
 * DONUT SHOP            *
 * Created by John Hearn *
 * CF201       Fall 2015 *
 * * * * * * * * * * * * */

//(function() {
    // maybe some day
    //'use strict';

    var defaultInput = [ [ "Downtown",         8, 43, 4.50 ],
			 [ "Capitol Hill",     4, 37, 2.00 ],
			 [ "South Lake Union", 9, 23, 6.33 ],
			 [ "Wedgewood",        2, 28, 1.25 ],
			 [ "Ballard",          8, 58, 3.75 ],
			 [ "Portland",         8, 43, 4.50 ],
			 [ "Vancouver",        9, 23, 6.33 ],
			 [ "Salem",            2, 28, 1.25 ],
			 [ "Eugene",           8, 58, 3.75 ],
			 [ "Medford",          4, 37, 2.00 ] ];

    var franchises = [];
    
    // These are helper functions for my prototype.
    // They should go away once I understand function factories (I think).
    var uniqueness = function(myFranchise) {
	// Make sure our franchise location doesn't already exist.
	// (I hate that I have to do it like this, but JavaScript sucks.)
	for (var ii=0; ii < franchises.length; ii++) {
	    if ( myFranchise.location == franchises[ii].location ) {
		return false;
	    }
	}
	return true;
    }

    var getIndex = function(myFranchise) {
	for (var ii=0; ii < franchises.length; ii++) {
	    if ( myFranchise.location == franchises[ii].location ) {
		return ii;
	    }
	}
    }

    var pushFranchise = function(myFranchise) {
	if (myFranchise.isUnique()) {
	    franchises.push(myFranchise);
	} else {
	    var preexistingIndex = getIndex(myFranchise);
	    franchises[preexistingIndex].minCPH = myFranchise.minCPH;
	    franchises[preexistingIndex].maxCPH = myFranchise.maxCPH;
	    franchises[preexistingIndex].avgDonutsPC = myFranchise.avgDonutsPC;	    
	}
	return;
    }
    
    var getCustomerVolume = function(max, min) {
	// Fix the rounding tomorrow.
	return Math.floor( Math.random() * (max - min) + 1) + min;
    }

    var getHourlySales = function(donutsPerCustomer, customerVolume) {
	return Math.ceil( donutsPerCustomer * customerVolume );
    }
    
    var makeRow = function(myFranchise) {
	var row = "<tr>";
	var cell = "";
	var salesTotal = 0;

	// Fill the location cell
	cell = "<td>" + myFranchise.location + "</td>";
	row += cell;
	
	// Fill the hourly cells
	for (var jj=0; jj < 11; jj++) {
	    var cellValue = myFranchise.hourOfDonutSales();
	    salesTotal += cellValue;
	    cell = "<td>" + cellValue + "</td>";
	    row += cell;
	}
	
	// Fill the total cell and close the row
	cell = "<td>" + salesTotal + "</td>";
	row += cell;
	row += "</tr>";

	return row;
    }
    
    var populateFranchiseArray = function(myFranchiseArray) {
	for(var ii=0; ii < myFranchiseArray.length; ii++) {
	    var franchise = new Franchise( myFranchiseArray[ii][0],
					   myFranchiseArray[ii][1],
					   myFranchiseArray[ii][2],
					   myFranchiseArray[ii][3] );
	    pushFranchise(franchise);
	}
    }
    var populateTable = function(table) {
	for (var ii=0; ii < franchises.length; ii++) {
	    table.innerHTML += franchises[ii].generateTableRow();
	}
    }

    // This gets called from HTML
    var addUserInput = function() {
	var loc = document.getElementById('location').value; 
	var min = document.getElementById('minCPH').value; 
	var max = document.getElementById('maxCPH').value; 
	var avg = document.getElementById('avgDPC').value;
	var userFranchise = new Franchise(loc, min, max, avg);
	pushFranchise(userFranchise);
    }

    
    // Franchise constructor
    function Franchise(location, minimum, maximum, average) {
	this.location = location;
	this.minCPH = minimum;
	this.maxCPH = maximum;
	this.avgDonutsPC = average;

	// Prototype methods
	// (this is suppsed to be equivalent to the prototype
	// declarations below, but it's breaking things.
/*
	isUnique: function isUnique() {
	    return uniqueness(this);
	}
	randomizedCustomerVolume: function randomizedCustomerVolume() {
	    return getCustomerVolume(this.maxCPH, this.minCPH);
	}
	hourOfDonutSales: function hourOfDonutSales() {
	    return getHourlySales(this.avgDonutsPC, this.randomizedCustomerVolume() );
	}
	generateTableRow: function generateTableRow() {
	    return makeRow(this);
	}
*/
    }

    Franchise.prototype.isUnique = function() {
	return uniqueness(this);
    }
    Franchise.prototype.randomizedCustomerVolume = function() {
	return getCustomerVolume(this.maxCPH, this.minCPH);
    }
    Franchise.prototype.hourOfDonutSales = function() {
	return getHourlySales(this.avgDonutsPC, this.randomizedCustomerVolume() );
    }
    Franchise.prototype.generateTableRow = function() {
	return makeRow(this);
    }
   

    /***** Stuff Actually Happens *****/
    
    populateFranchiseArray(defaultInput);
    populateTable( document.getElementById("table") );
    
//})();



