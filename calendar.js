document.addEventListener('DOMContentLoaded', async function() {
    let lang = localStorage.getItem('preferredLanguage');
    if (!lang) {
        const browserLang = navigator.language || navigator.userLanguage;
        lang = browserLang.startsWith('fr') ? 'fr' : 'en';
    }

    renderCalendar(lang);
});

async function fetchAndUpdatePrice(dateStr) {
    const response = await fetch(`https://script.google.com/macros/s/AKfycbwk8WSblv4iZYptM5J_layYzf-oDon9pDiXvTNt44S3FZBVo1CTb4d9tizHOm89Zl-K6w/exec?date=${dateStr}`);
    const todayPrices = await response.json();
    const item = todayPrices[0];
    
    for (let i = 1; i <= 5; i++) {
        const card = document.getElementById(`room${i}`);
        if (!card) continue;

        const priceDiv = card.querySelector('.price');
        const cleaningfeeDiv = card.querySelector('.cleaningfee');
        const dateDiv = card.querySelector('.date');
        const bookBtn = card.querySelector('.book-button');

        const price = item[`option${i}`];
        const cleaning = item[`cleaningfee${i}`];
        const dateStr = new Date(item["date"]).toLocaleDateString();

        if (priceDiv) {
            priceDiv.textContent = `$${price}`;
        }

        if (cleaningfeeDiv) {
            cleaningfeeDiv.textContent = `$${cleaning}`;
        }

        if (dateDiv) {
            dateDiv.textContent = `${dateStr}`;
        }

        if (bookBtn) {
            if (!item.isAvailable) {
                bookBtn.disabled = true;
            } else {
                bookBtn.disabled = false;
            }
        }
    }
}

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
        color: event.clickable ? "#4a7c59" : event.color,
        extendedProps: {
        clickable: event.clickable
        }
    })),
    dateClick: async function(info) {
        const event = calendar.getEvents().find(e => e.startStr === info.dateStr);
        if (event && event.extendedProps.clickable) {
            await fetchAndUpdatePrice(info.dateStr);
        }
    }
    });

    calendar.render();
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const dd = String(today.getDate()).padStart(2, '0');

    const todayStr = `${yyyy}-${mm}-${dd}`;
    await fetchAndUpdatePrice(todayStr);
}