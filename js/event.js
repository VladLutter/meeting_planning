let clickElemID = "",
    usersGroups = "",
    officeHours = "",
    weekdays = [false, "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    selectedTime = "",
    selectedDay = "";

// Get data from LS
function readLocalstorage() {
    clickElemID = JSON.parse(localStorage.getItem('myClickElem')) + '';
    usersGroups = JSON.parse(localStorage.getItem('usersGroups'));
    officeHours = JSON.parse(localStorage.getItem('officeHours'));
    localStorage.removeItem('myClickElem');
};


// Decode data from clicked Element
function decodeClickElem(clickElemID) {
    for (let i = 0; i < clickElemID.length - 1; i++) {
        selectedTime += clickElemID[i];
    };
    selectedTime = +selectedTime;
    selectedDay = +clickElemID[2];
};


// Render select form "participants"
function formUsers(usersGroups) {
    let content = '';
    for (i = 0; i < usersGroups.length; i++) {
        content += `<option value=${i}>${usersGroups[i]}</option>`;
    }
    document.querySelector('#usersGroups').innerHTML = content;
};

// Render select form "day"
function formDay(weekdays) {
    let content = '';
    for (i = 1; i < weekdays.length; i++) {
        if (i == selectedDay) {
            content += `<option value=${i} selected>${weekdays[i]}</option>`;
        } else {
            content += `<option value=${i}>${weekdays[i]}</option>`;
        };
    };
    document.querySelector('#selectDay').innerHTML = content;
};

// Render select form "time"
function formTime(officeHours) {
    let startTime = officeHours[0];
    let endTime = officeHours[1];
    console.log(startTime)
    let content = '';
    for (i = startTime; i <= endTime; i++) {
        if (i == selectedTime) {
            content += `<option value=${i} selected>${i}:00</option>`;
        } else {
            content += `<option value=${i}>${i}:00</option>`;
        };
    };
    document.querySelector('#selectTime').innerHTML = content;
};

window.onload = readLocalstorage(), decodeClickElem(clickElemID), formUsers(usersGroups), formDay(weekdays), formTime(officeHours);


// Cancel event button
document.querySelector('#cancelEvent').onclick = () => {
    location.href = "index.html";
};


// Create event button
function createEvent() {

    // Get form values
    let textInput = document.querySelector('#eventName').value,
        usersGroupsID = document.querySelector('#usersGroups').value,
        dayInput = document.querySelector('#selectDay').value,
        timeInput = document.querySelector('#selectTime').value,
        idNumber = timeInput + dayInput;

    // Create data object for LS
    let total = [];
    let data = {
        'id': idNumber,
        'userID': usersGroupsID,
        'day': dayInput,
        'time': timeInput,
        'text': textInput
    };

    function isExistID() {
        for (let item of total) {
            console.log('ITEM OF TOTAL' + item.id);
            console.log('data id' + data.id);
            // Check for uniqueness id
            if (item.id === data.id) {
                return document.querySelector('.messageBlock').hidden = false;
            };
        };
        // Create event
        localStorage.removeItem('database');
        total.push(data);
        localStorage.setItem('database', JSON.stringify(total));
        window.location.href = "index.html";
        return;
    };

    // Сhecking if the database exists in LS
    if (localStorage.getItem('database') === null) {
        // console.log("DB ====== NULL !!!");
        total.push(data);
        localStorage.setItem('database', JSON.stringify(total));
    } else {
        // console.log("DB is exist");
        total = JSON.parse(localStorage.getItem('database'));
        isExistID();
    };
};

document.querySelector('#createEvent').onclick = () => {
    createEvent();
};

document.querySelector('#closeMessage').onclick = () => {
    document.querySelector('.messageBlock').hidden = true;
};


// console.log(clickElemID)
// console.log(usersGroups)
// console.log(officeHours)
// console.log(weekdays)



// console.log(selectedTime);
// console.log(selectedDay);