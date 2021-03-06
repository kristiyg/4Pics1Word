function ajax(message, callbackFunction){
    $.post(document.location.href, { args : JSON.stringify(message) }, callbackFunction)
}
var gameIndex = 0
var partialGuess = []

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
        partialGuess = []
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
    var countLettersGuessed = 0
    for(var i = 1; i < 11; i++){
        if(thisLetterArray[i-1] != ""){
            var letterIndex = i-1
            var button = $("<button id='letter"+i+"button' class = 'letterButton'>")
            button.html(thisLetterArray[letterIndex])
            $("#letter"+i).append(button)        
            var wrap = function(letterIndexPrime, iPrime){
                $("#letter"+iPrime+"button").click(function(){
                    addLetter(thisLetterArray[letterIndexPrime], iPrime)
                })
            }
            wrap(letterIndex, i)
        }
    }
    
    $(".letterButton").hover(function(){
        $('.letterButton').css( 'cursor', 'pointer')
    });
}
function addLetter(letter, letterNum){
    var answerLength = thisGame["answerLength"]
    if(partialGuess.length < answerLength){
        partialGuess.push(letter)
        displayPartialGuess(partialGuess, answerLength)
        $("#letter"+letterNum).empty()
    }
}
function displayPartialGuess(partialGuessArray, answerLength){
    $("#guess").empty()
    for(var i in partialGuessArray){
        $("#guess").append(partialGuessArray[i])
    }
    var numGuessedLetters = partialGuessArray.length
    var spacesNeeded = answerLength - numGuessedLetters
    var spaces = " _"
    if(spacesNeeded == 0){
        createCheckButton()
    }
    else{
        for(var x = 0; x < spacesNeeded; x++){
            $("#guess").append(spaces)
        }
    } 
}
function resetUIElts(){
    clearGuess()
    $("#check").empty()
    $("#feedback").empty()
    $("#feedbackguess").empty()
    $("#points").empty()
    $("#hint").empty() 
    $("#scramble").empty()
    createClearButton()
    //$('#textbox1').focus()
}
function showSpaces(){
    var thisAnswerLength = thisGame["answerLength"]
    var spaces = ""
    for(var i = 0; i < thisAnswerLength; i++){
        spaces += "_ "
    }
    $("#guess").append(spaces)
}
function createCheckButton(){
    var div = $('<div>')
    var checked = false
    var checkButton = $('<button id="checkButton" class="checkClear">check</button>')
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
    if(guess != "" && partialGuess.length == thisGame["answerLength"]){
        var payload =  {"textboxAnswer": guess, "gameIndex": gameIndex}
        var message = {"type": "checkAnswer", "payload": payload}
        ajax(message, function(result){
            var jsonResult = JSON.parse(result)
            var isAnswerCorrect = jsonResult["rtn"]["isAnswerCorrect"]
            sendEndTimeMessage(guess, -1)
            $("#checkButton").remove()
            if(isAnswerCorrect){
                correct(guess)
            }
            else{
                incorrect(guess)
                clearGuess()
            }
        })
        clearPreviousFeedback()
    }
}
function createClearButton(){
    var div = $('<div>')
    var clearButton = $('<button id="clearButton" class="checkClear">clear</button>')
    clearButton.click(function(){
        clearGuess()
    })
    div.append(clearButton)
    $("#check").append(div)
    return div
}
function clearGuess(){
    $("#guess").empty()
    partialGuess = []
    emptyLetterTable()
    populateLetterTable()
    showSpaces()
    $("#checkButton").remove()
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
        
        if(numGuessesMade == 1){
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
            takeAwayLetter2(gameIndex)
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
        var indexPlusOne = letterIndexToChange+1
        var thisLetterArray = thisGame["letterArray"]
        thisLetterArray[letterIndexToChange] = ""
        clearGuess()
        $("#letter"+indexPlusOne).empty()
        console.log("1:"+thisLetterArray)
        console.log(indexPlusOne)
    })
}
function takeAwayLetter2(index){
    var message = {"type": "removeLetterIndex2", "gameIndex": gameIndex}
    ajax(message, function(result){
        var jsonResult = JSON.parse(result)
        var letterIndexToChange2 = jsonResult["removeLetterIndex2"]
        var indexPlusOne2 = letterIndexToChange2+1
        var letterIndexToChange1 = jsonResult["removeLetterIndex1"]
        var indexPlusOne1 = letterIndexToChange1+1
        var thisLetterArray = thisGame["letterArray"]
        thisLetterArray[letterIndexToChange2] = ""
        clearGuess()
        $("#letter"+indexPlusOne2).empty()
        $("#letter"+indexPlusOne1).empty()
        
        console.log("2:"+thisLetterArray)
        console.log(indexPlusOne2)
        console.log(indexPlusOne1)
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
//EXTRA FUNCTION
function restart(){
    var message = {"type": "restart"}
    ajax(message, function(result){
        gameIndex = 0
        getAndDisplayGame(gameIndex)
    })
}
function viewInstructions(){
    alert("To play this game, you will look at the four pictures and try to guess the word that the four pictures are representing. You will not need to use all of the letters given to you. For each level you will get 5 tries and a clue at each guess")
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
        alert("passed: "+pass + "  failed: " + notPass+ "  skipped: " + skip+"   number of guesses: "+totalGuesses+"\nscore: "+score+"/50"+"\ntry again by clicking on restart")
    })
    //restart()
}