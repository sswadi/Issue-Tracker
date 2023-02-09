const express = require('express');


// app.get("/", function(req, res){

//     return res.render('index', {
//         title: "Home"
//     });

// });

module.exports.createProject = (req, res) => {
    return res.render('createProject', {
        title: "Create Project"
    });
}