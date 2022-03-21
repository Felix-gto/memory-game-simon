
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Game Start -> Listen for keypress to start game
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Game Start -> Listen for click to start game
$(document).click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// Button Click - detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

  // Store the id of the button that got clicked and add the content of the variable to the end of this new userClickedPattern []
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

  // Correct Click -> Move to the nextSequence() if the user answer is the same as the game pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // Wrong click: play the "wrong" sound, apply the "game-over" css class to the body of the website (remove it after 1 second), change the h1 title to: "Game Over, Press Any Key to Restart"
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Call the startOver() function if the user gets the sequence wrong - startOver function after 1 sec as well so we can also listen to a click event to start the game.
    setTimeout(function () {
      $("body").removeClass("game-over");
      startOver();
    }, 1000);      
  }
}


function nextSequence() {
  // Reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Start Over function: reset the values of the "level", "gamePattern" and "started" variables.
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
