const adminUsername="";
const adminPassword="";

function login(){
    const username=document.getElementById("username").value;
    const password=document.getElementById("password").value;
    const loginError=document.getElementById("loginError");
 if(username==adminUsername && password==adminPassword){
     document.getElementById("login-container").style.display="none";
     document.getElementById("admin-container").style.display="block";     
     loadEvents();
 }else{
    loginError.textContent="Invalid username or password";
 }
}

let events = [];

function loadEvents() {
    fetch("http://localhost:5500/getEvents")
    .then(response => response.json())
    .then(data => {
        events = data;
        displayReminders();
    })
    .catch(error => console.error("Error:", error));
}
function displayReminders() {
    const reminderList = document.getElementById("reminderList");
    reminderList.innerHTML = "";
    for (let i = 0; i < events.length; i++) {
        let event = events[i];
        let eventDate = new Date(event.date);
        let listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${event.title}</strong> - ${event.description} on ${eventDate.toLocaleDateString()}`;

        let deleteButton = document.createElement("button");
        deleteButton.className = "delete-event";
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function () {
            deleteEvent(event.id, event.title);
        };

        listItem.appendChild(deleteButton);
        reminderList.appendChild(listItem);
    }
}
function addEvent() {
    const eventDate = document.getElementById("eventDate").value;
    const eventTitle = document.getElementById("eventTitle").value;
    const eventDescription = document.getElementById("eventDescription").value;

    fetch("http://localhost:5500/addEvent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: eventDate, title: eventTitle, description: eventDescription }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || "Event added successfully!");
        loadEvents();
    })
    .catch(error => console.error("Error:", error));
}
function deleteEvent(id, title) {
    fetch("http://localhost:5500/delete-event", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, title: title }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadEvents();
    })
    .catch(error => console.error("Error:", error));
}
