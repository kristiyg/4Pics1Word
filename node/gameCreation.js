function ajax(message, callbackFunction){
    $.post(document.location.href, { args : JSON.stringify(message) }, callbackFunction)
}
var gameIndex = 0

//SET UP
function setUp(){
    gameIndex = 0
    getAndDisplayGame(gameIndex)
    /*     //FOR TESTING   //create links for all the games
    for(var i = 0; i< games.length; i++){
        var gameNumberForDisplay = i + 1;
        var newSpan = $("<span id='game"+gameNumberForDisplay+"' class = 'menu-item' >")
        newSpan.html(gameNumberForDisplay)
        var wrap = function(thisNewSpan, iter){
            thisNewSpan.click(function (){
                displayGame(iter)
            })
        }
        wrap(newSpan, i)
        $("#nav").append(newSpan)
    }*/
    createDivider()
    var newSpan1 = $("<span id='instructions' class = 'menu-item' >")
    newSpan1.html("instructions")
    $("#nav").append(newSpan1)
    $("#instructions").click(function() {
        viewInstructions()
    })
    createDivider()
    var newSpan2 = $("<span id='restart' class = 'menu-item' >")
    newSpan2.html("restart")
    $("#nav").append(newSpan2)
    $("#restart").click(function() {
        restart()
    })
    createDivider()
    var newSpan3 = $("<span id='skip' class = 'menu-item' >")
    newSpan3.html("skip |")
    $("#nav").append(newSpan3)
    $("#skip").click(function() {
        skip()
    })
    $("#skip").hide()
    $(".menu-item").hover(function(){
        $('.menu-item').css( 'cursor', 'pointer' )});
}
function createDivider(){
    var space0 = $("<span id='space0'>")
    space0.html(" | ")
    $("#nav").append(space0)
}
function getAndDisplayGame(gameIndex){
    var message = {"type": "getGame", "gameIndex":gameIndex}
    ajax(message, function(result){
        var jsonResult = JSON.parse(result)
        var game = jsonResult["game"]
        setGame(game)
        displayGame() 
        sendStartTimeMessage()
    })
}
//displayingGame
function displayGame(){
    populateImageTable()
    populateLetterTable()
    resetUIElts()
}
function populateImageTable(){
    var thisImageArray = thisGame["imageArray"]
    $("#image1").attr('src',thisImageArray[0])
    $("#image2").attr('src',thisImageArray[1])
    $("#image3").attr('src',thisImageArray[2])
    $("#image4").attr('src',thisImageArray[3])
}
function populateLetterTable(){
    var thisLetterArray = thisGame["letterArray"]    
    for(var i = 1; i < 11; i++){
        var letterIndex = i-1
        var span = $("<span id='letter"+i+"span' class = 'menu-item'>")
        span.html(thisLetterArray[letterIndex])
        $("#letter"+i).append(span)
        
        var wrap = function(letterIndexPrime, iPrime){
            $("#letter"+iPrime+"span").click(function(){
                addLetter(thisLetterArray[letterIndexPrime], iPrime)
            })
        }
        wrap(letterIndex, i)
    }
    
    $(".menu-item").hover(function(){
        $('.menu-item').css( 'cursor', 'pointer' )});
    /*
    $("#letter1").html(thisLetterArray[0])
    $("#letter2").html(thisLetterArray[1])
    $("#letter3").html(thisLetterArray[2])
    $("#letter4").html(thisLetterArray[3])
    $("#letter5").html(thisLetterArray[4])
    $("#letter6").html(thisLetterArray[5])
    $("#letter7").html(thisLetterArray[6])
    $("#letter8").html(thisLetterArray[7])
    $("#letter9").html(thisLetterArray[8])
    $("#letter10").html(thisLetterArray[9])
    $("#letter11").html(thisLetterArray[10])
    $("#letter12").html(thisLetterArray[11])
    $("#letter13").html(thisLetterArray[12])
    $("#letter14").html(thisLetterArray[13])
    $("#letter15").html(thisLetterArray[14])
    $("#letter16").html(thisLetterArray[15])
    */
}
function addLetter(letter, letterNum){
    $("#guess").append(letter)
    $("#letter"+letterNum).empty()
}
function resetUIElts(){
    clearGuess()
    $("#check").empty()
    $("#feedback").empty()
    $("#feedbackguess").empty()
    $("#points").empty()
    $("#hint").empty() 
    $("#scramble").empty() 
    createCheckButton()
    createClearButton()
    //$('#textbox1').focus()
}
function createCheckButton(){
    var div = $('<div>')
    var checked = false
    var checkButton = $('<button id="checkButton">check</button>')
    checkButton.click(function(){
        if(checked == false)
            {
                checkAnswer()
            }
             
    })
    div.append(checkButton)
    $("#check").append(div)
}
function checkAnswer(){
    var guess = $("#guess").text()
    console.log(guess)
    if(guess != ""){
        var payload =  {"textboxAnswer": guess, "gameIndex": gameIndex}
        var message = {"type": "checkAnswer", "payload": payload}
        ajax(message, function(result){
            var jsonResult = JSON.parse(result)
            var isAnswerCorrect = jsonResult["rtn"]["isAnswerCorrect"]
            sendEndTimeMessage(guess, -1)
            if(isAnswerCorrect){
                correct(guess)
            }
            else{
                incorrect(guess)
            }
        })
        clearPreviousFeedback()
        clearGuess()
    }
}
function createClearButton(){
    var div = $('<div>')
    var clearButton = $('<button id="clearButton">clear</button>')
    clearButton.click(function(){
        clearGuess()
    })
    div.append(clearButton)
    $("#check").append(div)
    return div
}
function clearGuess(){
    $("#guess").empty()
    emptyLetterTable()
    populateLetterTable()
}
/*function createTextbox(){
    var div = $('<div>')
    var checked = false
    var textbox = $('<input type="textbox" id="textbox1" >')
    div.append(textbox)
    var checkButton = $('<button id="checkButton">check</button>')
    checkButton.click(function(){
        if(checked == false)
            {
                checkAnswer()
            }
             
    })
    textbox.keypress(function(event){
        if( event.which == 13 ) {
            if(checked == false)
            {
                checkAnswer()
            }
       }
    })
    div.append(checkButton)
    $("#guess").append(div)
    return div
}*/
//PASSING LEVELS
function correct(textboxAnswer){
    $("#feedback").append(createFeedbackDiv("CORRECT!!! AWESOME"))
    $("#feedbackguess").append(createFeedbackGuessesDiv())
    $("#skip").hide()
    $("#check").empty()
    $("#points").append(createPointsDiv("right"))
    setTimeout(function(){
        if(!isLastGame()){
            goToNext(textboxAnswer)
        }
        else{
            displayResults()
        }
    },1500);
}
function skip(){
    var message = {"type": "skip", "gameIndex": gameIndex}
    ajax(message, function(result){
        var jsonResult = JSON.parse(result)
        var passed = jsonResult["passed"]
    })
    clearPreviousFeedback()
    $("#scramble").empty()
    displayFeedbackForWrong()
    handleLastGuessForThisGame()
}
function incorrect(){
    displayFeedbackForWrong()
    displayHints()
    //reset UI
    //$('#textbox1').val("")
    sendStartTimeMessage()
}
function displayFeedbackForWrong(){
    $("#feedback").append(createFeedbackDiv("try another guess!"))
    $("#feedbackguess").append(createFeedbackGuessesDiv())
    $("#points").append(createPointsDiv("wrong"))
    $("#guess").empty() 
}
function displayHints(){
    var message = {"type": "numGuessesMade", "gameIndex": gameIndex}
    ajax(message, function(result){
        var jsonResult = JSON.parse(result)
        var numGuessesMade = jsonResult["numGuessesMade"]
        
        if(numGuessesMade==1){
        $("#skip").show()
        $("#hint").append(createHintDiv(gameIndex))
        }
        else if(numGuessesMade == 2){
            takeAwayLetter(gameIndex)
        }
        else if(numGuessesMade == 3){
            takeAwayLetter2(gameIndex)
        }
        else if(numGuessesMade == 4){
            $("#hint").append(addHint2(gameIndex))
            //scramble(gameIndex)
        }
        else if(numGuessesMade == 5){
            handleLastGuessForThisGame()
        }
    })
}
function handleLastGuessForThisGame(){
    var guess = $("#guess").text()
    sendEndTimeMessage(guess, 0)
    var message = {"type": "getAnswer", "gameIndex": gameIndex}
    ajax(message, function(result){
        var jsonResult = JSON.parse(result)
        var answer = jsonResult["answer"]
        alert("sorry, the answer is "+ answer)
    })
    if( isLastGame() ){            
        sendEndTimeMessage(guess, 0)
        displayResults()
    }
    else{
        goToNext()
    }
}
function isLastGame(){
    return gameIndex >= 4
}
function goToNext(textboxAnswer){
    gameIndex++
    getAndDisplayGame(gameIndex)
    $("#skip").hide()
}
//FEEDBACK
function createFeedbackDiv(feedback){
    var div = $('<div>')
    $(div).html(feedback)
    return div
}
function createFeedbackGuessesDiv(){
    var div = $('<div>')
    var message = {"type": "guessesLeft", "gameIndex":gameIndex}
    ajax(message, function(result){
        var jsonResult = JSON.parse(result)
        var guessLeft = jsonResult["guessLeft"]
        $(div).html("guesses left:"+ guessLeft)
    })
    return div
}
function createPointsDiv(passed){
    var div = $('<div>')
    var message = {"type": "currentScore"}
    ajax(message, function(result){
        var jsonResult = JSON.parse(result)
        var currentScore = jsonResult["currentScore"]
        if(passed == "wrong"){
            $(div).html("points: -1  <br>  current score: "+ currentScore)
        }
        else if(passed == "right"){
            $(div).html("points: +10  <br>  current score: "+ currentScore)
        }
        else{
            alert("ERROR createPointsDiv passed:"+passed)
        }  
    })
    return div
}
function createHintDiv(index){
    var div = $('<div>')
    var message = {"type": "hint1", "gameIndex": gameIndex}
    ajax(message, function(result){
        var jsonResult = JSON.parse(result)
        var hint1 = jsonResult["hint1"]
        $(div).html(hint1)
    })
    return div
}
function addHint2(index){
    var div = $('<div>')
    var message = {"type": "hint2", "gameIndex": gameIndex}
    ajax(message, function(result){
        var jsonResult = JSON.parse(result)
        var hint2 = jsonResult["hint2"]
        $(div).html(hint2)
    })
    return div
}
function takeAwayLetter(index){
    var message = {"type": "removeLetterIndex1", "gameIndex": gameIndex}
    ajax(message, function(result){
        var jsonResult = JSON.parse(result)
        var letterIndexToChange = jsonResult["removeLetterIndex1"]
        var thisLetterArray = thisGame["letterArray"]
        thisLetterArray[letterIndexToChange-1] = ""
        clearGuess()
    })
}
function takeAwayLetter2(index){
    var message = {"type": "removeLetterIndex2", "gameIndex": gameIndex}
    ajax(message, function(result){
        var jsonResult = JSON.parse(result)
        var letterIndexToChange = jsonResult["removeLetterIndex2"]
        var thisLetterArray = thisGame["letterArray"]
        thisLetterArray[letterIndexToChange-1] = ""
        clearGuess()
    })
}
/*function scramble(index){
    var div = $('<div>')
    var thisLetterArray = thisGame["letterArray"]
    var scrambleButton = $('<button id="scrambleButton">scramble letters</button>')
    scrambleButton.click(function(){
        //scrambleLetters()
    })
    div.append(scrambleButton)
    $("#scramble").append(div)
    return div
}*/
//PREP FOR NEXT GUESS
function clearPreviousFeedback(){
    $("#feedback").empty()
    $("#feedbackguess").empty()
    $("#points").empty()
}
function emptyLetterTable(){
    for(var i = 1; i < 11; i++){
         $("#letter"+i).empty()
    }
}
//TIME MESSAGES
function sendEndTimeMessage(textboxAnswer, x){
    var d = new Date();
    var n = d.getTime();
    var logData = {
        "gameIndex": gameIndex,
        "guess": textboxAnswer,
        "endTime": n,
        "guessNumAdd": x
    }
    var message = {"type": "logEnd", "data":logData}
    ajax(message, function(result){})
}
function sendStartTimeMessage(){
    var d = new Date();
    var n = d.getTime();
    var logData = {
        
        "gameIndex": gameIndex,
        "startTime": n,
    }
    var message = {"type": "logStart", "data":logData}
    ajax(message, function(result){})
}
//EXTRA FUNCTIONS
function restart(){
    var message = {"type": "restart"}
    ajax(message, function(result){
        gameIndex = 0
        getAndDisplayGame(gameIndex)
    })
}
function viewInstructions(){
    alert("To play this game, you will look at the four pictures and try to guess the word/name of what the four pictures are representing. You will not need to use all of the letters given to you. For each level you will get 5 tries and a clue at each guess")
}
function displayResults(){
    var message = {"type": "results"}
    ajax(message, function(result){
        var jsonResult = JSON.parse(result)
        var results = jsonResult["results"]
        var pass = results["passed"]
        var notPass = results["failed"]
        var skip = results["skipped"]
        var totalGuesses = results["totalGuesses"]
        var score = results["score"]
        alert("passed: "+pass + "  failed: " + notPass+ "  skipped: " + skip+"   number of guesses: "+totalGuesses+"\nscore: "+score+"\ntry again by clicking on restart")
    })
    //restart()
}