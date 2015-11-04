/* * * * * * * * * * * * *
 * DONUT SHOP            *
 * Created by John Hearn *
 * CF201       Fall 2015 *
 * * * * * * * * * * * * */

var DONUT_MODULE = (function() {
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
    
    var my = {};
    my.franchises = [ ];

    /* * * * * * * * * * * * * * * * * * *
     *      PRIVATE MODULE METHODS       *
     * * * * * * * * * * * * * * * * * * */
    // I'm trying to make these "private" methods,
    // but this may be an anti-pattern.
    var uniqueness = function(myFranchise) {
	// Make sure our franchise location doesn't already exist.
	// (I hate that I have to do it like this, but JavaScript sucks.)
	for (var ii=0; ii < my.franchises.length; ii++) {
	    if ( myFranchise.location == my.franchises[ii].location ) {
		return false;
	    }
	}
	return true;
    }

    var getIndex = function(myFranchise) {
	for (var ii=0; ii < my.franchises.length; ii++) {
	    if ( myFranchise.location == my.franchises[ii].location ) {
		return ii;
	    }
	}
    }

    var pushFranchise = function(myFranchise) {
	if (myFranchise.isUnique()) {
	    my.franchises.push(myFranchise);
	} else {
	    var preexistingIndex = getIndex(myFranchise);
	    my.franchises[preexistingIndex].minCPH = myFranchise.minCPH;
	    my.franchises[preexistingIndex].maxCPH = myFranchise.maxCPH;
	    my.franchises[preexistingIndex].avgDonutsPC = myFranchise.avgDonutsPC;	    	}
    }
    
    var getCustomerVolume = function(max, min) {
	// Fix the rounding tomorrow.
	return Math.floor( Math.random() * (max - min) + 1) + min;
    }

    var getHourlySales = function(donutsPerCustomer, customerVolume) {
	return Math.ceil( donutsPerCustomer * customerVolume );
    }


    // Refactor this
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

    /* * * * * * * * * * * * * * * * * * *
     *       PUBLIC MODULE METHODS * * * *
     * * * * * * * * * * * * * * * * * * */
    my.populateFranchiseArray = function(myFranchiseArray) {
	for(var ii=0; ii < myFranchiseArray.length; ii++) {
	    var franchise = new Franchise( myFranchiseArray[ii][0],
					   myFranchiseArray[ii][1],
					   myFranchiseArray[ii][2],
					   myFranchiseArray[ii][3] );
	    pushFranchise(franchise);
	}
    }

    // Refactor this to use something besides innerHTML
    my.populateTable = function(table) {
	for (var ii=0; ii < my.franchises.length; ii++) {
	    table.innerHTML += my.franchises[ii].generateTableRow();
	}
    }

    // This gets called from HTML (hopefully)
    my.addUserInput = function() {
	var loc = document.getElementById('location').value; 
	var min = parseInt( document.getElementById('minCPH').value, 10 ); 
	var max = parseInt( document.getElementById('maxCPH').value, 10 ); 
	var avg = parseFloat( document.getElementById('avgDPC').value );
	var userFranchise = new Franchise(loc, min, max, avg);
	pushFranchise(userFranchise);
    }

    
    // Franchise constructor
    function Franchise(location, minimum, maximum, average) {
	this.location = location;
	this.minCPH = minimum;
	this.maxCPH = maximum;
	this.avgDonutsPC = average;

	// Franchise methods
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
    
    my.populateFranchiseArray(defaultInput);
    my.populateTable( document.getElementById("table") );

    return my;
    
})();



