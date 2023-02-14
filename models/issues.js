const mongoose = require('mongoose');

const issues = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    labels: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});


const issuesAdd = mongoose.model('AddIssues', issues); //calling model method on mongoose object and pass projectDetais schema abd call it CreateProjectDetials
module.exports = issuesAdd;