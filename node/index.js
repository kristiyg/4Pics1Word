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


////////////////////////
// Client side includes
////////////////////////
app.get('/game.html', function(request, response){
	response.sendfile('game.html')
});

app.get('/', function(request, response){
	response.send(allData)
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
	allData.push(message)
    console.log(message)
    checkpoint()
    response.send("")
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