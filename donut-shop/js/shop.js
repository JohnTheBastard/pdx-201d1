/* * * * * * * * * * * * *
 * DONUT SHOP            *
 * Created by John Hearn *
 * CF201       Fall 2015 *
 * * * * * * * * * * * * */

var main = (function() {
    'use strict';

    // Initial data set
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


    // These are helper functions for my prototype.
    // They should go away once I understand function factories (I think).
    var uniqueness = function(myFranchise) {
	// Make sure our franchise location doesn't already exist.
	// (I hate that I have to do it like this, but JavaScript sucks.)
	for (ii=0; ii < franchises.length; ii++) {
	    if ( myFranchise.location == franchises[ii].location ) {
		return false;
	    }
	}
	return true;
    }

    var getIndex = function(myFranchise) {
	for (ii=0; ii < franchises.length; ii++) {
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
	return Math.fround( Math.random() * (max - min) ) + min;
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
	return getHourlySales(this.avgDonutsPC, this.randomizeCustomerVolume() );
    }

    /***** Stuff Actually Happens *****/

    var franchise = new Franchise("Portland", 8, 43, 4.50);
    pushFranchise(franchise);
    franchise = new Franchise("Vancouver", 9, 23, 6.33);
    pushFranchise(franchise);
    franchise = new Franchise("Salem", 2, 28, 1.25);
    pushFranchise(franchise);
    franchise = new Franchise("Eugene", 8, 58, 3.75);
    pushFranchise(franchise);
    franchise = new Franchise("Medford", 4, 37, 2.00);
    pushFranchise(franchise);
        



	

    
})();
