/* * * * * * * * * * * * *
 * GUESSING GAME         *
 * Created by John Hearn *
 * CF201  10/26/2015     *
 * * * * * * * * * * * * */

var questions = [ { query      : "Am I from Texas?",
		    answer     : "NO",
		    correction : "I am from Alaska." },

		  { query      : "Am I over 40 years old?",
		    answer     : "NO",
		    correction : "I am only 32 years old." },

		  { query      : "Is my middle name Andrew?",
		    answer     : "NO",
		    correction : "My middle name is Douglas." } ];


var score = 0
var userResponses = [];
var userName = prompt( "What's you name?" );

// Normalize responses to YES or NO based on the first letter
// of the string, or returns the boolean 'false' if the input
// is invalid.
var normalize = function(response) {
    if ( response.substr(0,1).toUpperCase() === "Y" ) {
	return "YES";
    } else if ( response.substr(0,1).toUpperCase() === "N" ) {
	return "NO";
    } else {
	return false;
    }
}

var askQuestion = function (index) {
    var alertString;
    var paragraph;
    var errorMessage = "";
    var input;
    var elementID= "alert" + ( index + 1 );

    
    // Keep trying til you get a YES or NO.
    do {
	input = normalize( prompt( errorMessage + questions[index].query ) );
	errorMessage = "I'm sorry, I didn't get that. " +
	               "Please answer YES or NO. \n\n";
    } while ( !input );
    
    userResponses.push( input );
    
    if ( userResponses[index] === questions[index].answer ) {
	score++;
	alertString = "You answered " + userResponses[index] +
	              "\nGood job, " + userName + ". That's correct! "
	              + questions[index].correction;
    } else {
	alertString = "You answered " + userResponses[index]  +
	              "\nI'm sorry, " + userName + ". That's not right. "
	              + questions[index].correction;
    }
    paragraph = document.getElementById( elementID );
    paragraph.innerHTML = alertString;
}

/*  Get responses from user */
for ( i=0; i < questions.length; i++ ) {
    askQuestion(i);
}
//userResponses.push( input );

if ( userResponses[i] === questions[i].answer ) {
    score++;
    alert( "You answered " + userResponses[i] + "\n" + 
	   "Good job, " + userName + ". That's correct! "
	   + questions[i].correction );
} else {
    alert( "You answered " + userResponses[i] + "\n" + 
	   "I'm sorry, " + userName + ". That's not right. "
	   + questions[i].correction );
}

/* Tell user how they did */
alert( userName + ", you scored " + score + " out of "
       + questions.length + ".\n" + "Thanks for playing!" );
