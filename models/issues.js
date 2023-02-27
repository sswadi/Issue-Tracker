const mongoose = require('mongoose');

const issues = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    author: {
        type: String,
        trim: true,
        required: true
    },

    labels: 
        {
            type: String,
            trim: true,
            required: true,
        }
    ,

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CreateProjectDetails',
        required: true
    }
},
{
    timestamps: true
}
);


const issuesAdd = mongoose.model('AddIssues', issues); //calling model method on mongoose object and pass projectDetais schema abd call it CreateProjectDetials
module.exports = issuesAdd;
