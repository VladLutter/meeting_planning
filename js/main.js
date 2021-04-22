// Set users groups
const usersGroups = [['Maria', 'Bob', 'Alex'], ['Kseniia', 'Yurii', 'Nick'], ['Orysja', 'Galyna', 'Ostap']];

// Set office hours
let startTime = 10,
    endTime = 18;

//    
let choiseForm = '';

function setTime() {
    localStorage.setItem('officeHours', JSON.stringify([startTime, endTime]));
}

// // Create users list
// function userList(users) {
//     let allUsers = [];
//     for (let i = 0; i < users.length; i++) {
//         console.log(users[i])
//         allUsers.push(users[i]);

//     }

//     allUsers += users.filter(function () {
//         return name != users[i];
//     });
//     console.log(allUsers);
// }


// Create users list in LocalStorage
function setUsers() {
    localStorage.setItem('usersGroups', JSON.stringify(usersGroups));
};


// Create a table
function drawTable() {
    let content = `<tr class="tableHead">
                <th>Name</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
            </tr>`;

    // Loop drawing a table
    for (i = startTime; i <= endTime; i++) {
        content += `<tr><td>${i}:00</td>`;
        for (let k = 1; k <= 5; k++) {
            content += `<td data-index="${i}${k}" style="cursor:pointer;"></td>`;
        };
        content += `</tr>`;
    };
    document.querySelector('.table').innerHTML = content;
};


//Set 'onchange' at select form
function addUsersToSelect() {
    let selectUsers = document.querySelector('#allMembers');
    let usersGroups = JSON.parse(localStorage.getItem('usersGroups'));
    let content = '<option value="0">All members</option>';
    for (i = 1; i < usersGroups.length + 1; i++) {
        content += `<option value="${i}">${usersGroups[i - 1]}</option>`;
    };
    document.querySelector('#allMembers').innerHTML = content;
    document.querySelector('#allMembers').onchange = () => {
        choiseForm = +selectUsers.value - 1;
        // console.log(choiseForm);
        return drawTableWithEvents(choiseForm + '');
    };
};


//Draw table with events and selected members
function drawTableWithEvents(choiseForm) {
    let total = JSON.parse(localStorage.getItem('database'));
    console.log(choiseForm);
    console.log(total);

    for (let item of total) {

        console.log(item.userID)
        // Check for uniqueness id
        drawTable()
        if (item.userID === choiseForm) {
            // item.id = +item.id;
            console.log(item.id);
            document.querySelector(`[data-index="${item.id}"]`).innerHTML = `<td data-index="${+item.id}" style="cursor:pointer;"><p id="event${item.id}" style="color:green;">${item.text}<span id="delete${item.id}" style="margin-left:20px;">&#10006;</span></p></td>`

            console.log('user id ======>>>>>' + item.userID)

            // let content = `<tr class="tableHead">
            //     <th>Name</th>
            //     <th>Mon</th>
            //     <th>Tue</th>
            //     <th>Wed</th>
            //     <th>Thu</th>
            //     <th>Fri</th>
            // </tr>`;

            // // Loop drawing a table
            // for (i = startTime; i <= endTime; i++) {
            //     content += `<tr><td>${i}:00</td>`;
            //     for (let k = 1; k <= 5; k++) {
            //         content += `<td data-index="${i}${k}" style="cursor:pointer;"></td>`;
            //     };
            //     content += `</tr>`;
            // };
            // document.querySelector('.table').innerHTML = content;
        };
    };
};


// Display output of created events
function outputAllEvents() {
    //Change is exist data in LS
    if (localStorage.getItem('database') === null) {
        return drawTable();
    } else {
        addUsersToSelect();

    };
};





window.onload = setUsers(), setTime(), outputAllEvents();


// Onclick event on "td"-elements
function clickElem() {
    let myElem = this.dataset.index;
    // console.log(myElem)
    // console.log(typeof (myElem))
    localStorage.setItem('myClickElem', myElem);
    window.location.href = "create-event.html";
};

let listElem = document.querySelectorAll('td')
for (let m = 0; m < listElem.length; m++) {
    listElem[m].onclick = clickElem;
};


// New event button
document.querySelector('#newEvent').onclick = () => {
    location.href = "create-event.html";
}

// *******Display output of created events
// 1. проверка существует ли массив с данными в LS (если нет - выход) +
// 2. добавляем в форму select имена групп пользователей из переменной usersGroups +
// 3. вешаем обработчик событий onchange на форму select
// 4. создаем функцию, считываем значение выбранное пользователем в форме и формируем отображение записей, согласно выбранной группы участнков
// 5. проверяем, есть ли записи с такими userID в массиве total (если нет, выход, ничего не выводим далее)
// 6. если выбранная группа пользователей есть в массиве, тогда считываем ключи ID
// 7. назначаем на ячейки <td>, соответствующие найденным ID-шникам, события onclick/делаем зеленый фон/добавляем из массива введенный ранее текст события/
// 7.1 там же/создаем кнопку "удалить" (-> модальное окно ДА/НЕТ), вешаем на нее событие onclick, функция удаляет из массива total элемент с таким ID
// 8 запускаем снова функцию отрисовки таблицы