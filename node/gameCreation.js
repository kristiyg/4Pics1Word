function ajax(message, callbackFunction){
    $.post(document.location.href, { args : JSON.stringify(message) }, callbackFunction)
}
var gameIndex = 0
/*
var totalGuesses = 0
var totalScore = 10
var imageLocation = "http://abstract.cs.washington.edu/~hmslydia/"
var games = []
//thisGame = {}
var game1 = /*death star{
    "answer": ["death star","deathstar"],
    "imageArray": [imageLocation+"images/word51.jpg", imageLocation+"images/word52.jpg",imageLocation+"images/word53.jpg",imageLocation+"images/word54.jpg"],
    "passed": null,
    "letterArray": ["a","i","e","n","l","s","p","o","m","h","d","b","t","t","r","a"],
    "letterRemove": [2, 8],
    "hint1": "name of the ship darth vader commands",
    "hint2": "it is spherical like a star",
    "guessesMade": []
}
games.push(game1)
var game2 = /*infrared{
    "answer": ["infrared"],
    "imageArray": [imageLocation+"images/word101.jpg", imageLocation+"images/word102.jpg",imageLocation+"images/word103.jpg",imageLocation+"images/word104.jpg"],
    "passed": null,
    "letterArray": ["r","a","n","p","m","i","f","n","s","t","o","d","e","f","c","r"],
    "letterRemove": [10, 11],
    "hint1": "some cameras have this feature",
    "hint2": "used for night vision, meterorology, and thermography",
    "guessesMade": []
}
games.push(game2)
var game3 = /*droid{
    "answer": ["droid", "android"],
    "imageArray": [imageLocation+"images/word31.jpg", imageLocation+"images/word32.jpg",imageLocation+"images/word33.jpg",imageLocation+"images/word34.jpg"],
    "passed": null,
    "letterArray": ["m","l","e","r","i","s","p","a","n","d","w","h","g","o","c","d"],
    "letterRemove": [3, 6],
    "hint1": "similar to a robot",
    "hint2": "look at the green guy",
    "guessesMade": []
}
games.push(game3)
var game4 = /*chloroplasts{
    "answer": ["chloroplasts", "chloroplast"],
    "imageArray": [imageLocation+"images/word61.jpg", imageLocation+"images/word62.jpg",imageLocation+"images/word63.jpg",imageLocation+"images/word64.jpg"],
    "passed": null,
    "letterArray": ["o","p","a","m","b","h","c","l","s","s","r","o","t","n","t","l"],
    "letterRemove": [4, 5],
    "hint1": "they conduct photosynthesis",
    "hint2": "they are small green balls that create the sugar that plants eat",
    "guessesMade": []
}
games.push(game4)
var game5 = /*lhospital{
    "answer": ["lhospital", "l'hospital", "lhopital", "l'hopital"],
    "imageArray": [imageLocation+"images/word21.jpg", imageLocation+"images/word22.jpg",imageLocation+"images/word23.jpg",imageLocation+"images/word24.jpg"],
    "passed":  null,
    "letterArray": ["i","l","o","m","h","n","a","t","f","g","s","u","p","c","l","a"],
    "letterRemove": [4, 6],
    "hint1": "mathematician whose name looks like he should be a doctor",
    "hint2": "he created an important calulus rule having to do with answers that are zero divided by zero",
    "guessesMade": []
}
games.push(game5)
var game6 = /*andromeda{
    "answer": ["andromeda"],
    "imageArray": [imageLocation+"images/word41.jpg", imageLocation+"images/word42.jpg",imageLocation+"images/word43.jpg",imageLocation+"images/word44.jpg"],
    "passed": null,
    "letterArray": ["d","a","e","n","l","c","o","s","a","r","t","u","i","c","d","m"],
    "letterRemove": [5, 13],
    "hint1": "Perseus saved her before the monster ate her in greek mythology",
    "hint2": "name of a known galaxy",
    "guessesMade": []
    
}
games.push(game6)
var game7 = /*helium{
    "answer": ["helium"],
    "imageArray": [imageLocation+"images/word71.jpg", imageLocation+"images/word72.JPG",imageLocation+"images/word73.jpg",imageLocation+"images/word74.jpg"],
    "passed": null,
    "letterArray": ["b","u","t","s","h","m","o","l","n","g","e","p","a","i","l","z"],
    "letterRemove": [3, 10],
    "hint1": "your voice can go up really high with this",
    "hint2": "balloons go up with this",
    "guessesMade": []
}
games.push(game7)
var game8 = /*euler{
    "answer": ["euler"],
    "imageArray": [imageLocation+"images/word81.jpg", imageLocation+"images/word82.jpg",imageLocation+"images/word83.jpg",imageLocation+"images/word84.jpg"],
    "passed": null,
    "letterArray": ["l","r","n","o","e","e","m","p","s","f","d","b","c","u","r","t"],
    "letterRemove": [4, 8],
    "hint1": "mathematician who came up with a formula showing the relationship between exponential and trigonometric functions",
    "hint2": "spelled almost like mule with an r on the end",
    "guessesMade": []
}
games.push(game8)
var game9 = /*nanotube{
    "answer": ["nanotube", "nanotubes", "nano tube", "nano tubes"],
    "imageArray": [imageLocation+"images/word91.jpg", imageLocation+"images/word92.jpg",imageLocation+"images/word93.jpg",imageLocation+"images/word94.jpg"],
    "passed": null,
    "letterArray": ["s","o","n","n","e","l","m","g","t","b","h","c","d","y","a","u"],
    "letterRemove": [6, 12],
    "hint1": "they are nano size",
    "hint2": "they are a tube shape",
    "guessesMade": []
}
games.push(game9)
var game10 = /*magnesium{
    "answer": ["magnesium"],
    "imageArray": [imageLocation+"images/word11.jpg", imageLocation+"images/word12.jpg",imageLocation+"images/word13.jpg",imageLocation+"images/word14.jpg"],
    "passed": null,
    "letterArray": ["a","s","m","t","g","i","o","l","m","n","r","c","h","d","e","u"],
    "letterRemove": [4, 11],
    "hint1": "periodic element number 12",
    "hint2": "element mg",
    "guessesMade": []
}
games.push(game10)
*/

function getAndDisplayGame(gameIndex){
    var message = {"type": "getGame", "gameIndex":gameIndex}
    ajax(message, function(result){
        var jsonResult = JSON.parse(result)
        var game = jsonResult["game"]
        setGame(game)
        displayGame()
    })
}
function checkAnswer(){
    var textboxValue = $('#textbox1').val()
    var textboxAnswer = textboxValue.toLowerCase()
    var payload =  {"textboxAnswer": textboxAnswer, "gameIndex": gameIndex}
    var message = {"type": "checkAnswer", "payload": payload}
    ajax(message, function(result){
        var jsonResult = JSON.parse(result)
        var isAnswerCorrect = jsonResult["rtn"]["isAnswerCorrect"]
        var nextAction = jsonResult["rtn"]["nextAction"]
        if(isAnswerCorrect){
            correct()
        }
        else{
            incorrect()
        }
    })
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
                //checked = true
            }
            clearPreviousFeedback()
    })
    textbox.keypress(function(event){
        if( event.which == 13 ) {
            if(checked == false)
            {
                checkAnswer()
                //checked = true
            }
            clearPreviousFeedback()
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
    var message = {"type": "guessesLeft", "gameIndex":gameIndex}
    ajax(message, function(result){
        var jsonResult = JSON.parse(result)
        var guessLeft = jsonResult["guessLeft"]
        $(div).html("guesses left:"+ guessLeft)
    })
    return div
}
function createFeedbackPointsDiv(passed){
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
function scramble(index){
    var div = $('<div>')
    var thisLetterArray = thisGame["letterArray"]
    var scrambleButton = $('<button id="scrambleButton">scramble letters</button>')
    scrambleButton.click(function(){
        alert("scrambled letters")//scrambleLetters()
    })
    div.append(scrambleButton)
    $("#scramble").append(div)
    return div
}
//PASSING LEVELS
function clearPreviousFeedback(){
    $("#feedback").empty()
    $("#feedbackguess").empty()
    $("#points").empty()
}
function correct(){
    $("#feedback").append(createFeedbackDiv("correct"))
    $("#feedbackguess").append(createFeedbackGuessesDiv())
    $("#skip").hide()
    $("#points").append(createFeedbackPointsDiv("right"))
    
    setTimeout(function(){
        if(!isLastGame()){
            goToNext()
        }
        else{
            //sendGuessesMessage()
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
    $('#textbox1').val("")
}
function displayFeedbackForWrong(){
    $("#feedback").append(createFeedbackDiv("wrong"))
    $("#feedbackguess").append(createFeedbackGuessesDiv())
    $("#points").append(createFeedbackPointsDiv("wrong"))
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
            scramble(gameIndex)
        }
        else if(numGuessesMade == 5){
            handleLastGuessForThisGame()
        }
    })
}
function handleLastGuessForThisGame(){
    var message = {"type": "getAnswer", "gameIndex": gameIndex}
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
    return gameIndex >= 9
}
/*function sendGuessesMessage(){
    var d = new Date();
    var n = d.getTime();
    var game = games[gameIndex]
    var logData = {
        id: ipAdd, 
        time: n,
        level: gameIndex+1,
        guessTime: 30,
        //guesses: game["guessesMade"].length,
        //passed: game["passed"],
        //guessesMade: game["guessesMade"]
    }
    var message = {"type": "log", "data":logData}
    ajax(message, function(result){})
}*/
function goToNext(){
    //sendGuessesMessage()
    gameIndex++
    getAndDisplayGame(gameIndex)
    $("#skip").hide()
}
//EXTRA FUNCTIONS
/*function restart(){
    gameIndex = 0
    //reset all games to have no state
    for(var i = 0; i< games.length; i++){
        var thisGame = games[i]
        thisGame["passed"] = null
    }
    displayGame(gameIndex)
}*/
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