// //<script type="module">
// // Import the functions you need from the SDKs you need
// // import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
// // import { getDatabase,ref,set,get,child } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-database";

// // https://firebase.google.com/docs/web/setup#available-libraries


// const firebaseConfig = {
// 	apiKey: "AIzaSyD2J32SP_ycy4gso-sq05SwzpQQfx_7nT0",
// 	authDomain: "ccewebapp.firebaseapp.com",
// 	projectId: "ccewebapp",
// 	storageBucket: "ccewebapp.firebasestorage.app",
// 	messagingSenderId: "951346195761",
// 	appId: "1:951346195761:web:6369bac2f501dc7c155410",
// 	measurementId: "G-Z8RCV56P53"
// };

// // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const db=getDatabase(app); 
// //const analytics = getAnalytics(app);
// //</script>
// // Pop-up window
// function showMoreInfo(popupId){
//     const popup = document.getElementById(popupId);
//     popup.showModal();
// }

// function closeMoreInfo(popupId) {
//     const popup = document.getElementById(popupId);
//     popup.close();
// }

// // Close popup when clicking outside the content
// document.querySelectorAll('dialog').forEach((popup) => {
//     const wrapper = popup.querySelector(".wrapper");
//     popup.addEventListener("click", (e) => {
//         if (!wrapper.contains(e.target)) {
//             popup.close();
//         }
//     });
// });
// // script.js

// // Define an array to store events
// // let events = [];
// // document.getElementById("addEvent").addEventListener('click',function(e){
// // 	// letiables to store event input fields and reminder list
// // 	set(ref(db,'user/' document.getElementById("eventDate").value),
// // 	{
// // 	eventDateInput :
// // 		document.getElementById("eventDate").value,
// // 	eventTitleInput :
// // 		document.getElementById("eventTitle").value,
// // 	eventDescriptionInput :
// // 		document.getElementById("eventDescription").value,
// // 	reminderList :
// // 		document.getElementById("reminderList").value
// // 	});
// // 	alert("Database is updated !")
// // }
// // )
// // Counter to generate unique event IDs
// let eventIdCounter = 1;




// // Function to delete an event by ID
// function deleteEvent(id) {
//     fetch(`http://localhost:5000/deleteEvent/${id}`, { method: "DELETE" })
//     .then(response => response.json())
//     .then(data => {
//         alert(data.message);
//         loadEvents();
//     })
//     .catch(error => console.error("Error:", error));
// }
	

// // Function to display reminders
// function displayReminders() {
// 	reminderList.innerHTML = "";
// 	for (let i = 0; i < events.length; i++) {
// 		let event = events[i];
// 		let eventDate = new Date(event.date);
// 		if (eventDate.getMonth() ===
// 			currentMonth &&
// 			eventDate.getFullYear() ===
// 			currentYear) {
// 			let listItem = document.createElement("li");
// 			listItem.innerHTML =
// 				`<strong>${event.title}</strong> - 
// 			${event.description} on 
// 			${eventDate.toLocaleDateString()}`;

// 			// Add a delete button for each reminder item
// 			let deleteButton =
// 				document.createElement("button");
// 			deleteButton.className = "delete-event";
// 			deleteButton.textContent = "Delete";
// 			deleteButton.onclick = function () {
// 				deleteEvent(event.id);
// 			};

// 			listItem.appendChild(deleteButton);
// 			reminderList.appendChild(listItem);
// 		}
// 	}
// }

// // Function to generate a range of 
// // years for the year select input
// function generate_year_range(start, end) {
// 	let years = "";
// 	for (let year = start; year <= end; year++) {
// 		years += "<option value='" +
// 			year + "'>" + year + "</option>";
// 	}
// 	return years;
// }

// // Initialize date-related letiables
// today = new Date();
// currentMonth = today.getMonth();
// currentYear = today.getFullYear();
// selectYear = document.getElementById("year");
// selectMonth = document.getElementById("month");

// createYear = generate_year_range(1970, 2050);

// document.getElementById("year").innerHTML = createYear;

// let calendar = document.getElementById("calendar");

// let months = [
// 	"January",
// 	"February",
// 	"March",
// 	"April",
// 	"May",
// 	"June",
// 	"July",
// 	"August",
// 	"September",
// 	"October",
// 	"November",
// 	"December"
// ];
// let days = [
// 	"Sun", "Mon", "Tue", "Wed",
// 	"Thu", "Fri", "Sat"];

// $dataHead = "<tr>";
// for (dhead in days) {
// 	$dataHead += "<th data-days='" +
// 		days[dhead] + "'>" +
// 		days[dhead] + "</th>";
// }
// $dataHead += "</tr>";

// document.getElementById("thead-month").innerHTML = $dataHead;

// monthAndYear =
// 	document.getElementById("monthAndYear");
// showCalendar(currentMonth, currentYear);

// /*function loadEvents() {
//     fetch("http://localhost:5000/getEvents")
//     .then(response => response.json())
//     .then(events => {
//         const reminderList = document.getElementById("reminderList");
//         reminderList.innerHTML = ""; // Clear existing list
//         events.forEach(event => {
//             reminderList.innerHTML += `
//                 <li data-event-id="${event.id}">
//                     <strong>${event.title}</strong> - ${event.description} on ${event.date}
//                     <button class="delete-event" onclick="deleteEvent(${event.id})">
//                         Delete
//                     </button>
//                 </li>
//             `;
//         });
//     })
//     .catch(error => console.error("Error:", error));
// }*/
// function loadEvents() {
//     fetch("http://localhost:5000/getEvents")
//     .then(response => response.json())
//     .then(data => {
//         events = data; // Store fetched events
//         displayReminders();
//     })
//     .catch(error => console.error("Error:", error));
// }

// // Function to navigate to the next month
// function next() {
// 	currentYear = currentMonth === 11 ?
// 		currentYear + 1 : currentYear;
// 	currentMonth = (currentMonth + 1) % 12;
// 	showCalendar(currentMonth, currentYear);
// }

// // Function to navigate to the previous month
// function previous() {
// 	currentYear = currentMonth === 0 ?
// 		currentYear - 1 : currentYear;
// 	currentMonth = currentMonth === 0 ?
// 		11 : currentMonth - 1;
// 	showCalendar(currentMonth, currentYear);
// }

// // Function to jump to a specific month and year
// function jump() {
// 	currentYear = parseInt(selectYear.value);
// 	currentMonth = parseInt(selectMonth.value);
// 	showCalendar(currentMonth, currentYear);
// }

// // Function to display the calendar
// /*function showCalendar(month, year) {
// 	let firstDay = new Date(year, month, 1).getDay();
// 	tbl = document.getElementById("calendar-body");
// 	tbl.innerHTML = "";
// 	monthAndYear.innerHTML = months[month] + " " + year;
// 	selectYear.value = year;
// 	selectMonth.value = month;

// 	let date = 1;
// 	for (let i = 0; i < 6; i++) {
// 		let row = document.createElement("tr");
// 		for (let j = 0; j < 7; j++) {
// 			if (i === 0 && j < firstDay) {
// 				cell = document.createElement("td");
// 				cellText = document.createTextNode("");
// 				cell.appendChild(cellText);
// 				row.appendChild(cell);
// 			} else if (date > daysInMonth(month, year)) {
// 				break;
// 			} else {
// 				cell = document.createElement("td");
// 				cell.setAttribute("data-date", date);
// 				cell.setAttribute("data-month", month + 1);
// 				cell.setAttribute("data-year", year);
// 				cell.setAttribute("data-month_name", months[month]);
// 				cell.className = "date-picker";
// 				cell.innerHTML = "<span>" + date + "</span";

// 				if (
// 					date === today.getDate() &&
// 					year === today.getFullYear() &&
// 					month === today.getMonth()
// 				) {
// 					cell.className = "date-picker selected";
// 				}

// 				// Check if there are events on this date
// 				if (hasEventOnDate(date, month, year)) {
// 					cell.classList.add("event-marker");
// 					cell.appendChild(
// 						createEventTooltip(date, month, year)
// 				);
// 				}

// 				row.appendChild(cell);
// 				date++;
// 			}
// 		}
// 		tbl.appendChild(row);
// 	}

// 	displayReminders();
// }*/
// function showCalendar(month, year) {
//     let firstDay = new Date(year, month, 1).getDay();
//     let tbl = document.getElementById("calendar-body");
//     tbl.innerHTML = "";
//     monthAndYear.innerHTML = months[month] + " " + year;
//     selectYear.value = year;
//     selectMonth.value = month;

//     let date = 1;
//     for (let i = 0; i < 6; i++) {
//         let row = document.createElement("tr");
//         for (let j = 0; j < 7; j++) {
//             if (i === 0 && j < firstDay) {
//                 let cell = document.createElement("td");
//                 cell.appendChild(document.createTextNode(""));
//                 row.appendChild(cell);
//             } else if (date > daysInMonth(month, year)) {
//                 break;
//             } else {
//                 let cell = document.createElement("td");
//                 cell.setAttribute("data-date", date);
//                 cell.setAttribute("data-month", month + 1);
//                 cell.setAttribute("data-year", year);
//                 cell.innerHTML = `<span>${date}</span>`;

//                 if (hasEventOnDate(date, month, year)) {
//                     cell.classList.add("event-marker");
//                 }
//                 row.appendChild(cell);
//                 date++;
//             }
//         }
//         tbl.appendChild(row);
//     }
// }

// // Function to create an event tooltip
// function createEventTooltip(date, month, year) {
// 	let tooltip = document.createElement("div");
// 	tooltip.className = "event-tooltip";
// 	let eventsOnDate = getEventsOnDate(date, month, year);
// 	for (let i = 0; i < eventsOnDate.length; i++) {
// 		let event = eventsOnDate[i];
// 		let eventDate = new Date(event.date);
// 		let eventText = `<strong>${event.title}</strong> - 
// 			${event.description} on 
// 			${eventDate.toLocaleDateString()}`;
// 		let eventElement = document.createElement("p");
// 		eventElement.innerHTML = eventText;
// 		tooltip.appendChild(eventElement);
// 	}
// 	return tooltip;
// }

// // Function to get events on a specific date
// function getEventsOnDate(date, month, year) {
// 	return events.filter(function (event) {
// 		let eventDate = new Date(event.date);
// 		return (
// 			eventDate.getDate() === date &&
// 			eventDate.getMonth() === month &&
// 			eventDate.getFullYear() === year
// 		);
// 	});
// }

// // Function to check if there are events on a specific date
// function hasEventOnDate(date, month, year) {
// 	return getEventsOnDate(date, month, year).length > 0;
// }

// // Function to get the number of days in a month
// function daysInMonth(iMonth, iYear) {
// 	return 32 - new Date(iYear, iMonth, 32).getDate();
// }

// // Call the showCalendar function initially to display the calendar
// showCalendar(currentMonth, currentYear);

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