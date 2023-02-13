const express = require('express'); //importing express js
const path = require('path'); //requiring path module to set up views folder
const port = 8000; // setting the port
const db = require('./config/mongoose');//requiring the file(library) for db connection
const CreateProjectDetails = require('./models/projectDetails');// requiring database schema

const app = express(); //running express 

app.set('view engine', 'ejs'); //setting view engine as ejs
app.set('views', path.join(__dirname, 'views')); //setting up views folder
app.use(express.urlencoded());//middleware to parse data
app.use(express.static('assets'));//setting up assets directory



// use express router
// app.use('/', require('./routes'));

// var createProj = [
//     {
//         name: "Xy",
//         description: "qwqwe",
//         author: "swa"
//     },
//     {
//         name: "po",
//         description: "lk",
//         author: "swzee"
//     }  
// ]
  
//home page
app.get("/", function(req, res){

    CreateProjectDetails.find({}, function(err, allProjects){
        if(err){
            console.log('Error in fetching the entire project list! ');
        }
        return res.render('index', {
            title: "Home",
            create_Proj: allProjects
        });

    });

});

//create project page
app.post('/createProjectDialogue', function(req, res){
    return res.render('createProjectDialogue', {
        title: "Create Project"
    });
});

//after creating a project it gets displayed in the home page list
app.post('/create-Project', function(req, res){
    
    CreateProjectDetails.create({
        name: req.body.name,
        description: req.body.description,
        author: req.body.author
    }, function(err, newProject){
        if(err){
            console.log('error in creating a new project in the database!');
            return;
        }
        return res.redirect('/');
    });

});

app.get('/projectDetails', function(req,res){

});


//this function can delete a new project created(home page)
app.get('/deleteProjectDetails', function(req,res){

     let id = req.query.id;//get the id from url paramteres for the selected project
     
     //find the project by id and delete from the database
     CreateProjectDetails.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting the project from the DB');
            return;
        }
        return res.redirect('back');
     });
});













//verifying if the server is connected or not
app.listen(port, function(err){
    if(err){
        console.log('Error in connecting to the server at port: ', port);
    }
    console.log("Connected to the server successfuly :D");
});
