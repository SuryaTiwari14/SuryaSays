var buttonColors = ["red","blue","green","yellow"]
var gamePattern = []
var userClickedPattern =[]
var level = 0
var start = false

$(document).keypress(function(event){
    if(!start){
        nextSequence()  
        $("h1").text("level"+level)      
        start = true
    } 
})

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length - 1)
}) 

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    
    if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence()},1000)
        
    }
  }
  else{
    playSound("wrong")
    $("body").addClass("game-over")
    $("h1").text("GAME OVER")
    startOver()
    setTimeout( function () {
        $("body").removeClass("game-over");
        $("h1").text("Press A Key to Start")
      }, 2000);
  }

}

function nextSequence(){
    userClickedPattern = [];
    level = level + 1
    $("#level-title").text("Level " + level);

    var randomNumber1 = Math.random()
    randomNumber1 = randomNumber1*4 
    randomNumber1 = Math.floor(randomNumber1)
    var randomChosenColour = buttonColors[randomNumber1];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
    
}
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed")
    setTimeout( function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}
function startOver(){
    level=0
    gamePattern = []
    start = false
}