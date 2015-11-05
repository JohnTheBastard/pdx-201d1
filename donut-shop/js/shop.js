/* * * * * * * * * * * * *
 * DONUT SHOP            *
 * Created by John Hearn *
 * CF201       Fall 2015 *
 * * * * * * * * * * * * */

var DONUT_MODULE = (function() {
    // maybe some day
    //'use strict';
    
    var headStrings = [ "Location", "7 am", "8 am","9 am",
			"10 am", "11 am", "12 pm", "1 pm",
			"2 pm", "3 pm", "4 pm", "5 pm", "Total" ]
    
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
    my.attachmentNode = document.getElementById("tableNode");
    
    
    /* * * * * * * * * * * * * * * * * * * *
     * * * * PRIVATE MODULE METHODS  * * * *
     * * * * * * * * * * * * * * * * * * * */

    // I'm trying to make these "private" methods,
    // but this may be an anti-pattern.
    var initFranchiseArray = function(myFranchiseArray) {
	for ( var ii=0; ii < myFranchiseArray.length; ii++ ) {
	    var franchise = new Franchise( myFranchiseArray[ii][0],
					   myFranchiseArray[ii][1],
					   myFranchiseArray[ii][2],
					   myFranchiseArray[ii][3] );
	    pushFranchise(franchise);
	}
    }
    
    var uniqueness = function(myFranchise) {
	// Make sure our franchise location doesn't already exist.
	// (I hate doing it like this, but JavaScript objects suck.)
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

    var getCustomerVolume = function(max, min) {
	return Math.floor( Math.random() * (max - min) + 1) + min;
    }

    var getHourlySales = function(donutsPerCustomer, customerVolume) {
	return Math.ceil( donutsPerCustomer * customerVolume );
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
    

    /* * * * * * * * * * * * * * * * * * *
     * * * * PUBLIC MODULE METHODS * * * *
     * * * * * * * * * * * * * * * * * * */

    // This gets called from HTML
    my.addUserInput = function() {
	var loc = document.getElementById('location').value; 
	var min = parseInt( document.getElementById('minCPH').value, 10 ); 
	var max = parseInt( document.getElementById('maxCPH').value, 10 ); 
	var avg = parseFloat( document.getElementById('avgDPC').value );
	var userFranchise = new Franchise(loc, min, max, avg);

	// store (or update) our new franchise data
	pushFranchise(userFranchise);

	// redraw the table
	my.attachmentNode.removeChild(my.sales.table);
	my.sales = new SalesTable(headStrings, my.franchises);
	my.attachmentNode.appendChild(my.sales.table);
    }

    /* * * * * * * * * * * * * * * * * * *
     * * * * * * CONSTRUCTORS  * * * * * *
     * * * * * * * * * * * * * * * * * * */    

    function Franchise(location, minimum, maximum, average) {
	this.location = location;
	this.minCPH = minimum;
	this.maxCPH = maximum;
	this.avgDonutsPC = average;

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
    
    // I want to refactor makeCell, addHeadCellsTo, & addRowCellsTo
    // to be delegates of an Element wrapper (once I know how)
    
    var makeCell = function(tag, myText) {
	var td = document.createElement( tag );
	var text = document.createTextNode( myText );
	td.appendChild(text);
	return td;
    }

    var addHeadCellsTo = function(tr, headData) {
	for (var ii=0; ii < headData.length; ii++) {
	    tr.appendChild( makeCell( "th", headData[ii] ) );
	}
	return tr;
    }

    var addRowCellsTo = function(tr, myFranchise) {
	var tag = "td";
	var hourOfSales = 0;
	var salesTotal = 0;
	
	tr.appendChild( makeCell( tag, myFranchise.location ) );

	for (var jj=0; jj < 11; jj++) {
	    hourOfSales = myFranchise.hourOfDonutSales();
	    salesTotal += hourOfSales;
	    tr.appendChild( makeCell(tag, hourOfSales) );
	}

	tr.appendChild( makeCell( tag, salesTotal ) );

	return tr;
    }

    function SalesTable(headData, rowData) {
	this.table = document.createElement( "table" );
	this.init(headData, rowData);
    }

    SalesTable.prototype.init = function(headData, rowData) {
	this.addHead(headData);
	for ( var ii = 0; ii < rowData.length; ii++ ) {
	    this.addRow( my.franchises[ii] );
	}
    }

    SalesTable.prototype.addHead = function(headData) {
	var tr = document.createElement("tr");
	tr = addHeadCellsTo(tr, headData);
	return this.table.appendChild(tr);
    }

    SalesTable.prototype.addRow = function(franchise) {
	var tr = document.createElement("tr");
	tr = addRowCellsTo(tr, franchise);
	return this.table.appendChild(tr);
    }
        

    /*********************************** 
     ***** Stuff Actually Happens ******
     ***********************************/
    
    initFranchiseArray(defaultInput);
    
    my.sales = new SalesTable(headStrings, my.franchises);
    my.attachmentNode.appendChild(my.sales.table);

    return my;
    
})();



