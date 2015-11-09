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


    /* * * * * * * * * * * * * * * * * * *
     * * * * * * CONSTRUCTORS  * * * * * *
     * * * * * * * * * * * * * * * * * * */    

function Franchise( location, minimum, maximum, average ) {
    this.location = location;
    this.minCPH = minimum;
    this.maxCPH = maximum;
    this.avgDonutsPC = average;
    
    this.randomizedCustomerVolume = function() {
	var volume = Math.floor( Math.random() * (this.maxCPH - this.minCPH) + 1 )
	                         + this.minCPH;
	return volume;
    }
    
    this.hourOfDonutSales = function() {
	return Math.ceil( this.avgDonutsPC * this.randomizedCustomerVolume() );
    }
}

// wrapper for DOM <tr> element to extend functionality without breaking
// browser compatability. See here for more info on why:
// http://perfectionkills.com/whats-wrong-with-extending-the-dom/
function Row() {
    this.element = document.createElement( "tr" );
    this.addCell = function( tag, myText ) {
	var cell = document.createElement( tag );
	var text = document.createTextNode( myText );
	cell.appendChild( text );
	this.element.appendChild( cell );
    }
    this.addHeadCells = function( headData ) {
	var tag = "th";
	for (var ii=0; ii < headData.length; ii++) {
	    this.addCell( tag, headData[ii] );
	}
    }
    this.addRowCells = function( myFranchise ) {
	var tag = "td";
	var hourOfSales = 0;
	var salesTotal = 0;
	this.addCell( tag, myFranchise.location );
	for ( var jj=0; jj < 11; jj++ ) {
	    hourOfSales = myFranchise.hourOfDonutSales();
	    salesTotal += hourOfSales;
	    this.addCell(tag, hourOfSales);
	}
	this.addCell(tag, salesTotal);
    }
}

function SalesTable( headData, rowData ) {
    this.table = document.createElement( "table" );
    this.init = function() {
	this.addHead( headData );
	for ( var ii = 0; ii < rowData.length; ii++ ) {
	    this.addRow( rowData[ii] );
	}
    }
    this.addHead = function() {
	var row = new Row();
	row.addHeadCells( headData );
	return this.table.appendChild( row.element );
    }
    this.addRow = function( franchise ) {
	var row = new Row();
	row.addRowCells( franchise );
	return this.table.appendChild( row.element );
    }
}

// Info on where this MODULE design pattern came from:
// http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
var DONUT_MODULE = (function() {
    // maybe some day
    //'use strict';

    var my = { };
    my.anchorNode = document.getElementById( "moduleNode" );
    my.franchises = [ ];

    
    /* * * * * * * * * * * * * * * * * * *
     * * * * PUBLIC MODULE METHODS * * * *
     * * * * * * * * * * * * * * * * * * */

    // Set up array of franchise objects with default data
    my.franchises.init = function( initData ) {
	for ( var ii=0; ii < initData.length; ii++ ) {
	    var franchise = new Franchise( initData[ii][0],
					   initData[ii][1],
					   initData[ii][2],
					   initData[ii][3] );
	    my.franchises.update( franchise );
	    my.franchises.sort( my.compare );
	}
    }

    // returns false if franchise already exists in array
    my.franchises.doesntHave = function( franchise ) {
	// Make sure our franchise location doesn't already exist.
	// (I hate doing it like this, but JavaScript objects suck.)
	for ( var ii=0; ii < my.franchises.length; ii++ ) {
	    if ( franchise.location == my.franchises[ii].location ) {
		return false;
	    }
	}
	return true;
    }

    
    my.franchises.getIndex = function( franchise ) {
	for ( var ii=0; ii < my.franchises.length; ii++ ) {
	    if ( franchise.location == my.franchises[ii].location ) {
		return ii;
	    }
	}
    }
    
    // Either push new franchise or override an old one
    my.franchises.update = function( franchise ) {
	if ( my.franchises.doesntHave( franchise ) ) {
	    my.franchises.push( franchise );
	    my.franchises.sort( my.compare );
	} else {
	    var oldIndex = my.franchises.getIndex( franchise );
	    my.franchises[ oldIndex ].minCPH = franchise.minCPH;
	    my.franchises[ oldIndex ].maxCPH = franchise.maxCPH;
	    my.franchises[ oldIndex ].avgDonutsPC = franchise.avgDonutsPC;
	}
    }

    // compare funcion to allow sorting array of franchises
    my.compare = function compare( franchise1, franchise2 ) {
	if ( franchise1.location < franchise2.location )
	    return -1;
	if ( franchise1.location > franchise2.location )
	    return 1;
	return 0;
    }
    
    // This probably only gets called from HTML 
    my.addUserInput = function() {
	var loc = document.getElementById( 'location' ).value; 
	var min = parseInt( document.getElementById( 'minCPH' ).value, 10 ); 
	var max = parseInt( document.getElementById( 'maxCPH' ).value, 10 ); 
	var avg = parseFloat( document.getElementById( 'avgDPC' ).value );

	// Do some cursory input validation
	if ( loc == "" || isNaN(min) || isNaN(max) || isNaN(avg) ) {
	    return false;
	} else {

	    // capitalize the first letter
	    loc = loc.charAt(0).toUpperCase() + loc.slice(1);
	    
	    var userFranchise = new Franchise( loc, min, max, avg );
	    
	    // store (or update) our new franchise data
	    my.franchises.update( userFranchise );
	    
	    // redraw the table
	    // This is a memory leak. Deleting an element does not
	    // remove it's children from memory, so I need to
	    // implement a recursive method for deletion.
	    my.anchorNode.removeChild( my.sales.table );
	    my.sales = new SalesTable( headStrings, my.franchises );
	    my.sales.init();
	    my.anchorNode.appendChild( my.sales.table );
	}
    }

    /*********************************** 
     ***** Stuff Actually Happens ******
     ***********************************/

    my.franchises.init( defaultInput );
    my.sales = new SalesTable( headStrings, my.franchises );
    my.sales.init();
    my.anchorNode.appendChild( my.sales.table );

    return my;
    
})();
