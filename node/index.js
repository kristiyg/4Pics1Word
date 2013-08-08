//start server
var express = require('express');
fs = require('fs');
app = express();

app.use(express.cookieParser()); 
app.use(express.session({ secret: "keyboard cat" }))
app.use(express.bodyParser());

////////////////////////
// Data structure
////////////////////////

allData = {}
var log = []

//GAME DATA
var games = []
var imageLocation = "http://abstract.cs.washington.edu/~hmslydia/"

/*
var game1 = /*droid{
    basicGame: {
        "imageArray": [imageLocation+"images/word31.jpg", imageLocation+"images/word32.jpg",imageLocation+"images/word33.jpg",imageLocation+"images/word34.jpg"],
        "letterArray": ["m","l","e","r","i","s","p","a","n","d","w","h","g","o","c","d"],
    },
    "letterRemove": [3, 6],
    "hint1": "similar to a robot",
    "hint2": "look at the green guy",    
    "answer": ["droid", "android"],
}
games.push(game1)
var game2 = /*einstein{
    basicGame: {
        "imageArray": [imageLocation+"images/pic21.jpg", imageLocation+"images/pic22.jpg",imageLocation+"images/pic23.jpg",imageLocation+"images/pic24.jpg"],
        "letterArray": ["t","s","n","n","y","i","i","p","m","f","g","e","e","w","c","r"],
    },
    "letterRemove": [10, 13],
    "hint1": "famous mathematician",
    "hint2": "known for his e = mc^2 equation",
    "answer": ["einstein"],
}
games.push(game2)
var game3 = /*helium{
    basicGame: {
        "imageArray": [imageLocation+"images/word71.jpg", imageLocation+"images/word72.JPG",imageLocation+"images/word73.jpg",imageLocation+"images/word74.jpg"],
        "letterArray": ["b","u","t","s","h","m","o","l","n","g","e","p","a","i","l","z"],
    },
    "letterRemove": [3, 10],
    "hint1": "your voice can go up really high with this",
    "hint2": "balloons go up with this",
    "answer": ["helium"],
}
games.push(game3)
var game4 = /*quidditch{
    basicGame: {
        "imageArray": [imageLocation+"images/pic41.jpg", imageLocation+"images/pic42.jpg",imageLocation+"images/pic43.jpg",imageLocation+"images/pic44.jpg"],
        "letterArray": ["u","i","b","d","d","l","s","p","m","t","n","h","h","c","i","q"],
    },
    "letterRemove": [2, 9],
    "hint1": "the only game played in the air",
    "hint2": "popular sport in harry potter",
    "answer": ["quidditch", "quiditch"],
}
games.push(game4)
var game5 = /*carbon{ 
    basicGame: {
        "imageArray": [imageLocation+"images/lydiasGames/img41.jpg", imageLocation+"/images/lydiasGames/img42.jpg",imageLocation+"/images/lydiasGames/img43.jpg",imageLocation+"/images/lydiasGames/img44.jpg"],
        "letterArray": ["a","c","p","z","r","l","h","d","e","m","b","s","t","k","o","n"],
    },
    "letterRemove": [12, 8],
    "hint1": "it's *elementary*",
    "hint2": "it makes drinks fizzy",
    "answer": ["carbon"],
}
games.push(game5)
var game6 = /*deathstar {
    basicGame: {
        "imageArray": [imageLocation+"images/word51.jpg", imageLocation+"images/word52.jpg",imageLocation+"images/word53.jpg",imageLocation+"images/word54.jpg"],
        "letterArray": ["a","i","e","n","l","s","p","o","m","h","d","b","t","t","r","a"],
    },
    "letterRemove": [2, 8],
    "hint1": "name of the ship darth vader commands",
    "hint2": "it is spherical like a star",
    "answer": ["death star","deathstar"],
}
games.push(game6)
var game7 = /*calculus{
    basicGame: {
        "imageArray": [imageLocation+"images/word81.jpg", imageLocation+"images/pic72.jpg",imageLocation+"images/pic73.jpg",imageLocation+"images/word21.jpg"],
        "letterArray": ["l","c","m","a","t","n","m","p","l","z","e","k","s","u","u","c"],
    },
    "letterRemove": [2, 4],
    "hint1": "uses derivatives and integrals",
    "hint2": "complicated math",
    "answer": ["calculus"],
}
games.push(game7)
var game8 = /*magnesium{
    basicGame: {
        "imageArray": [imageLocation+"images/word11.jpg", imageLocation+"images/word12.jpg",imageLocation+"images/word13.jpg",imageLocation+"images/word14.jpg"],
        "letterArray": ["a","s","m","t","g","i","o","l","m","n","r","c","h","d","e","u"],  
    },
    "letterRemove": [4, 11],
    "hint1": "periodic element number 12",
    "hint2": "element mg",
    "answer": ["magnesium"],
}
games.push(game8)
var game9 = /*infrared{
    basicGame: {
        "imageArray": [imageLocation+"images/word101.jpg", imageLocation+"images/word102.jpg",imageLocation+"images/word103.jpg",imageLocation+"images/word104.jpg"],
        "letterArray": ["r","a","n","p","m","i","f","n","s","t","o","d","e","f","c","r"],
    },
    "letterRemove": [10, 11],
    "hint1": "some cameras have this feature",
    "hint2": "used for night vision, meterorology, and thermography",
    "answer": ["infrared"],
}
games.push(game9)
var game10 = /*andromeda{
    basicGame: {
        "imageArray": [imageLocation+"images/word41.jpg", imageLocation+"images/word42.jpg",imageLocation+"images/word43.jpg",imageLocation+"images/word44.jpg"],
        "letterArray": ["d","a","e","n","l","c","o","s","a","r","t","u","i","c","d","m"],
    },
    "letterRemove": [5, 13],
    "hint1": "Perseus saved her before the monster ate her in greek mythology",
    "hint2": "name of a known galaxy",
    "answer": ["andromeda"],
}
games.push(game10)
*/

var game1 = /*robot*/{
    basicGame: {
        "imageArray": [imageLocation+"images/robot1.jpg", imageLocation+"images/robot2.jpg",imageLocation+"images/robot3.jpg",imageLocation+"images/robot4.jpg"],
        "letterArray": ["o","o","a","p","e","t","b","l","s","r"],
    },
    "letterRemove": [7, 4],
    "hint1": "",
    "hint2": "",    
    "answer": ["robot", "robots"],
}
games.push(game1)
var game2 = /*oxygen*/{
    basicGame: {
        "imageArray": [imageLocation+"images/oxygen1.jpg", imageLocation+"images/oxygen2.jpg",imageLocation+"images/oxygen3.jpg",imageLocation+"images/oxygen4.jpg"],
        "letterArray": ["n","e","o","m","h","y","r","a","g","x"],
    },
    "letterRemove": [6, 7],
    "hint1": "it is in the air",
    "hint2": "we breathe it",    
    "answer": ["oxygen"],
}
games.push(game2)
var game3 = /*jedi*/{
    basicGame: {
        "imageArray": [imageLocation+"images/jedi1.jpg", imageLocation+"images/jedi2.jpg",imageLocation+"images/jedi3.jpg",imageLocation+"images/jedi4.jpg"],
        "letterArray": ["d","l","h","j","s","g","a","r","i","e"],
    },
    "letterRemove": [7, 6],
    "hint1": "they use the force",
    "hint2": "they are the good guys in star wars",    
    "answer": ["jedi", "jedis"],
}
games.push(game3)
var game4 = /*saturn*/{
    basicGame: {
        "imageArray": [imageLocation+"images/saturn1.jpg", imageLocation+"images/saturn2.jpg",imageLocation+"images/saturn3.jpg",imageLocation+"images/saturn4.jpg"],
        "letterArray": ["a","u","r","c","e","p","t","b","s","n"],
    },
    "letterRemove": [3, 7],
    "hint1": "it has many asteroids around it",
    "hint2": "it's a planet",    
    "answer": ["saturn"],
}
games.push(game4)
var game5 = /*calculus*/{
    basicGame: {
        "imageArray": [imageLocation+"images/word81.jpg", imageLocation+"images/pic72.jpg",imageLocation+"images/pic73.jpg",imageLocation+"images/word21.jpg"],
        "letterArray": ["l","u","c","c","m","l","t","s","u","a"],
    },
    "letterRemove": [4, 6],
    "hint1": "uses derivatives and integrals",
    "hint2": "complicated math",
    "answer": ["calculus"],
}
games.push(game5)


//USER DATA
var playerData = {}

function getResults(id){
    var pass = 0
    var notPass = 0
    var skip = 0
    var score = 5;
    for(var i = 0; i< 10; i++){
        if(playerData[id]["game"+i]["passed"] == "skipped"){
            skip++
        }
        else if(playerData[id]["game"+i]["passed"] == "passed"){
            pass++
            score+=10
        }
        else if(playerData[id]["game"+i]["passed"] == "failed"){
            notPass++
        }
    }
    score -= playerData[id]["totalGuesses"]
    return {"passed": pass, "failed": notPass, "skipped": skip, "totalGuesses": playerData[id]["totalGuesses"], "score": score} 
}
function handleGuess(guess, gameIndex, id){
//console.log(playerData[id])
    var thisGame = games[gameIndex]
    var numGuessesMade = playerData[id]["game"+gameIndex]["guessesMade"].length
    playerData[id]["game"+gameIndex]["guessesMade"].push(guess)
    //checked = true
    playerData[id]["totalGuesses"]++
    playerData[id]["totalScore"]--
    var correctAnswer = isAnswerCorrect(guess, thisGame)
    var response = {"isAnswerCorrect": correctAnswer}
    if(correctAnswer){
        playerData[id]["game"+gameIndex]["passed"] = "passed"
        playerData[id]["totalScore"]+=10
    }
    return response
}
function isAnswerCorrect(guess, thisGame){
    var correctAnswer = false
    var allCorrectAnswers = thisGame["answer"]
    //console.log(guess + "answers:"+ allCorrectAnswers)
    for(var i = 0; i < allCorrectAnswers.length; i++){
        var thisCorrectAnswer = allCorrectAnswers[i]
        if(guess == thisCorrectAnswer){
            correctAnswer = true
        }
    }
    return correctAnswer
}
function instantiatePlayer(id){
    playerData[id] = {
        "game0": {"passed": null, "guessesMade": []},
        "game1": {"passed": null, "guessesMade": []},
        "game2": {"passed": null, "guessesMade": []},
        "game3": {"passed": null, "guessesMade": []},
        "game4": {"passed": null, "guessesMade": []},
        "game5": {"passed": null, "guessesMade": []},
        "game6": {"passed": null, "guessesMade": []},
        "game7": {"passed": null, "guessesMade": []},
        "game8": {"passed": null, "guessesMade": []},
        "game9": {"passed": null, "guessesMade": []},
        "totalGuesses": 0,
        "totalScore": 5,
    }
    return playerData[id]
}
////////////////////////
// Client side includes
////////////////////////
app.get('/game.html', function(request, response){
    if(request.session.logged){
        console.log("Welcome back: "+request.session.id)
    }else{
        request.session.logged = true
        console.log("new session: "+request.session.id)
        var id = request.session.id
        request.session.counter = 0
        request.session.currentUserName = id+"-"+request.session.counter
        instantiatePlayer(request.session.currentUserName)
    }
	response.sendfile('game.html')
});
app.get('/playerData', function(request, response){
	response.send(playerData)
});
app.get('/log', function(request, response){
	response.send(log)
});
app.get('/style.css', function(request, response){
	response.sendfile('style.css')
});
app.get('/gameCreation.js', function(request, response){
	response.sendfile('gameCreation.js')
});
app.get('/json2.js', function(request, response){
	response.sendfile('json2.js')
});
/////////////////////////////////
// Client Communication Handling
/////////////////////////////////
app.post('/game.html', function(request, response){
    var message = JSON.parse(request.body["args"])
    var messageType = message["type"]
    
    //console.log(message)
    if(messageType == "logEnd"){
        var messageData = message["data"]
        var gameIndex = messageData["gameIndex"]
        var guessNumAdd = messageData["guessNumAdd"]
        var id = request.session.currentUserName
        messageData["guessNum"] = playerData[id]["game"+gameIndex]["guessesMade"].length + guessNumAdd
        messageData["startTime"] = null
        messageData["id"] = id
        log.push(messageData)
        //console.log(messageData)
        checkpoint()
        response.send("")
    }
    else if (messageType == "logStart"){
        var messageData = message["data"]
        var id = request.session.currentUserName
        var gameIndex = messageData["gameIndex"]
        //console.log(playerData)
        messageData["guessNum"] = playerData[id]["game"+gameIndex]["guessesMade"].length
        messageData["endTime"] = null
        messageData["id"] = id
        log.push(messageData)
        //console.log(messageData)
        checkpoint()
        response.send("")
    }
    else if (messageType=="getGame"){
        var gameIndex = message["gameIndex"]
        var game = games[gameIndex]["basicGame"]
        response.send(JSON.stringify({"game":game}))
    }
    else if (messageType=="checkAnswer"){
        var payload = message["payload"]
        var textboxAnswer = payload["textboxAnswer"]
        var gameIndex = payload["gameIndex"]
        var id = request.session.currentUserName
        var rtn = handleGuess(textboxAnswer, gameIndex, id)
        response.send(JSON.stringify({"rtn":rtn}))
    }
    else if (messageType=="results"){
        var id = request.session.currentUserName
        var results = getResults(id)
        response.send(JSON.stringify({"results":results}))
    }
    else if (messageType=="guessesLeft"){
        var gameIndex = message["gameIndex"]
        var id = request.session.currentUserName
        var numGuessesMade = playerData[id]["game"+gameIndex]["guessesMade"].length
        var guessLeft = 5 - numGuessesMade
        response.send(JSON.stringify({"guessLeft":guessLeft}))
    }
    else if (messageType=="currentScore"){
        var id = request.session.currentUserName
        var currentScore = playerData[id]["totalScore"]
        response.send(JSON.stringify({"currentScore":currentScore}))
    }
    else if (messageType=="numGuessesMade"){
        var id = request.session.currentUserName
        var gameIndex = message["gameIndex"]
        var numGuessesMade = playerData[id]["game"+gameIndex]["guessesMade"].length
        response.send(JSON.stringify({"numGuessesMade":numGuessesMade}))
    }
    else if (messageType=="hint1"){
        var gameIndex = message["gameIndex"]
        var thisGame = games[gameIndex]
        var hint1 = thisGame["hint1"]
        response.send(JSON.stringify({"hint1": hint1}))
    }
    else if (messageType=="hint2"){
        var gameIndex = message["gameIndex"]
        var thisGame = games[gameIndex]
        var hint2 = thisGame["hint2"]
        response.send(JSON.stringify({"hint2": hint2}))
    }
    else if (messageType=="removeLetterIndex1"){
        var gameIndex = message["gameIndex"]
        var thisGame = games[gameIndex]
        var game = thisGame
        var removeLetterIndex1 = game["letterRemove"][0]
        response.send(JSON.stringify({"removeLetterIndex1": removeLetterIndex1}))
    }
    else if (messageType=="removeLetterIndex2"){
        var gameIndex = message["gameIndex"]
        var thisGame = games[gameIndex]
        var game = thisGame
        var removeLetterIndex2 = game["letterRemove"][1]
        response.send(JSON.stringify({"removeLetterIndex2": removeLetterIndex2}))
    }
    else if (messageType=="getAnswer"){
        var id = request.session.currentUserName
        var gameIndex = message["gameIndex"]
        if(playerData[id]["game"+gameIndex]["passed"] == null){
            playerData[id]["game"+gameIndex]["passed"] = "failed"
        }
        var answer = games[gameIndex]["answer"]
        response.send(JSON.stringify({"answer":answer}))
    }
    else if (messageType=="skip"){
        var id = request.session.currentUserName
        var gameIndex = message["gameIndex"]
        playerData[id]["game"+gameIndex]["passed"] = "skipped"
        var passed = playerData[id]["game"+gameIndex]["passed"]
        response.send(JSON.stringify({"passed": passed}))
    }
    else if (messageType=="restart"){
        request.session.counter++
        var id = request.session.id
        request.session.currentUserName = id+"-"+request.session.counter
        instantiatePlayer(request.session.currentUserName)
        response.send("")
    }
});

/////////////////////////////////
// Save Database
/////////////////////////////////
function checkpoint() {
    allData["log"] = log
    allData["playerData"] = playerData
    writeToFile(allData);
}
function writeToFile(j){
    var ret = "data = "+JSON.stringify(j)
    var d = new Date();
    var t = d.getTime()
    fs.writeFile("./saved/data"+t+".js", ret, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    }); 
}
// force a checkpoint
app.get('/checkpoint', function(request, response){
    checkpoint();
    response.send("checkpointed");
});

//////////////////////////////////////////
//// start serving
//////////////////////////////////////////

app.listen(3000);
console.log('Listening on port 3000');
//checkpoint.restoreData(1)