document.addEventListener('DOMContentLoaded', async function() {
const calendarEl = document.getElementById('calendar');

// Fetch data from Apps Script Web App
const response = await fetch('https://script.google.com/macros/s/AKfycbwk8WSblv4iZYptM5J_layYzf-oDon9pDiXvTNt44S3FZBVo1CTb4d9tizHOm89Zl-K6w/exec');
const events = await response.json();

const calendar = new FullCalendar.Calendar(calendarEl, {
themeSystem: 'standard',
initialView: 'dayGridMonth',
events: events.map(event => ({
    title: event.title,
    start: event.start,
    allDay: event.allDay,
    color: event.clickable ? "#FFFFFF" : event.color,
    extendedProps: {
    clickable: event.clickable
    }
})),
dateClick: function(info) {
    const event = calendar.getEvents().find(e => e.startStr === info.dateStr);
    if (event && event.extendedProps.clickable) {
    alert(`Date: ${info.dateStr}\nPrice: ${event.title}`);
    }
}
});

calendar.render();
});