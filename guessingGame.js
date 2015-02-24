//application.js
console.log("application.js wired up!"); //debug

var winningNum = Math.floor((Math.random() * 100) + 1),
	guess = undefined,
	gameLength = 5,
	gameHistory = [];
//start game and set winning number
//initial guess initialized to undefined
//number of guesses allowed in gameLength
//gameHistory array to record user guesses

console.log ("Winning number is: "+winningNum); //debug

function giveHint(){
	$("#gameFeedback").html("Psst! The secret answer is: "+winningNum);
}

function checkWin(num){
	console.log ("Winning number is: "+winningNum);//debug
	console.log ("User guess is: "+ num);//debug

	if(num === winningNum){
		return true;
	}
	else {
		return false;
	}
}

function hotCold(guess){
	var feedback = "";

	if (gameHistory.indexOf(guess) > -1){
		feedback += "C'mon now, you tried that already. ";
	}

	gameHistory.push(guess);
	console.log(gameHistory); //debug

	feedback += "Sorry, your guess is too ";
	if(guess < winningNum){
		feedback += "low. ";
	}
	else {
		feedback += "high. ";
	}

	feedback += warmerCooler();


	$("#gameFeedback").html(feedback);

}

function warmerCooler(){

	if (gameHistory.length > 1){
		var curRange = Math.abs(winningNum - gameHistory[gameHistory.length-1]);
		var prevRange = Math.abs(winningNum - gameHistory[gameHistory.length-2]);

		if (curRange < prevRange){
			return "You are getting warmer.";
		}
		else if (curRange > prevRange) {
			return "You are getting colder.";
			//don't wanna imply that a worse guess makes the user cooler.
		}
		else {
			return "";
		}
	}
	else {
		return "";
	}

}

function prevGuesses(){
	if (gameHistory.length > 0){
		var gameHistStr = "Previous guesses: ";

		for (var i in gameHistory){
			gameHistStr += (gameHistory[i] + ",");
		}
		gameHistStr = gameHistStr.substring(0, gameHistStr.length-1);
		console.log(gameHistStr);
		$("#prevGuesses").html(gameHistStr);
	}
}

function validInput(input){
	//make sure input is integer between 1 and 100
	return (typeof input === 'number') 
		&& (input % 1 === 0) 
		&& (input >= 1) 
		&& (input <= 100);
}

function submGuessAndClear(frm){
	console.log(frm.userGuess.value);
	//debug to make sure we got something
	guess = Number(frm.userGuess.value); //get guess
	//.value is returning a string, casting to Number.
	frm.userGuess.value = ""; //reset text box to blank

	if (validInput(guess)){
		console.log ("User guess is: "+ guess); //debug
		
		if (checkWin(guess)){
			$("body").css("background-color","rgb(171, 255, 0)");
			alert("You guessed correctly!");
			window.location.reload();//reset game by reloading page
		}
		else {
			hotCold(guess);
			prevGuesses();
		}

		gameLength--;
		if (gameLength < 0){
			gameLength = 0;
		}
		$("#guessesRemaining span").html(gameLength);
		if (gameLength === 0){
			$("#gameFeedback").html("Game Over. Press New Game to Play Again!");
		}
	}
	else {
		$("#gameFeedback").html("Enter an integer between 1 and 100");
	}
	
}

$("#inputTextBox").keypress(function(event) {
    if (event.keyCode == 13) {
    	event.preventDefault();
    	console.log("Enter Key Pressed in input");//debug
    	console.log(this.form);//debug
        submGuessAndClear(this.form);
    }
});

$(document).ready(function(){
	//display initial number of turns in gameLength at start
	console.log("ready to load guesses remaining " + gameLength);
	$("#guessesRemaining span").html(gameLength);
});