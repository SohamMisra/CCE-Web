let events = [];
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Function to add events
function addEvent() {
    const eventDate = document.getElementById("eventDate").value;
    const eventTitle = document.getElementById("eventTitle").value;
    const eventDescription = document.getElementById("eventDescription").value;
	console.log(JSON.stringify({date: eventDate, title: eventTitle, description: eventDescription}))
    fetch("http://localhost:5500/addEvent", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ date: eventDate, title: eventTitle, description: eventDescription }),
	})
	.then(response => {
		if (!response.ok) {
			throw new Error("Network response was not OK");
		}
		return response.text();
	})
	.then(text => text ? JSON.parse(text) : {}) // Parse only if text exists
	.then(data => {
		console.log("Success:", data);
		alert(data.message || "Event added successfully!");
	})
	.catch(error => {
		console.error("Error:", error);
		alert("Error adding event. Check console for details.");
	});	
}


function loadEvents() {
	fetch("http://localhost:5500/getEvents")
	.then(response => response.json())
	.then(data => {
		events = data; // Store fetched events
		showCalendar(currentMonth, currentYear);

		displayReminders();
	})
	.catch(error => console.error("Error:", error));
}
function displayReminders() {
	const reminderList = document.getElementById("reminderList");
	reminderList.innerHTML = ""; 
	for(let i=0;i<events.length;i++){
		let event = events[i];
		let eventDate = new Date(event.date);
		//if(eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear){
			
		let listItem = document.createElement("li");
		listItem.innerHTML = `<strong>${event.title}</strong> - ${event.description} on ${eventDate.toLocaleDateString()}`;

		let viewButton = document.createElement("button");
        viewButton.className = "view-event";
        viewButton.textContent = "View";
        viewButton.onclick = function() {
            viewEvent(event.title);
        };
        listItem.appendChild(viewButton);
        reminderList.appendChild(listItem);
		/*let deleteButton = document.createElement("button");
		deleteButton.className = "delete-event";
		deleteButton.textContent = "Delete";
		deleteButton.onclick = function(){
			deleteEvent(event.id,event.title);
		};
		listItem.appendChild(deleteButton);
		reminderList.appendChild(listItem);*/
	}
}
//}
function deleteEvent(id,title){
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
function showCalendar(month, year) {
	let firstDay = new Date(year, month).getDay();
	let tbl=document.getElementById("calendar-body");
    	tbl.innerHTML="";
		monthAndYear.innerHTML = months[month] + " " + year;
		selectYear.value = year;
		selectMonth.value = month;

		let date = 1;
		for(let i=0;i<6;i++){
			let row=document.createElement("tr");
			for(let j=0;j<7;j++){
				if(i===0 && j<firstDay){
					let cell =document.createElement("td");
					cell.appendChild(document.createTextNode("")); 
					row.appendChild(cell);
				}else if(date>daysInMonth(month,year)){
					break;
				}else{
					let cell = document.createElement("td");
					cell.setAttribute("data-date",date);
					cell.setAttribute("data-month",month+1);
					cell.setAttribute("data-year",year);
					cell.innerHTML=`<span>${date}</span>`;

					if (hasEventOnDate(date, month, year)) {
						cell.classList.add("event-marker");
						cell.onclick = function () {
							showEventDetails(date, month, year);
						};
					}
					row.appendChild(cell);
					date++;
				}
				tbl.appendChild(row);
    }
}
}
function showEventDetails(date,month,year){
	let eventsOnDate = getEventsOnDate(date, month, year);
    let eventDetails = eventsOnDate.map(event => `<p><strong>${event.title}</strong> - ${event.description}</p>`).join("");
    alert(`Events on ${date}/${month + 1}/${year}:\n${eventDetails}`);

}  
function getEventsOnDate(date, month, year) {
	return events.filter(event => {
		let eventDate = new Date(event.date);
		return (
			eventDate.getDate() === date &&
			eventDate.getMonth() === month &&
			eventDate.getFullYear() === year
		);
	});
}
function hasEventOnDate(date, month, year) {
	return getEventsOnDate(date, month, year).length > 0;
}

function daysInMonth(iMonth,iYear){
	return 32-new Date(iYear,iMonth,32).getDate();
}

function next(){
	currentYear=currentMonth===11?currentYear+1:currentYear;
	currentMonth=(currentMonth+1)%12;
	showCalendar(currentMonth,currentYear);
}

function previous() {
    currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}
function generateYearRange(start, end) {
    let years = "";
    for (let year = start; year <= end; year++) {
        years += `<option value="${year}">${year}</option>`;
    }
    return years;
}
document.getElementById("year").innerHTML=generateYearRange(2015,2051);
showCalendar(currentMonth,currentYear);
function showMoreInfo(popupId) {
    document.getElementById(popupId).showModal();
}

function closeMoreInfo(popupId) {
    document.getElementById(popupId).close();
}

function viewEvent(eventTitle) {
    // Example: Set the poster image source based on the event ID
	const formattedTitle = eventTitle.replace(/\s+/g, '_').toLowerCase().replace(/[^a-z0-9_]/g, '');

	const posterSrc = `images/${formattedTitle}.jpg`;
    document.getElementById('eventPoster').src = posterSrc;
    document.getElementById('eventPosterModal').showModal();
}

function closeModal() {
    document.getElementById('eventPosterModal').close();
}
