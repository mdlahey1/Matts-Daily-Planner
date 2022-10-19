//Define Variables
var currentDay = $("#currentDay");
var timeBlock = $(".time-block");
var saveBtn = $(".saveBtn");
var clearBtn = $(".clearBtn");

//Display the current date in the jumbotron element
var currDate = moment().format('dddd, MMM Do YYYY');
currentDay.text(currDate);

//Add colors to timeblocks dependent on the current time of day
function timeColors() {
    //store current time in a variable
    var currentTime = moment().hour();
    //console.log(currentTime);

    //loop through all time-blocks
    timeBlock.each(function() {
        //create variable that defines which time-block the loop is currently on
        var currentBlock = parseInt($(this).attr("id").split("hour")[1]);
        //console.log(currentBlock);

        //Check to see if the time-block is in the past, future or present and update the class accordingly
        if (currentTime > currentBlock) {
            $(this).removeClass("future");
            $(this).removeClass("present");
            $(this).addClass("past");
        }
        else if (currentTime === currentBlock) {
            $(this).removeClass("future");
            $(this).removeClass("past");
            $(this).addClass("present");
        }
        else {
            $(this).removeClass("past");
            $(this).removeClass("present");
            $(this).addClass("future");
        };
    });
};

//Create a function that retrieves existing tasks from local storage
function renderTasks() {
    timeBlock.each(function() {
        var currentBlock = parseInt($(this).attr("id").split("hour")[1]);
        $(this).children(".description").val(localStorage.getItem("hour" + currentBlock));
    });
}

//Create a function with an event listener that allows the user to save calendar tasks for individual hours when the save button is hit
$(document).ready(function() {
    saveBtn.on("click", function() {
        //Create variables that will be stored in local storage
        var time = $(this).parent().parent().attr("id");
        var task = $(this).parent().siblings(".description").val();

        //Save the task using local storage
        localStorage.setItem(time, task);
    });
});

//Create a function with an event listener that allows the user to clear calendar tasks for individual hours when the clear button is hit
$(document).ready(function() {
    clearBtn.on("click", function() {
        //Create a variable that stores the correct time-block id
        var time = $(this).parent().parent().attr("id");
        
        //Delete the task from local storage
        localStorage.removeItem(time);
        location.reload();
    });
});

timeColors();
renderTasks();