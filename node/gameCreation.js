function ajax(message, callbackFunction){
    $.post(document.location.href, { args : JSON.stringify(message) }, callbackFunction)
}
var gameIndex = 0

function getAndDisplayGame(gameIndex){
    var message = {"type": "getGame", "gameIndex":gameIndex}
    ajax(message, function(result){
        var jsonResult = JSON.parse(result)
        var game = jsonResult["game"]
        setGame(game)
        displayGame()
        console.log("my ip address is: "+ ipAdd) 
        sendStartTimeMessage()
    })
}
function checkAnswer(){
    var textboxValue = $('#textbox1').val().trim()
    var textboxAnswer = textboxValue.toLowerCase()
    var id = ipAdd
    if(textboxValue != ""){
        var payload =  {"textboxAnswer": textboxAnswer, "gameIndex": gameIndex, "id": id}
        var message = {"type": "checkAnswer", "payload": payload}
        ajax(message, function(result){
            var jsonResult = JSON.parse(result)
            var isAnswerCorrect = jsonResult["rtn"]["isAnswerCorrect"]
            sendEndTimeMessage(textboxAnswer)
            if(isAnswerCorrect){
                correct(textboxAnswer)
            }
            else{
                incorrect(textboxAnswer)
            }
        })
        clearPreviousFeedback()
    }
}
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
}
function resetUIElts(){
    $("#guess").empty()
    $("#feedback").empty()
    $("#feedbackguess").empty()
    $("#points").empty()
    $("#hint").empty() 
    $("#scramble").empty() 
    createTextbox()
    $('#textbox1').focus()
}
function createTextbox(){
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
}
//FEEDBACK
function createFeedbackDiv(feedback){
    var div = $('<div>')
    $(div).html(feedback)
    return div
}
function createFeedbackGuessesDiv(){
    var div = $('<div>')
    var id = ipAdd
    var message = {"type": "guessesLeft", "gameIndex":gameIndex, "id": id}
    ajax(message, function(result){
        var jsonResult = JSON.parse(result)
        var guessLeft = jsonResult["guessLeft"]
        $(div).html("guesses left:"+ guessLeft)
    })
    return div
}
function createFeedbackPointsDiv(passed){
    var div = $('<div>')
    var id = ipAdd
    var message = {"type": "currentScore", "id": id}
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
            alert("ERROR createFeedbackPointsDiv passed:"+passed)
        }  
    })
    return div
}
//HINTS
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
        populateLetterTable()
    })
}
function takeAwayLetter2(index){
    var message = {"type": "removeLetterIndex2", "gameIndex": gameIndex}
    ajax(message, function(result){
        var jsonResult = JSON.parse(result)
        var letterIndexToChange = jsonResult["removeLetterIndex2"]
        var thisLetterArray = thisGame["letterArray"]
        thisLetterArray[letterIndexToChange-1] = ""
        populateLetterTable()
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
//PASSING LEVELS
function clearPreviousFeedback(){
    $("#feedback").empty()
    $("#feedbackguess").empty()
    $("#points").empty()
}
function correct(textboxAnswer){
    $("#feedback").append(createFeedbackDiv("correct"))
    $("#feedbackguess").append(createFeedbackGuessesDiv())
    $("#skip").hide()
    $("#guess").empty()
    $("#points").append(createFeedbackPointsDiv("right"))
    setTimeout(function(){
        if(!isLastGame()){
            goToNext(textboxAnswer)
        }
        else{
            //sendGuessesMessage()
            displayResults()
        }
    },1500);
}
function skip(){
    var id = ipAdd
    var message = {"type": "skip", "gameIndex": gameIndex, "id": id}
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
    $('#textbox1').val("")
    sendStartTimeMessage()
}
function displayFeedbackForWrong(){
    $("#feedback").append(createFeedbackDiv("wrong"))
    $("#feedbackguess").append(createFeedbackGuessesDiv())
    $("#points").append(createFeedbackPointsDiv("wrong"))
}
function displayHints(){
    var id = ipAdd
    var message = {"type": "numGuessesMade", "gameIndex": gameIndex, "id": id}
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
    var id = ipAdd
    var message = {"type": "getAnswer", "gameIndex": gameIndex, "id": id}
    ajax(message, function(result){
        var jsonResult = JSON.parse(result)
        var answer = jsonResult["answer"]
        alert("sorry, the answer(s) is/are "+ answer)
    })
    if( isLastGame() ){            
        //sendGuessesMessage()
        displayResults()
    }
    else{
        goToNext()
    }
}
function isLastGame(){
    return gameIndex >= 3
}
function sendEndTimeMessage(textboxAnswer){
    var d = new Date();
    var n = d.getTime();
    var logData = {
        "id": ipAdd,
        "gameIndex": gameIndex,
        "guess": textboxAnswer,
        "endTime": n,
    }
    var message = {"type": "logEnd", "data":logData}
    ajax(message, function(result){})
}
function sendStartTimeMessage(){
    var d = new Date();
    var n = d.getTime();
    var logData = {
        "id": ipAdd,
        "gameIndex": gameIndex,
        "startTime": n,
    }
    var message = {"type": "logStart", "data":logData}
    ajax(message, function(result){})
}
function goToNext(textboxAnswer){
    //sendGuessesMessage()
    gameIndex++
    getAndDisplayGame(gameIndex)
    $("#skip").hide()
}
//EXTRA FUNCTIONS
function restart(){
    var id = ipAdd
    var message = {"type": "restart", "id": id}
    ajax(message, function(result){
        gameIndex = 0
        getAndDisplayGame(gameIndex)
    })
}
function viewInstructions(){
    alert("To play this game, you will look at the four pictures and try to guess the word/name of what the four pictures are representing. You will not need to use all of the letters given to you. For each level you will get 5 tries and a clue at each guess")
}
function displayResults(){
    var id = ipAdd
    var message = {"type": "results", "id": id}
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