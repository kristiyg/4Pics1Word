function ajax(message, callbackFunction){
    $.post(document.location.href, { args : JSON.stringify(message) }, callbackFunction)
}
var gameIndex = 0
var totalGuesses = 0
var imageLocation = "http://abstract.cs.washington.edu/~hmslydia/"
var games = []
/*
var game1 = {
    "answer": ["poker"],
    "imageArray": [imageLocation+"images/i/img11.jpg", imageLocation+"images/i/img12.jpg",imageLocation+"images/i/img13.jpg",imageLocation+"images/i/img14.jpg"],
    "passed": null,
    "letterArray": ["e","i","p","n","l","s","p","o","k","h","d","b","t","o","r","a"],
    "numOfGuesses": 0,
    "hint": "play the player, not the cards",
    "guessesMade": []
}
var game2 = {
    "answer": ["ireland"],
    "imageArray": [imageLocation+"images/i/img21.jpg", imageLocation+"images/i/img22.jpg",imageLocation+"images/i/img23.jpg",imageLocation+"images/i/img24.jpg"],
    "passed": null,
    "letterArray": ["e","i","p","n","l","s","p","o","k","h","d","b","t","o","r","a"],
    "numOfGuesses": 0,
    "hint": "lucky charms, but not the cereal",
    "guessesMade": []
}
var game3 = {
    "answer": ["meme"],
    "imageArray": [imageLocation+"images/i/img31.jpg", imageLocation+"images/i/img32.jpg",imageLocation+"images/i/img33.jpg",imageLocation+"images/i/img34.jpg"],
    "passed": null,
    "letterArray": ["e","e","p","n","m","m","p","o","k","h","d","b","t","o","r","a"],
    "numOfGuesses": 0,
    "hint": "the internet is home to this new cultural invention",
    "guessesMade": []
}
var game4 = {
    "answer": ["carbon"],
    "imageArray": [imageLocation+"images/i/img41.jpg", imageLocation+"images/i/img42.jpg",imageLocation+"images/i/img43.jpg",imageLocation+"images/i/img44.jpg"],
    "passed": null,
    "letterArray": ["a","i","c","n","l","s","p","o","k","h","d","b","t","r","n","b"],
    "numOfGuesses": 0,
    "hint": "it's *elementary*",
    "guessesMade": []
}
games.push(game1)
games.push(game2)
games.push(game3)
games.push(game4)
*/
var game1 = /*death star*/{
    "answer": ["death star"],
    "imageArray": [imageLocation+"images/word51.jpg", imageLocation+"images/word52.jpg",imageLocation+"images/word53.jpg",imageLocation+"images/word54.jpg"],
    "passed": null,
    "letterArray": ["a","i","e","n","l","s","p","o","m","h","d","b","t","t","r","a"],
    "numOfGuesses": 0,
    "hint": "name of the ship, two words",
    "guessesMade": []
}
games.push(game1)
var game2 = /*infrared*/{
    "answer": ["infrared"],
    "imageArray": [imageLocation+"images/word101.jpg", imageLocation+"images/word102.jpg",imageLocation+"images/word103.jpg",imageLocation+"images/word104.jpg"],
    "passed": null,
    "letterArray": ["r","l","n","p","m","i","f","n","s","t","o","d","e","f","c","r"],
    "numOfGuesses": 0,
    "hint": "some cameras have this feature",
    "guessesMade": []
}
games.push(game2)
var game3 = /*droid*/{
    "answer": ["droid, android"],
    "imageArray": [imageLocation+"images/word31.jpg", imageLocation+"images/word32.jpg",imageLocation+"images/word33.jpg",imageLocation+"images/word34.jpg"],
    "passed": null,
    "letterArray": ["m","l","e","r","i","s","p","a","n","d","w","h","g","o","c","d"],
    "numOfGuesses": 0,
    "hint": "similar to a robot",
    "guessesMade": []
}
games.push(game3)
var game4 = /*chloroplasts*/{
    "answer": ["chloroplasts", "chloroplast"],
    "imageArray": [imageLocation+"images/word61.jpg", imageLocation+"images/word62.jpg",imageLocation+"images/word63.jpg",imageLocation+"images/word64.jpg"],
    "passed": null,
    "letterArray": ["o","p","a","m","b","h","c","l","s","s","r","o","t","n","t","l"],
    "numOfGuesses": 0,
    "hint": "they conduct photosynthesis",
    "guessesMade": []
}
games.push(game4)
var game5 = /*lhospital*/{
    "answer": ["lhospital", "l'hospital", "lhopital", "l'hopital"],
    "imageArray": [imageLocation+"images/word21.jpg", imageLocation+"images/word22.jpg",imageLocation+"images/word23.jpg",imageLocation+"images/word24.jpg"],
    "passed":  null,
    "letterArray": ["i","l","o","m","h","n","a","t","f","g","s","u","p","c","l","a"],
    "numOfGuesses": 0,
    "hint": "mathematician whose name looks like he should be a doctor",
    "guessesMade": []
}
games.push(game5)
var game6 = /*andromeda*/{
    "answer": ["andromeda"],
    "imageArray": [imageLocation+"images/word41.jpg", imageLocation+"images/word42.jpg",imageLocation+"images/word43.jpg",imageLocation+"images/word44.jpg"],
    "passed": null,
    "letterArray": ["d","a","e","n","l","c","o","s","a","r","t","u","i","c","d","m"],
    "numOfGuesses": 0,
    "hint": "Perseus saved her before the monster ate her in greek mythology",
    "guessesMade": []
    
}
games.push(game6)
var game7 = /*helium*/{
    "answer": ["helium"],
    "imageArray": [imageLocation+"images/word71.jpg", imageLocation+"images/word72.JPG",imageLocation+"images/word73.jpg",imageLocation+"images/word74.jpg"],
    "passed": null,
    "letterArray": ["b","u","t","s","h","m","o","l","n","g","e","p","a","i","l","z"],
    "numOfGuesses": 0,
    "hint": "your voice can go up really high with this",
    "guessesMade": []
}
games.push(game7)
var game8 = /*euler*/{
    "answer": ["euler"],
    "imageArray": [imageLocation+"images/word81.jpg", imageLocation+"images/word82.jpg",imageLocation+"images/word83.jpg",imageLocation+"images/word84.jpg"],
    "passed": null,
    "letterArray": ["l","r","n","o","e","e","m","p","s","f","d","b","c","u","r","t"],
    "numOfGuesses": 0,
    "hint": "mathematician who came up with a formula showing the relationship between exponential and trigonometric functions",
    "guessesMade": []
}
games.push(game8)
var game9 = /*nanotube*/{
    "answer": ["nanotube", "nanotubes", "nano tube", "nano tubes"],
    "imageArray": [imageLocation+"images/word91.jpg", imageLocation+"images/word92.jpg",imageLocation+"images/word93.jpg",imageLocation+"images/word94.jpg"],
    "passed": null,
    "letterArray": ["s","o","n","n","e","l","m","g","t","b","h","c","d","y","a","u"],
    "numOfGuesses": 0,
    "hint": "they are really, really small",
    "guessesMade": []
}
games.push(game9)
var game10 = /*magnesium*/{
    "answer": ["magnesium"],
    "imageArray": [imageLocation+"images/word11.jpg", imageLocation+"images/word12.jpg",imageLocation+"images/word13.jpg",imageLocation+"images/word14.jpg"],
    "passed": null,
    "letterArray": ["a","s","m","t","g","i","o","l","m","n","r","c","h","d","e","u"],
    "numOfGuesses": 0,
    "hint": "periodic element number 12",
    "guessesMade": []
}
games.push(game10)

function setUp(){
    gameIndex = 0
    /*     //FOR TESTING   //create links for all the games
    for(var i = 0; i< games.length; i++){
        var thisGame = games[i]
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
    var space0 = $("<span id='space0'>")
    space0.html(" | ")
    $("#nav").append(space0)
    
    var newSpan1 = $("<span id='instructions' class = 'menu-item' >")
    newSpan1.html("instructions")
    console.log(newSpan1)
    $("#nav").append(newSpan1)
    $("#instructions").click(function() {
        viewInstructions()
    })
    
    var space = $("<span id='space'>")
    space.html(" | ")
    $("#nav").append(space)
    
    var newSpan1 = $("<span id='restart' class = 'menu-item' >")
    newSpan1.html("restart")
    $("#nav").append(newSpan1)
    $("#restart").click(function() {
        gameIndex = 0
        //reset all games to have no state
        for(var i = 0; i< games.length; i++){
            var thisGame = games[i]
            thisGame["passed"] = null
        }
        displayGame(gameIndex)

    })
    
    var space2 = $("<span id='space2'>")
    space2.html(" | ")
    $("#nav").append(space2)
    
    var newSpan3 = $("<span id='skip' class = 'menu-item' >")
    newSpan3.html("skip |")
    $("#nav").append(newSpan3)
    $("#skip").click(function() {
        var thisGame = games[gameIndex]
        thisGame["passed"] = "skipped"
        $("#feedback").empty()
        incorrect(5, gameIndex, thisGame["answer"])
    })
    
    $(".menu-item").hover(function(){
        $('.menu-item').css( 'cursor', 'pointer' )});
}
function displayGame(index){
//console.log("gameIndex: "+gameIndex)
    var thisGame = games[index]
    var thisImageArray = thisGame["imageArray"]
    var thisLetterArray = thisGame["letterArray"]
    $("#image1").attr('src',thisImageArray[0])
    $("#image2").attr('src',thisImageArray[1])
    $("#image3").attr('src',thisImageArray[2])
    $("#image4").attr('src',thisImageArray[3])
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
    $("#guess").empty()
    $("#feedback").empty()
    $("#hint").empty()     
    createTextbox(index)
    $('#textbox1').focus()
}
function createTextbox(index){
    var div = $('<div>')
    var textbox = $('<input type="textbox" id="textbox1" >')
    div.append(textbox)
    var thisGame = games[index]
    var thisGuessed = thisGame["numOfGuesses"]
    var checkButton = $('<button id="checkButton">check</button>')
    checkButton.click(function(){
        thisGuessed++
        checkAnswer(index,thisGuessed)
    })
    textbox.keypress(function(event){
        if( event.which == 13 ) {
            thisGuessed++
            checkAnswer(index,thisGuessed)
       }
    })
    div.append(checkButton)
    $("#guess").append(div)
    return div
}
function createFeedbackDiv(feedback){
    var div = $('<div>')
    $(div).html(feedback)
    return div
}
function createHintDiv(index){
    var div = $('<div>')
    var thisGame = games[index]
    var thisHint = thisGame["hint"]
    $(div).html(thisHint)
    return div
}
function checkAnswer(index,thisGuessed){
    totalGuesses++
    var textboxValue = $('#textbox1').val()
    var textboxAnswer = textboxValue.toLowerCase()
    $("#feedback").empty()
    var thisGame = games[gameIndex]
    thisGame["guessesMade"].push(textboxValue)
    var matchesAnswer = false
    for(var i = 0; i < thisGame["answer"].length; i++){
        if(textboxAnswer == thisGame["answer"][i]){
            matchesAnswer = true
            correct(index)
        }
        else{
        }
    }
    if(!matchesAnswer){
        incorrect(thisGuessed, index, thisGame["answer"])
        thisGame["passed"] = "failed"
    }
    //console.log(games[gameIndex]["passed"])
}
function correct(index){
    $("#feedback").append(createFeedbackDiv("correct"))
    $("#skip").hide()
    //var passed = games[gameIndex]["passed"]
    if(games[gameIndex]["passed"] == "passed"){
        //do nothing, just wait
    }
    else{
        games[gameIndex]["passed"] = "passed"
        setTimeout(function(){
            if(index< games.length-1){
                goToNext()
            }
            else{
                var d = new Date();
                var n = d.getTime();
                var message = {
                    id: ipAdd, 
                    time: n,
                    level: gameIndex+1,
                    guessTime: 30,
                    guesses: games[gameIndex]["numOfGuesses"],
                    passed: games[gameIndex]["passed"],
                    guessesMade: games[gameIndex]["guessesMade"]
                }
                ajax(message, function(result){})
                displayResults()
            }
        },1500);
    }
}
function incorrect(guesses, index, thisAnswer){
    $("#feedback").append(createFeedbackDiv("wrong"))
    $('#textbox1').val("")
    if(guesses==1){
        $("#skip").show()
    }
    else if(guesses == 3){
        $("#hint").append(createHintDiv(index))
    }
    else if(guesses == 5){
        alert("sorry, the answer(s) is/are "+games[gameIndex]["answer"])
        if(index >= games.length-1){
            var d = new Date();
            var n = d.getTime();
            var message = {
                id: ipAdd, 
                time: n,
                level: gameIndex+1,
                guessTime: 30,
                guesses: games[gameIndex]["numOfGuesses"],
                passed: games[gameIndex]["passed"],
                guessesMade: games[gameIndex]["guessesMade"]
            }
            ajax(message, function(result){})
            displayResults()
        }
        else{
            goToNext()
        }
    }
}
function goToNext(){
    var d = new Date();
    var n = d.getTime();
    var message = {
        id: ipAdd, 
        time: n,
        level: gameIndex+1,
        guessTime: 30,
        guesses: games[gameIndex]["numOfGuesses"],
        passed: games[gameIndex]["passed"],
        guessesMade: games[gameIndex]["guessesMade"]
    }
    ajax(message, function(result){ })
    //var indexOfNextGame = index + 1
    gameIndex++
    displayGame(gameIndex)
    $("#skip").hide()
}
function viewInstructions(){
    alert("To play this game, you will look at the four pictures and try to guess the word or single name of what the four pictures are representing. You will not need to use all of the letters given to you. For each level you will get 5 tries")
}
function displayResults(){
    var pass = 0
    var notPass = 0
    var skip = 0
    var score = 10;
    for(var i = 0; i< games.length; i++){
        var thisGame = games[i]
        if(thisGame["passed"] == "skipped"){
            skip++
        }
        else if(thisGame["passed"] == "passed"){
            pass++
            score+=10
        }
        else if(thisGame["passed"] == "failed"){
            notPass++
        }
    }
    score -= totalGuesses
    alert("passed: "+pass + "  failed: " + notPass+ "  skipped: " + skip+"   number of guesses: "+totalGuesses+"\nscore: "+score+"\ntry again by clicking on restart")
}
