/* * * * * * * * * * * * *
 * DONUT SHOP            *
 * Created by John Hearn *
 * CF201       Fall 2015 *
 * * * * * * * * * * * * */

var main = (function() {
    'use strict';
/*
    // Initial data set
    // (This doesn't actually work. Not properly instantiated.
    var franchises = [ { location    : "Downtown",
			 minCPH      : 8,
			 maxCPH      : 43,
			 avgDonutsPC : 4.50 },
		       
		       { location    : "Capitol Hill",
			 minCPH      : 4,
			 maxCPH      : 37,
			 avgDonutsPC : 2.00 },
		       
		       { location    : "South Lake Union",
			 minCPH      : 9,
			 maxCPH      : 23,
			 avgDonutsPC : 6.33 },
		       
		       { location    : "Wedgewood",
			 minCPH      : 2,
			 maxCPH      : 28,
			 avgDonutsPC : 1.25 },
		       
		       { location    : "Ballard",
			 minCPH      : 8,
			 maxCPH      : 58,
			 avgDonutsPC : 3.75 } ];
*/

    var franchises = [];

    var myTable = document.getElementById("table");

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
	if (franchise.isUnique) {
	    franchises.push(franchise);
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
	return donutsPerCustomer * customerVolume;
    }
    


    // Franchise constructor
    function Franchise(location, minimum, maximum, average) {
	this.location = location;
	this.minCPH = minimum;
	this.maxCPH = maximum;
	this.avgDonutsPC = average;
    };

    // Prototype methods
    Franchise.prototype.isUnique = function() {
	return uniqueness(this);
    }
    Franchise.prototype.randomizedCustomerVolume = function() {
	return getCustomerVolume(this.maxCPH, this.minCPH);
    }
    Franchise.prototype.hourOfDonutSales = function() {
	return getHourlySales(this.avgDonutsPC, this.randomizedCustomerVolume() );
    }

    /***** Stuff Actually Happens *****/

    var franchise = new Franchise("Downtown", 8, 43, 4.50);
    pushFranchise(franchise);
    franchise = new Franchise("Capitol Hill", 4, 37, 2.00);
    pushFranchise(franchise);
    franchise = new Franchise("South Lake Union", 9, 23, 6.33);
    pushFranchise(franchise);
    franchise = new Franchise("Wedgewood", 2, 28, 1.25);
    pushFranchise(franchise);
    franchise = new Franchise("Ballard", 8, 58, 3.75);
    pushFranchise(franchise);
    franchise = new Franchise("Portland", 8, 43, 4.50);
    pushFranchise(franchise);
    franchise = new Franchise("Vancouver", 9, 23, 6.33);
    pushFranchise(franchise);
    franchise = new Franchise("Salem", 2, 28, 1.25);
    pushFranchise(franchise);
    franchise = new Franchise("Eugene", 8, 58, 3.75);
    pushFranchise(franchise);
    franchise = new Franchise("Medford", 4, 37, 2.00);
    pushFranchise(franchise);
    
    
    console.log(franchises);


    var populateTable = function(table) {
	var row = "";
	var cell = "";
	console.log("I'm here.");
	
	for (var ii=0; ii < franchises.length; ii++) {
	    row = "<tr>";
	    console.log(row);
	    // Fill the location cell
	    cell = "<td>" + franchises[ii].location + "</td>";
	    row += cell;
	    console.log(row);
	    var salesTotal = 0;

	    // Fill the hourly cells
	    for (var jj=0; jj < 11; jj++) {
		var cellValue = franchises[ii].hourOfDonutSales();
		salesTotal += cellValue;
		cell = "<td>" + cellValue + "</td>";
		row += cell;
	    console.log(row);
	    }
	    
	    // Fill the total cell and close the row
	    cell = "<td>" + salesTotal + "</td>";
	    row += cell;
	    row += "</tr>";

	    console.log(row);
	    table.innerHTML += row;
	}
	
    }

    populateTable(myTable);
    
})();
