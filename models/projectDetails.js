const mongoose = require('mongoose');

const projectDetails = new mongoose.Schema({ //projectDetails object will create an instance of the schema
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },

    issue: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'issues',
        }
    ],

    // issues: [issues]
    
},
{
    timestamps: true
}

);


const CreateProjectDetails = mongoose.model('CreateProjectDetails', projectDetails); //calling model method on mongoose object and pass projectDetais schema abd call it CreateProjectDetials
module.exports = CreateProjectDetails;