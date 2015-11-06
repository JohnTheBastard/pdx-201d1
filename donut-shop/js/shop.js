/* * * * * * * * * * * * *
 * DONUT SHOP            *
 * Created by John Hearn *
 * CF201       Fall 2015 *
 * * * * * * * * * * * * */
    
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

function Row() {
    this.element = document.createElement("tr");
    this.addCell = function(tag, myText) {
	var cell = document.createElement( tag );
	var text = document.createTextNode( myText );
	cell.appendChild( text );
	this.element.appendChild( cell );
    }
    this.addHeadCells = function (headData ) {
	for (var ii=0; ii < headData.length; ii++) {
	    this.addCell( "th", headData[ii] );
	}
    }
    this.addRowCells = function( myFranchise ) {
	var tag = "td";
	var hourOfSales = 0;
	var salesTotal = 0;
	this.addCell( tag, myFranchise.location );
	for (var jj=0; jj < 11; jj++) {
	    hourOfSales = myFranchise.hourOfDonutSales();
	    salesTotal += hourOfSales;
	    this.addCell(tag, hourOfSales);
	}
	this.addCell(tag, salesTotal);
    }
}


function SalesTable(headData, rowData) {
    this.table = document.createElement( "table" );
    this.init = function init() {
	console.log(this);
	this.addHead(headData);
	for ( var ii = 0; ii < rowData.length; ii++ ) {
	    this.addRow( rowData[ii] );
	}
    }
    this.addHead = function() {
	var row = new Row();
	row.addHeadCells(headData);
	return this.table.appendChild(row.element);
    }
    this.addRow = function(franchise) {
	var row = new Row();
	row.addRowCells(franchise);
	return this.table.appendChild(row.element);
    }
    console.log(this);
}


var DONUT_MODULE = (function() {
    // maybe some day
    //'use strict';
    
    var my = { };
    my.franchises = [ ];
    my.attachmentNode = document.getElementById("tableNode");
    
    
    /* * * * * * * * * * * * * * * * * * * *
     * * * * PRIVATE MODULE METHODS  * * * *
     * * * * * * * * * * * * * * * * * * * */

    // I'm trying to make these "private" methods,
    // but this may be an anti-pattern.
    
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



    var pushFranchise = function(myFranchise) {
	if (myFranchise.isUnique()) {
	    my.franchises.push(myFranchise);
	} else {
	    var preexistingIndex = getIndex(myFranchise);
	    my.franchises[preexistingIndex].minCPH = myFranchise.minCPH;
	    my.franchises[preexistingIndex].maxCPH = myFranchise.maxCPH;
	    my.franchises[preexistingIndex].avgDonutsPC = myFranchise.avgDonutsPC;	    	}
    }
    
    var initFranchiseArray = function( initData ) {
	//var franchiseArray = [ ];
	for ( var ii=0; ii < initData.length; ii++ ) {
	    var franchise = new Franchise( initData[ii][0],
					   initData[ii][1],
					   initData[ii][2],
					   initData[ii][3] );
	    pushFranchise(franchise);
	}
	
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
	my.sales.init();
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

	this.isUnique = function() {
	    return uniqueness(this);
	}

	this.randomizedCustomerVolume = function() {
	    var volume = Math.floor( Math.random() * (this.maxCPH - this.minCPH) + 1 )
		                    + this.minCPH;
	    return volume;
	}

	this.hourOfDonutSales = function() {
	    return Math.ceil(this.avgDonutsPC * this.randomizedCustomerVolume() );
	}
    }

    
    /*********************************** 
     ***** Stuff Actually Happens ******
     ***********************************/
    
    initFranchiseArray(defaultInput);
    
    my.sales = new SalesTable(headStrings, my.franchises);
    my.sales.init();
    my.attachmentNode.appendChild(my.sales.table);

    return my;
    
})();



