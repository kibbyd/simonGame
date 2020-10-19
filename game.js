
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
  console.log("KEYPRESS FUNCTION")
    if(!started){
        console.log("if block runs as started variable = false");

        console.log("h1 changes to level 0");
        $("#level-title").text("Level " + level);

        console.log("nextsequence() function runs.");
        nextSequence();

        console.log("started variable is changed to true value.");
        started = true;
    } else {
    console.log("if statement is false, code block doesn't run.")
    }
})

function nextSequence(){
  console.log("NEXT SEQUENCE FUNCTION");

  console.log("level variable is incremented by 1.");
  level++;

  console.log("#level-title changes to level + new level number after being incremented.");
  $("#level-title").text("Level " + level);

  console.log("A random number between 0-3 is generated and stored in randomNumber.");
  var randomNumber = Math.floor(Math.random() * 3);

  console.log("randomChosenColor variable is created and a color is selected from buttonColors array at random using randomNumber variable.");
  var randomChosenColor = buttonColors[randomNumber];

  console.log("The randomChosenColor is pushed into gamePattern array.");
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);

  console.log("The randomChosenColor name is used to select the related audio file which plays using play() method.");
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();

  console.log("The related button fades in and out creating a flash effect.");
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  console.log("The userClickedPattern array is reset to an empty array.");
  userClickedPattern = [];
  
}

$(".btn").click(function() {
  console.log("BUTTON CLICK FUNCTION");

  console.log("userChosenColor variable is created and stores the ID of the button the user clicks.");
  var userChosenColor = $(this).attr("id");

  console.log("Button ID is pushed into the userChosenColor array.");
  userClickedPattern.push(userChosenColor); 
  console.log(userClickedPattern);


  console.log("Playsound() function is called passing userChosen Color.");
  playSound(userChosenColor);

  console.log("animatePress() function is called passing userChosen Color.");
  animatePress(userChosenColor);
  
  console.log("checkAnswer() function is called passing in: " + (userClickedPattern.length-1));
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
  console.log("PLAY SOUND FUNCTION");
  if(name === "wrong"){
    console.log("playSound() function receives wrong string when it's called and passed wrong in checkAnswer function, is is received as name parameter here and plays the associated sound file.");
  } else {
    console.log("playSound() function receives userChosenColor passed in from button click as name parameter, and plays the associated sound file.");
  }
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  console.log("ANIMATE PRESS FUNCTION");
  console.log("animatePress() function receives userChosenColor passed in from button click as currentColor parameter, adds the pressed class then removes it after 100 milliseconds.");
  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
      $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
    console.log("CHECK ANSWER FUNCTION");
    console.log("checkAnswer() function is passed " + (userClickedPattern.length-1) + " as the parameter currentLevel.");
    console.log("if statement compares " + (gamePattern[currentLevel]) + " and " + (userClickedPattern[currentLevel]));
  
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("if statement is true, the next if statement is checked.");
      
      if (userClickedPattern.length === gamePattern.length){
          console.log("if statement was true so setTimeout() function waits 1000 and runs nextSequence() function.");
          setTimeout(function () {
            nextSequence();
          }, 1000);
        } else{
          console.log(("if statement is false: " + userClickedPattern.length) + " and " + (gamePattern.length) + " current values");
        }
        
      } else {
        console.log("if statement was wrong so else code block runs.");
        console.log("playSound() is called and the string wrong is passed in as a parameter so the associated sound can be played.");
        playSound("wrong");
        
        console.log("The game-over class is added to the body.");
        $("body").addClass("game-over");
       
        console.log("#level-title is changed to Game Over....");
        $("#level-title").text("Game Over, Press Any Key to Restart");
       
        console.log("setTimeout() function removes game-over class from body after 200 milliseconds.");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
       
        console.log("startOver() function is called.");
        startOver();
      }
  }


function startOver() {
    console.log("START OVER FUNCTION");
    console.log("level variable is reset to 0.");
    level = 0;
    
    console.log("gamePattern array is reset to an empty array.");
    gamePattern = [];
    
    console.log("started variable is reset to false, so game will now restart when any keys is pressed.");
    started = false;
}