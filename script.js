document.addEventListener('DOMContentLoaded', () => {
    // Add hamburger menu to navbar
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    navbar.insertBefore(menuToggle, navbar.firstChild);

    // Toggle menu on click
    menuToggle.addEventListener('click', () => {
        const menu = document.querySelector('.menu');
        menu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const menu = document.querySelector('.menu');
        const toggle = document.querySelector('.menu-toggle');
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            menu.classList.remove('active');
        }
    });
});
let events = [];
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const API_BASE_URL = 'http://localhost:5500'; // Update this if port changes

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
/*async function loadEvents() {
    try {
		console.log('Loading events...');

        
		//const previousEventsResponse = await fetch("${API_BASE_URL}/events/previous");
		const previousEventsResponse = await fetch(`${API_BASE_URL}/events/previous`);

		if (!previousEventsResponse.ok) {
            //const errorText = await previousEventsResponse.text();
            throw new Error(`HTTP error! status: ${previousEventsResponse.status}`);
        }
        const previousEvents = await previousEventsResponse.json();
		console.log('Previous events:', previousEvents); // Debug log

		//events = [...previousEvents]; // Store in global events array

		displayEvents(previousEvents, "previousEventsList");

        //const upcomingEventsResponse = await fetch("http://localhost:5500/events/upcoming");
       
		const upcomingEventsResponse = await fetch(`${API_BASE_URL}/events/upcoming`);

		if (!upcomingEventsResponse.ok) {
            //const errorText = await upcomingEventsResponse.text();
            throw new Error(`HTTP error! status: ${upcomingEventsResponse.status}`);
        }
        const upcomingEvents = await upcomingEventsResponse.json();

		//events = [...events, ...upcomingEvents]; // Add to global events array
		console.log('Upcoming events:', upcomingEvents); // Debug log

		displayEvents(upcomingEvents, "upcomingEventsList");
    
	        // Refresh calendar after loading events
			//showCalendar(currentMonth, currentYear);
	} catch (error) {
        console.error("Error loading events:", error);
    }
}*/

async function loadEvents() {
    try {
        const response = await fetch("http://localhost:5500/getEvents");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const events = await response.json();
        displayEvents(events);
		highlightEventDates();

    } catch (error) {
        console.error("Error loading events:", error);
    }
}

/*function loadEvents() {
	fetch("http://localhost:5500/getEvents")
	.then(response => response.json())
	.then(data => {
		events = data; // Store fetched events
		showCalendar(currentMonth, currentYear);

		displayReminders();
	})
	.catch(error => console.error("Error:", error));
} */
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
						/*cell.onclick = function () {
							showEventDetails(date, month, year);
						};*/
					}
					row.appendChild(cell);
					date++;
				}
				tbl.appendChild(row);
    }
}
}
// function showEventDetails(date,month,year){
// 	let eventsOnDate = getEventsOnDate(date, month, year);
//     let eventDetails = eventsOnDate.map(event => `<p><strong>${event.title}</strong> - ${event.description}</p>`).join("");
//     alert(`Events on ${date}/${month + 1}/${year}:\n${eventDetails}`);

// }  
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
	//return getEventsOnDate(date, month, year).length > 0;

	return events.some(event => {
        const eventDate = new Date(event.date);
        return (
            eventDate.getDate() === date &&
            eventDate.getMonth() === month &&
            eventDate.getFullYear() === year
        );
    });
}

function daysInMonth(iMonth,iYear){
	return 32-new Date(iYear,iMonth,32).getDate();
}

function next(){
	currentYear=currentMonth===11?currentYear+1:currentYear;
	currentMonth=(currentMonth+1)%12;
	showCalendar(currentMonth,currentYear);
	highlightEventDates();

}

function previous() {
    currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
	highlightEventDates();

}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
	highlightEventDates();

}
function generateYearRange(start, end) {
    let years = "";
    for (let year = start; year <= end; year++) {
        years += `<option value="${year}">${year}</option>`;
    }
    return years;

document.getElementById("year").innerHTML=generateYearRange(2015,2051);
showCalendar(currentMonth,currentYear);
}
function showMoreInfo(popupId) {
    document.getElementById(popupId).showModal();
}

function closeMoreInfo(popupId) {
    document.getElementById(popupId).close();
}

function viewEvent(event) {
    // Example: Set the poster image source based on the event ID
	//const formattedTitle = eventTitle.replace(/\s+/g, '_').toLowerCase().replace(/[^a-z0-9_]/g, '');
    //const posterSrc = `images/${formattedTitle}.jpg`;
    
	try {
		console.log('Opening event:', event); // Debug log

	//const eventDate = new Date(event.date);
    //const formattedDate = eventDate.toISOString().split('T')[0];
    const sanitizedTitle = event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const posterSrc = `/images/${sanitizedTitle}.jpg`; // Assuming jpg format
    
	console.log('Looking for poster at:', posterSrc); // Debug log
    const posterElement = document.getElementById('eventPoster');
        posterElement.onerror = () => {
            console.error('Failed to load image:', posterSrc);
            alert('Event poster not found');
        };
        posterElement.src = posterSrc;
        document.getElementById('eventPosterModal').showModal();	
}catch (error) {
	console.error('Error in viewEvent:', error);
	alert('Error viewing event');
}
	//document.getElementById('eventPoster').src = posterSrc;
    //document.getElementById('eventPosterModal').showModal();
}

// function closeModal() {
//     document.getElementById('eventPosterModal').close();
// }
/*function displayEvents(events, listId) {
	console.log(`Displaying events for ${listId}:`, events); // Debug log

	const eventList = document.getElementById(listId);
    
	if (!eventList) {
        console.error(`Element with id "${listId}" not found`);
        return;
    }
    
	eventList.innerHTML = "";
	if (!events || events.length === 0) {
        const noEventsMessage = document.createElement("li");
        noEventsMessage.textContent = "No events found";
        eventList.appendChild(noEventsMessage);
        return;
    }
    events.forEach(event => {
        const listItem = document.createElement("li");
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-GB');
		//listItem.innerHTML = `<strong>${event.title}</strong> - ${event.description} on ${new Date(event.date).toLocaleDateString()}`;
		listItem.innerHTML = `
		<strong>${event.title}</strong> - 
		${event.description} on 
		${formattedDate}
	`;
		// Add View button
	   const viewButton = document.createElement("button");
	   viewButton.className = "view-event";
	   viewButton.textContent = "View";
	   viewButton.onclick = function() {
		   viewEvent(event);
	   };
	   listItem.appendChild(viewButton);

		eventList.appendChild(listItem);
    });
}

function displayEvents(events) {
    const eventsContainer = document.getElementById('eventsContainer');
    eventsContainer.innerHTML = '';

    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';

        const sanitizedTitle = event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const posterSrc = `/images/${sanitizedTitle}.jpg`;

        eventCard.innerHTML = `
            <img src="${posterSrc}" alt="${event.title}">
            <div class="event-info">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
            </div>
			`;

			 eventsContainer.appendChild(eventCard);
    });
}*/

function displayEvents(events) {
    const eventsGrid = document.getElementById('eventsGrid');
    eventsGrid.innerHTML = '';

    // events.forEach(event => {
    //     const date = new Date(event.date);
    //     const card = createEventCard(event, date);
    //     eventsGrid.appendChild(card);
    // });
	events.forEach((event, index) => {
        const delay = index * 100; // Stagger animation
        const card = createEventCard(event, delay);
        eventsGrid.appendChild(card);
    });
}

function createEventCard(event, delay) {
    const div = document.createElement('div');
    div.className = 'event-card';
	div.style.animationDelay = `${delay}ms`;
    const date = new Date(event.date);
    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
    // div.innerHTML = `
    //     <div class="event-image">
    //         <img src="/images/${event.title.toLowerCase().replace(/\s+/g, '_')}.jpg" alt="${event.title}">
    //         <div class="event-date">
    //             <span class="day">${date.getDate()}</span>
    //             <span class="month">${date.toLocaleString('default', { month: 'short' }).toUpperCase()}</span>
    //         </div>
    //     </div>
    //     <div class="event-info">
    //         <h3>${event.title}</h3>
    //         <p class="event-description">${event.description}</p>
    //         <button class="view-details" onclick="viewEventDetails('${event.title}')">View Details</button>
    //     </div>
    // `;
	div.innerHTML = `<div class="event-image">
            <img src="/images/${event.title.toLowerCase().replace(/\s+/g, '_')}.jpg" 
                 alt="${event.title}"
                 loading="lazy">
            <div class="event-date">
                <span class="day">${date.getDate()}</span>
                <span class="month">${date.toLocaleString('default', { month: 'short' }).toUpperCase()}</span>
            </div>
        </div>
        <div class="event-info">
            <h3>${event.title}</h3>
            <p class="event-description">${event.description}</p>
            <div class="event-meta">
                <span><i class="fas fa-calendar"></i> ${formattedDate}</span>
                <button class="view-details" onclick="viewEventDetails('${event.title}')">
                    View Details
                </button>
            </div>
        </div>
    `;
    return div;
}

// Search and filter functionality


function filterEvents() {
    const searchTerm = document.getElementById('searchEvents').value.toLowerCase();
    const category = document.getElementById('filterCategory').value;

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm) ||
                            event.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || event.category === category;
        return matchesSearch && matchesCategory;
    });

    displayEvents(filteredEvents);
}
function highlightEventDates() {
    const cells = document.getElementsByTagName('td');
    Array.from(cells).forEach(cell => {
        const cellDate = new Date(currentYear, currentMonth, cell.textContent);
        const hasEvent = events.some(event => {
            const eventDate = new Date(event.date);
            return eventDate.getDate() === cellDate.getDate() &&
                   eventDate.getMonth() === cellDate.getMonth() &&
                   eventDate.getFullYear() === cellDate.getFullYear();
        });
        if (hasEvent) {
            cell.classList.add('event-marker');
        }
    });
}
const techFusionEvent = {
    title: "Tech Fusion",
    date: "2025-01-11",
    description: "An online event testing knowledge on CS Fundamentals like DS, OOPS, Data Communication. There were brainbuster riddles and puzzles. A creative interview round followed it to test situation based awareness of participants.",
    category: "technical",
    image: "Events/TechFusion.webp"
};
function createEventCard(event, delay) {
    const div = document.createElement('div');
    // ...existing card creation code...

    // Add event listener after the button is created
    const viewDetailsButton = div.querySelector('.view-details');
    if (viewDetailsButton) {
        viewDetailsButton.addEventListener('click', () => {
            viewEventDetails(event.title);
        });
    }

    return div;
}
// document.querySelector('.view-details').addEventListener('click', () => {
//     showEventDetails(techFusionEvent);
// });

function showEventDetails(event) {
    const modal = document.createElement('div');
    modal.className = 'event-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <img src="${event.image}" alt="${event.title}">
            <h2>${event.title}</h2>
            <p class="event-date"><i class="fas fa-calendar"></i> ${new Date(event.date).toLocaleDateString()}</p>
            <p class="event-description">${event.description}</p>
            <button class="register-button">Register Now</button>
        </div>
    `;
	document.body.appendChild(modal);
    modal.querySelector('.close-button').onclick = () => modal.remove();
}
function viewEventDetails(title) {
    try {
        // Find the event in our events array
        const event = events.find(e => e.title === title);
        if (!event) {
            console.error('Event not found:', title);
            return;
        }

        // Get modal elements
        const modal = document.getElementById('eventDetailsModal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDate = document.getElementById('modalDate').querySelector('span');
        const modalDescription = document.getElementById('modalDescription');

        // Set modal content
        const sanitizedTitle = event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        modalImage.src = `Events/${sanitizedTitle}.webp`;
        modalTitle.textContent = event.title;
        modalDate.textContent = new Date(event.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        modalDescription.textContent = event.description;

        // Show modal
        modal.style.display = 'block';

        // Handle image load error
        modalImage.onerror = () => {
            console.error('Failed to load image:', modalImage.src);
            modalImage.src = 'images/placeholder.jpg'; // Fallback image
        };

    } catch (error) {
        console.error('Error showing event details:', error);
        alert('Error displaying event details');
    }
}

function closeEventDetails() {
    document.getElementById('eventDetailsModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('eventDetailsModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Text animation for hero section
// Text animation for hero section
document.addEventListener('DOMContentLoaded', () => {
    try {
        const title = document.querySelector('.animated-title');
        if (!title) {
            console.log('Animated title element not found');
            return;
        }

        const text = 'ACCESS\u00A0Events';
        title.textContent = ''; // Clear existing text
        
        // Create and append spans for each character
        [...text].forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animationDelay = `${index * 0.1}s`; // Delay each character
            title.appendChild(span);
        });
        
        title.style.opacity = 1; // Make the container visible
    } catch (error) {
        console.error('Error in text animation:', error);
    }
});
// Remove all existing DOMContentLoaded event listeners for menu
// and replace with this single one

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    //const navbar = document.querySelector('.navbar');
    if (menuToggle && menu) {

        menuToggle.addEventListener('click', (e) => {

            e.stopPropagation(); // Prevent event from bubbling
            menu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    // Close menu when clicking a menu item
    const menuItems = menu.querySelectorAll('a');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
                menu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
});

// document.querySelector('.menu-toggle').addEventListener('click', function() {
//     document.querySelector('.nav-menu').classList.toggle('active');
// });
