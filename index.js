const express = require('express'); //importing express js
const path = require('path'); //requiring path module to set up views folder
const port = 8000; // setting the port
const app = express(); //running express 

app.set('view engine', 'ejs'); //setting view engine as ejs
app.set('views', path.join(__dirname, 'views')); //setting up views folder


app.get("/", function(req, res){

    return res.render('index');

});

app.post('/createProjectDialogue', function(req, res){

});

app.post('/create-Project', function(req, res){

});


//verifying if the server is connected or not
app.listen(port, function(err){
    if(err){
        console.log('Error in connecting to the server at port: ', port);
    }
    console.log("Connected to the server successfuly :D");
});
