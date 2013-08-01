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

allData = []
//GAME DATA
var games = []
var imageLocation = "http://abstract.cs.washington.edu/~hmslydia/"
var game1 = /*death star*/{
    basicGame: {
        "imageArray": [imageLocation+"images/word51.jpg", imageLocation+"images/word52.jpg",imageLocation+"images/word53.jpg",imageLocation+"images/word54.jpg"],
        "letterArray": ["a","i","e","n","l","s","p","o","m","h","d","b","t","t","r","a"],
    },
    "letterRemove": [2, 8],
    "hint1": "name of the ship darth vader commands",
    "hint2": "it is spherical like a star",
    "answer": ["death star","deathstar"],
}
games.push(game1)
var game2 = /*infrared*/{
    basicGame: {
        "imageArray": [imageLocation+"images/word101.jpg", imageLocation+"images/word102.jpg",imageLocation+"images/word103.jpg",imageLocation+"images/word104.jpg"],
        "letterArray": ["r","a","n","p","m","i","f","n","s","t","o","d","e","f","c","r"],
    },
    "letterRemove": [10, 11],
    "hint1": "some cameras have this feature",
    "hint2": "used for night vision, meterorology, and thermography",
    "answer": ["infrared"],
}
games.push(game2)
var game3 = /*droid*/{
    basicGame: {
        "imageArray": [imageLocation+"images/word31.jpg", imageLocation+"images/word32.jpg",imageLocation+"images/word33.jpg",imageLocation+"images/word34.jpg"],
        "letterArray": ["m","l","e","r","i","s","p","a","n","d","w","h","g","o","c","d"],
    },
    "letterRemove": [3, 6],
    "hint1": "similar to a robot",
    "hint2": "look at the green guy",    
    "answer": ["droid", "android"],
}
games.push(game3)
var game4 = /*chloroplasts*/{
    basicGame: {
        "imageArray": [imageLocation+"images/word61.jpg", imageLocation+"images/word62.jpg",imageLocation+"images/word63.jpg",imageLocation+"images/word64.jpg"],
        "letterArray": ["o","p","a","m","b","h","c","l","s","s","r","o","t","n","t","l"],
    },
    "letterRemove": [4, 5],
    "hint1": "they conduct photosynthesis",
    "hint2": "they are small green balls that create the sugar that plants eat",     
    "answer": ["chloroplasts", "chloroplast"],
}
games.push(game4)
var game5 = /*lhospital*/{
    basicGame: {
        "imageArray": [imageLocation+"images/word21.jpg", imageLocation+"images/word22.jpg",imageLocation+"images/word23.jpg",imageLocation+"images/word24.jpg"],
        "letterArray": ["i","l","o","m","h","n","a","t","f","g","s","u","p","c","l","a"],
    },
    "letterRemove": [4, 6],
    "hint1": "mathematician whose name looks like he should be a doctor",
    "hint2": "he created an important calulus rule having to do with answers that are zero divided by zero",
    "answer": ["lhospital", "l'hospital", "lhopital", "l'hopital"],
}
games.push(game5)
var game6 = /*andromeda*/{
    basicGame: {
        "imageArray": [imageLocation+"images/word41.jpg", imageLocation+"images/word42.jpg",imageLocation+"images/word43.jpg",imageLocation+"images/word44.jpg"],
        "letterArray": ["d","a","e","n","l","c","o","s","a","r","t","u","i","c","d","m"],
    },
    "letterRemove": [5, 13],
    "hint1": "Perseus saved her before the monster ate her in greek mythology",
    "hint2": "name of a known galaxy",
    "answer": ["andromeda"],
}
games.push(game6)
var game7 = /*helium*/{
    basicGame: {
        "imageArray": [imageLocation+"images/word71.jpg", imageLocation+"images/word72.JPG",imageLocation+"images/word73.jpg",imageLocation+"images/word74.jpg"],
        "letterArray": ["b","u","t","s","h","m","o","l","n","g","e","p","a","i","l","z"],
    },
    "letterRemove": [3, 10],
    "hint1": "your voice can go up really high with this",
    "hint2": "balloons go up with this",
    "answer": ["helium"],
}
games.push(game7)
var game8 = /*euler*/{
    basicGame: {
        "imageArray": [imageLocation+"images/word81.jpg", imageLocation+"images/word82.jpg",imageLocation+"images/word83.jpg",imageLocation+"images/word84.jpg"],
        "letterArray": ["l","r","n","o","e","e","m","p","s","f","d","b","c","u","r","t"],
    },
    "letterRemove": [4, 8],
    "hint1": "mathematician who came up with a formula showing the relationship between exponential and trigonometric functions",
    "hint2": "spelled almost like mule with an r on the end",
    "answer": ["euler"],
}
games.push(game8)
var game9 = /*nanotube*/{
    basicGame: {
        "imageArray": [imageLocation+"images/word91.jpg", imageLocation+"images/word92.jpg",imageLocation+"images/word93.jpg",imageLocation+"images/word94.jpg"],
        "letterArray": ["s","o","n","n","e","l","m","g","t","b","h","c","d","y","a","u"],
    },
    "letterRemove": [6, 12],
    "hint1": "they are nano size",
    "hint2": "they are a tube shape",
    "answer": ["nanotube", "nanotubes", "nano tube", "nano tubes"],
}
games.push(game9)
var game10 = /*magnesium*/{
    basicGame: {
        "imageArray": [imageLocation+"images/word11.jpg", imageLocation+"images/word12.jpg",imageLocation+"images/word13.jpg",imageLocation+"images/word14.jpg"],
        "letterArray": ["a","s","m","t","g","i","o","l","m","n","r","c","h","d","e","u"],  
    },
    "letterRemove": [4, 11],
    "hint1": "periodic element number 12",
    "hint2": "element mg",
    "answer": ["magnesium"],
}
games.push(game10)
//USER DATA
var playerData = {}

function getResults(id){
    var pass = 0
    var notPass = 0
    var skip = 0
    var score = 10;
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
        "totalScore": 10,
    }
    return playerData[id]
}
////////////////////////
// Client side includes
////////////////////////
app.get('/game.html', function(request, response){
	response.sendfile('game.html')
});
app.get('/playerData', function(request, response){
	response.send(playerData)
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
    if(messageType == "log"){
        var messageData = message["data"]
        allData.push(messageData)
        //console.log(messageData)
        checkpoint()
        response.send("")
    }
    else if (messageType=="ip"){
        var id = message["id"]
        var time = message["time"]
        var rtn = instantiatePlayer(id)
        response.send(JSON.stringify({"rtn": rtn}))
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
        var id = payload["id"]
        var rtn = handleGuess(textboxAnswer, gameIndex, id)
        response.send(JSON.stringify({"rtn":rtn}))
    }
    else if (messageType=="results"){
        var id = message["id"]
        var results = getResults(id)
        response.send(JSON.stringify({"results":results}))
    }
    else if (messageType=="guessesLeft"){
        var gameIndex = message["gameIndex"]
        var id = message["id"]
        var numGuessesMade = playerData[id]["game"+gameIndex]["guessesMade"].length
        var guessLeft = 5 - numGuessesMade
        response.send(JSON.stringify({"guessLeft":guessLeft}))
    }
    else if (messageType=="currentScore"){
        var id = message["id"]
        var currentScore = playerData[id]["totalScore"]
        response.send(JSON.stringify({"currentScore":currentScore}))
    }
    else if (messageType=="numGuessesMade"){
        var id = message["id"]
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
        var id = message["id"]
        var gameIndex = message["gameIndex"]
        if(playerData[id]["game"+gameIndex]["passed"] == null){
            playerData[id]["game"+gameIndex]["passed"] = "failed"
        }
        var answer = games[gameIndex]["answer"]
        response.send(JSON.stringify({"answer":answer}))
    }
    else if (messageType=="skip"){
        var id = message["id"]
        var gameIndex = message["gameIndex"]
        playerData[id]["game"+gameIndex]["passed"] = "skipped"
        var passed = playerData[id]["game"+gameIndex]["passed"]
        response.send(JSON.stringify({"passed": passed}))
    }
    else if (messageType=="restart"){
        var id = message["id"]
        instantiatePlayer(id)
        response.send("")
    }
});

/////////////////////////////////
// Save Database
/////////////////////////////////
function checkpoint() {
    writeToFile(allData);
}
function writeToFile(json){
    var ret = "data = "+JSON.stringify(json)
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