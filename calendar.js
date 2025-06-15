document.addEventListener('DOMContentLoaded', async function() {
const calendarEl = document.getElementById('calendar');

// Fetch data from Apps Script Web App
const response = await fetch('https://script.google.com/macros/s/AKfycbwk8WSblv4iZYptM5J_layYzf-oDon9pDiXvTNt44S3FZBVo1CTb4d9tizHOm89Zl-K6w/exec');
const events = await response.json();

let lang = localStorage.getItem('preferredLanguage');
if (!lang) {
    const browserLang = navigator.language || navigator.userLanguage;
    lang = browserLang.startsWith('fr') ? 'fr' : 'en';
}

const calendar = new FullCalendar.Calendar(calendarEl, {
    themeSystem: 'standard',
    initialView: 'dayGridMonth',
    locale: lang,
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

async function renderCalendar(locale) {
    const calendarEl = document.getElementById('calendar');

    // Fetch data from Apps Script Web App
    const response = await fetch('https://script.google.com/macros/s/AKfycbwk8WSblv4iZYptM5J_layYzf-oDon9pDiXvTNt44S3FZBVo1CTb4d9tizHOm89Zl-K6w/exec');
    const events = await response.json();

    if (calendar) {
        console.log(calendar); 
        //calendar.destroy(); // destroy the old instance
    }

    calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: locale,
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
}