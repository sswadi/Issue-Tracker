var allIssues = []; // will contain all issues in a specific project
var filterIssues = []; //will contain only those issues which have selected labels associated with them

document.addEventListener("DOMContentLoaded", function(){
    init();
}, false);


var allIssuesListParent = null; 

//this will fetch value of the entire issue list and store it in allIssues
function init(){
    allIssuesListParent = document.getElementById("all-issues-list");
    allIssues = JSON.parse(allIssuesListParent.getAttribute("data-all-issues"));
    filterIssues = allIssues;
    showAllIssue();
}

//this displays all issues of a particular project when none of the labels filters are selected
function showAllIssue(){
    allIssuesListParent.innerHTML = "";
    filterIssues.map((item)=>{
        var li = document.createElement("li");
        li.innerHTML = ` <p>Title: ${item.title}</p>
                         <p>Description: ${item.description}</p>
                         <p>Label: ${item.label}</p>
                         <p>Author: ${item.author}</p>
                        `;
        allIssuesListParent.append(li);
    });
}

function removeFilter(){

    filterIssues = allIssues;
    var inputElements = document.getElementsByClassName('label');
    for(var i=0; inputElements[i]; ++i){
        if(inputElements[i].checked){
            inputElements[i].checked=false;
        }
    }
    showAllIssue();
}

//************************************************************ */

//this function handles the filtering part of selected labels
function handleLabelsEvent(){
    filter(["labels"]); //how can js identify labels keyword?
}

//this displays all the checked value labels/authors on the screen
function filter(filter_types = []){
    
    filterIssues = [];
    var temp = [];
    if(filter_types.indexOf("labels") != -1){
        var labelsValue = getCheckedLabelValue();
        temp = allIssues.filter((item)=>{ //temp is a temporary array
            return labelsValue.indexOf(item.label) != -1;
        });

    }

    filterIssues = filterIssues.concat(temp);

    // if(filter_types == "author"){}

    // if(filter_types == "title"){}

    // if(filter_types == "descriptions"){}

    showAllIssue();
}

//this function pushes all the checked label values onto checkedValue array
function getCheckedLabelValue(){
    var checkedValue = [];
    var inputElements = document.getElementsByClassName('label');

    for(var i=0; inputElements[i]; ++i){
        if(inputElements[i].checked){
            checkedValue.push(inputElements[i].value);
        }
    }
    return checkedValue;
}



