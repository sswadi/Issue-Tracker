const express = require('express'); //importing express js
const path = require('path'); //requiring path module to set up views folder
const port = 8000; // setting the port
const db = require('./config/mongoose');//requiring the file(library) for db connection
const CreateProjectDetails = require('./models/projectDetails');// requiring database schema for projects
const issuesAdd = require('./models/issues');// requiring issues schema for projects
const expressLayouts = require('express-ejs-layouts');
const { Console } = require('console');

const app = express(); //running express 

app.use(expressLayouts);//using package: express-ejs-layout that was downloaded
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs'); //setting view engine as ejs
app.set('views', path.join(__dirname, 'views')); //setting up views folder
app.use(express.urlencoded());//middleware to parse data
app.use(express.static('assets'));//setting up assets directory

// use express router
// app.use('/', require('./routes'));

  
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

// //on clicking on one of the project it takes us to the details of a project
app.get('/projectDetails/', function(req,res){

    let projId = req.query.id;

    CreateProjectDetails.find({_id:projId}).populate("issue").exec(function(err, allProjects){
            if(err){
                console.log('Error in fetching the selected project! ');
            }

            if (!projId) {
                create_Proj = [];
              }
    
            return res.render('projectDetails', {
                title: "Project Details",
                create_Proj: allProjects,

            });
        });

  });


//another async way to write the above function
//   app.get("/projectDetails_swati/", async function (req, res) {
//     let projId = req.query.id;
//     let issueId = req.query.id;
  
//     try {
//       let projects = await CreateProjectDetails.find({ _id: projId }).populate(
//         "issue"
//       );
  
//       return res.render("projectDetails", {
//         title: "Project Details",
//         create_Proj: allProjects,
//       });
//     } catch (error) {
//       return res.render("error", {
//         mssg: error.getMessage,
//       });
//     }
//   });
    

//this takes us to create issue page
app.post('/createIssue/', function(req,res){

    let projId = req.query.id;
    return res.render('createIssue', {
        title: "Create Issue",
        //here the id needs to be passed to the next page so that the entry gets saved in that specific project
        idd: projId
    });

});

// this appends issues to the specific project
app.post('/addIssue', async (req,res)=> {
    
        let projId = req.query.id;
        const project = await CreateProjectDetails.findById(projId);
        
        if(!project){
            return res.status(404).send('Project not found');
        }

        let issue = issuesAdd.create({
            title: req.body.title,
            description: req.body.description,
            labels: req.body.labels, //does this need to be changed?
            author: req.body.author,
            project: req.query.id,
            issue: req.query.issues
            
        }, async function(err, issue){
            if(err){
                console.log('error in creating a new project in the database!');
                return;
            }
            project.issue.push(issue); 
            await project.save(); 
            await issue.save();

            res.redirect(`/projectDetails?id=${projId}`);  
        });
       
});

// when  a person selects a label, the project page displays only projects associated with the selected labels
app.get('/projectDetails/xyz', function(req,res){

    q = req.query.label; //creating in object to fetch lable values  
    let labels = Object.values(req.query);

    console.log('labelssssss ',labels);

    // let url= new URL('req.url');
    // let params = new URLSearchParams(url.search);


});



//verifying if the server is connected or not
app.listen(port, function(err){
    if(err){
        console.log('Error in connecting to the server at port: ', port);
    }
    console.log("Connected to the server successfuly :D");
});
