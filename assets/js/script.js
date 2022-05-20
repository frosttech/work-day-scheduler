

var schedule = [];

var currentDate = new Date();
var currentHour = moment(currentDate).format("ha");
var timeDiff = new Date().getTimezoneOffset();


var setDate = function() {
    var prettyDate = moment(currentDate).format("dddd, MMMM Do");
    $("#currentDay").html(prettyDate);
};

var createTimeBlock = function(taskId, hour, description) {
    var timeBlockEl = $("<div>").addClass("row time-block").attr("id", taskId);

    var hourEl = $("<div>").addClass(`col-1 hour ${taskId} `).html(hour);
    var descEl = $("<textarea>").addClass(`col-10 description ${taskId}`).text(description);
    var saveBtnEl = $("<div>").addClass(`col-1 saveBtn ${taskId}`).html('<i class="fa-solid fa-floppy-disk noInteract"></i>');

    if (hour.includes("am")) {
        if (hour === "12am") {
            var hourInt = 0;
        }
        else {
            var hourInt = parseInt(hour.slice(0, -2));
        }
    }
    else if (hour.includes("pm")) {
        if (hour === "12pm") {
            var hourInt = 12;
        }
        else {
            var hourInt = parseInt(hour.slice(0, -2)) + 12;
        }
    }

    if (currentHour.includes("am")) {
        if (currentHour === "12am") {
            var currentHourInt = 0;
        }
        else {
            var currentHourInt = parseInt(currentHour.slice(0, -2));
        }
    }
    else if (currentHour.includes("pm")) {
        if (currentHour === "12pm") {
            var currentHourInt = 12;
        }
        else {
            var currentHourInt = parseInt(currentHour.slice(0, -2)) + 12;
        }
    }

    if (hourInt < currentHourInt) {
        timeBlockEl.addClass("past");
    }
    else if (hourInt === currentHourInt) {
        timeBlockEl.addClass("present");
    }
    else if (hourInt > currentHourInt) {
        timeBlockEl.addClass("future");
    }
    console.log(parseInt(hourInt), parseInt(currentHourInt));

 


    timeBlockEl.append(hourEl, descEl, saveBtnEl);

    $("#schedule-container").append(timeBlockEl);

};

var saveTasks = function() {
    localStorage.setItem("schedule", JSON.stringify(schedule));
};

var setDefaultBlocks = function() {
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

var loadStorage = function() {
    schedule = localStorage.getItem("schedule");
    console.log(schedule);
    if (!schedule) {
        setDefaultBlocks();
        console.log(schedule);
    }
    schedule = JSON.parse(schedule);  
    if (schedule.date !== moment(currentDate).format("MM/DD/YYYY")) {
        console.log("New date detected, clearing tasks.")
        setDefaultBlocks();
    }
};

var loadBlocks = function() {
    loadStorage();
      
    for (var i = 0; i < schedule.tasks.length; i++) {
        hour = schedule.tasks[i].hour;
        description = schedule.tasks[i].description;
        taskId = schedule.tasks[i].id;
        createTimeBlock(taskId, hour, description);
    }
};

var saveBlock = function(taskId) {
    var description = $(`#${taskId} .description`).val();
    console.log(`Task ID: ${taskId}\nDescription: ${description}`);
    schedule = localStorage.getItem("schedule");
    schedule = JSON.parse(schedule);
    for (var i = 0; i < schedule.tasks.length; i++) {
        if (schedule.tasks[i].id === taskId) {
            schedule.tasks[i].description = description;
        }
    };
    saveTasks();
};



setDate();
loadBlocks();

$("#schedule-container .time-block").click(function() {  
    var taskId = $(this).attr("id");
    if (event.target.matches(".saveBtn")) {
        saveBlock(taskId);
    }
});