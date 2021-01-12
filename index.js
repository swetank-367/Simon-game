var buttonColours = ["red","green","blue","yellow"] ; 
var gamePattern  = [] ; 
var userClickedPattern = [] ; 

var level = 0 ; 
var best = 0 ; 
var started = false ; 

$(document).on("keypress",function(){
    if(!started)
    {
        nextSequence() ; 
        started = true ; 
    }
}) ; 

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour) ; 
    playSound(userChosenColour)  ;
    animatePress(userChosenColour) ; 
    checkAnswer(userClickedPattern.length-1) ; 
}) ; 


function nextSequence()
{
    level++ ; 
    best = Math.max(best,level) ; 
    $("#best-score").html("High Score: " +best);
    $("#level-title").html("Level "+level) ; 
    var randomNumber = Math.floor(Math.random()*4) ;
    var randomChosenColour = buttonColours[randomNumber];  
    gamePattern.push(randomChosenColour) ; 


     $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

     playSound(randomChosenColour) ; 

    
}

function playSound(name)
{
    var audio = new Audio("sounds/"+name+".mp3") ; 
    audio.play() ; 
}

function animatePress(currentColor)
{
        $("#" + currentColor).addClass("pressed") ; 
        setTimeout(function(){
            $("#" + currentColor).removeClass("pressed") ;
        },100) ;
}

function checkAnswer(currentLevel)
{
    if(gamePattern.length>0 && gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){
                nextSequence() ; 
            },1000) ; 
            userClickedPattern = []  ; 
        }
    }
    else 
    {
        $("body").addClass("game-over") ; 
        playSound("wrong") ; 
        setTimeout(function(){
            $("body").removeClass("game-over") ; 
        },200) ; 
        startOver() ; 
    }
}

function startOver()
{
    $("#level-title").html("Press any key to start") ; 
    level = 0 ; 
    started =false ; 
    gamePattern = [] ; 
    userClickedPattern = [] ; 
}


