/* * * * * * * * * * * * * 
 * GUESSING GAME         *
 * Created by John Hearn *
 * CF201  10/26/2015     *
 * * * * * * * * * * * * */

var questions = [ { query      : "Am I from Texas?",
		    answer     : "no",
		    correction : "I am from Alaska." },
		  
		  { query      : "Am I over 40 years old?",
		    answer     : "no",
		    correction : "I am only 32 years old." },

		  { query      : "Is my middle name Andrew?",
		    answer     : "no",
		    correction : "My middle name is Douglas." } ];


var score = 0
var userResponses = [];
var userMistakes  = [];
var userName = prompt("What's you name?");

/*  Get responses from user */
for ( i=0; i < questions.length; i++) {
    userResponses.push(prompt(questions[i].query));
    alert("You said, \"" + userResponses[i] + "\".");

    if ( userResponses[i] === questions[i].answer) {
	score++;
	console.log("That's correct!");
    } else {
	console.log("I'm sorry " + userName + ", that's incorrect.");
	userMistakes.push(i);
    }
}

/* Tell user how they did */
console.log("\nYou scored " + score + " out of " + questions.length + ".\n\n");

if (userMistakes.length > 0) {
    console.log(userName + ", here are answers to the questions you missed:");

    for (i=0; i < userMistakes.length; i++) {
	questionNumber = userMistakes[i] + 1;
	console.log("Question #" + questionNumber + ": "
		    + questions[i].correction);
    }
}
