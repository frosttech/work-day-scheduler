var schedule = [];
var currentDate = new Date();
var prettyDate = moment(currentDate).format("dddd, MMMM Do");
var currentHour = moment(currentDate).format("ha");


var compareTime = function(hour) {
    var hourInt = parseInt(moment(hour, "ha").format("H"));
    var currentHourInt = parseInt(moment(currentHour, "ha").format("H"));
    if (hourInt < currentHourInt) {
        return "past";
    }
    else if (hourInt === currentHourInt) {
        return "present";
    }
    else if (hourInt > currentHourInt) {
        return "future";
    }
};

var createBlock = function(taskId, hour, description) {
    var timeClass = compareTime(hour);
    var timeBlockEl = $("<div>").addClass("row time-block " + timeClass).attr("id", taskId);
    var hourEl = $("<div>").addClass(`col-1 hour ${taskId} `).html(hour);
    var descEl = $("<textarea>").addClass(`col-10 description ${taskId}`).text(description);
    var saveBtnEl = $("<div>").addClass(`col-1 saveBtn ${taskId}`).html('<i class="fa-solid fa-floppy-disk noInteract"></i>');

    timeBlockEl.append(hourEl, descEl, saveBtnEl);
    $("#schedule-container").append(timeBlockEl);
};

var saveTasks = function() {
    localStorage.setItem("schedule", JSON.stringify(schedule));
};

var setDefaultSchedule = function() {
    schedule = {
        date: moment(currentDate).format("MM/DD/YYYY"),
        tasks: [
            {
                id: "block1",
                hour: moment('9am', 'ha').format('ha'),
                description: ""
            },
            {
                id: "block2",
                hour: moment('10am', 'ha').format('ha'),
                description: ""
            },
            {
                id: "block3",
                hour: moment('11am', 'ha').format('ha'),
                description: ""
            },
            {
                id: "block4",
                hour: moment('12pm', 'ha').format('ha'),
                description: ""
            },
            {
                id: "block5",
                hour: moment('1pm', 'ha').format('ha'),
                description: ""
            },
            {
                id: "block6",
                hour: moment('2pm', 'ha').format('ha'),
                description: ""
            },
            {
                id: "block7",
                hour: moment('3pm', 'ha').format('ha'),
                description: ""
            },
            {
                id: "block8",
                hour: moment('4pm', 'ha').format('ha'),
                description: ""
            },
            {
                id: "block9",
                hour: moment('5pm', 'ha').format('ha'),
                description: ""
            }
        ]
    };
    saveTasks();
    schedule = localStorage.getItem("schedule");
};

var initializePage = function() {
    // set date in jumbotron
    $("#currentDay").html(prettyDate);

    // check for valid data in local storage
    schedule = localStorage.getItem("schedule");
    if (!schedule) {
        // load schedule defaults
        setDefaultSchedule();
    }

    schedule = JSON.parse(schedule);

    // compare local storage date with current date
    console.log(schedule.date);
    if (schedule.date !== moment(currentDate).format("MM/DD/YYYY")) {
        console.log("New date detected, clearing tasks.")
        // if new date schedule set to default
        setDefaultSchedule();
    }

    // add html elements based on parsed JSON
    for (var i = 0; i < schedule.tasks.length; i++) {
        hour = schedule.tasks[i].hour;
        description = schedule.tasks[i].description;
        taskId = schedule.tasks[i].id;
        createBlock(taskId, hour, description);
    }
};

var saveBlock = function(taskId) {
    var description = $(`#${taskId} .description`).val();
    console.log(`Task ID: ${taskId}\nDescription: ${description}`);
    // schedule = localStorage.getItem("schedule");
    // schedule = JSON.parse(schedule);
    for (var i = 0; i < schedule.tasks.length; i++) {
        if (schedule.tasks[i].id === taskId) {
            schedule.tasks[i].description = description;
        }
    };
    saveTasks();
};

initializePage();

$("#schedule-container .time-block").click(function() {  
    var taskId = $(this).attr("id");
    if (event.target.matches(".saveBtn")) {
        saveBlock(taskId);
    }
});