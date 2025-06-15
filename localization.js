const langData = {
    en: {
        langBtn: 'Fr',
        navHome: 'Home',
        navRooms: 'Rooms',
        navBooking: 'Booking',
        navTarif: 'Tarif',
        menuHome: "Home",
        menuRooms: "Rooms",
        menuBooking: "Booking",
        menuTarif: "Tarif",
        menuContact: "Contact",
        menuContact: "Contact",
        contactTitle: "Contact",
        followUsTitle: "Follow Us",
        labelCell: "Cellphone",
        labelEmail: "Email",
        labelAddress: "Address",
        // rooms 
        exploreTitle: "What's Yours to Explore",
        exploreLake: "Lake Access: Canoe, paddle-board, and more",
        exploreSpa: "7-Person Spa",
        exploreBackyard: "Large backyard: BBQ, badminton, ping-pong, foosball, playground",
        exploreView: "Picturesque views: Surrounded by nature with lake view from patio",
        exploreCharger: "Electric car charger available",
        room1: "BD1",
        room2: "BD2",
        room3: "BD3",
        room4: "BD4",
        room5: "BD5",
        // calendar
        calenderText: "Pick a date and book your next nature escape",
    },
    fr: {
        langBtn: 'En',
        navHome: 'Accueil',
        navRooms: 'Chambres',
        navBooking: 'Réservation',
        navTarif: 'Tarifs',
        menuHome: "Accueil",
        menuRooms: "Chambres",
        menuBooking: "Réservation",
        menuTarif: "Tarifs",
        menuContact: "Contact",
        menuContact: "Contact",
        contactTitle: "Contact",
        followUsTitle: "Suivez-nous",
        labelCell: "Téléphone",
        labelEmail: "Courriel",
        labelAddress: "Adresse",
        // rooms
        exploreTitle: "À découvrir chez vous",
        exploreLake: "Accès au lac: canot, paddle board et plus",
        exploreSpa: "Spa 7 places",
        exploreBackyard: "Grande cour: BBQ, badminton, ping-pong, baby-foot, aire de jeux",
        exploreView: "Vues pittoresques: entouré de nature avec vue sur le lac",
        exploreCharger: "Borne de recharge électrique disponible",
        room1: "Chambre 1",
        room2: "Chambre 2",
        room3: "Chambre 3",
        room4: "Chambre 4",
        room5: "Chambre 5",
        // calendar
        calenderText: "Choisissez une date et réservez votre prochaine escapade en pleine nature",
    }
};

function setLanguage(lang) {
    const data = langData[lang];
    document.getElementById('langBtn').innerText = data.langBtn;
    document.getElementById('navHome').innerText = data.navHome;
    document.getElementById('navRooms').innerText = data.navRooms;
    document.getElementById('navBooking').innerText = data.navBooking;
    document.getElementById('navTarif').innerText = data.navTarif;
    document.querySelector('[data-i18n="menuContact"]').innerText = data.menuContact;
    document.getElementById('contactTitle').innerText = data.contactTitle;
    document.getElementById('followUsTitle').innerText = data.followUsTitle;
    document.querySelector('[data-i18n="labelCell"]').innerText = data.labelCell + ":";
    document.querySelector('[data-i18n="labelEmail"]').innerText = data.labelEmail + ":";
    document.querySelector('[data-i18n="labelAddress"]').innerText = data.labelAddress + ":";

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerText = data[key] || el.innerText;
      });
    localStorage.setItem('preferredLanguage', lang);
    setupOtherContent(lang);
}

(function () {
    let lang = localStorage.getItem('preferredLanguage');
    if (!lang) {
        const browserLang = navigator.language || navigator.userLanguage;
        lang = browserLang.startsWith('fr') ? 'fr' : 'en';
    }
    setLanguage(lang);

    document.getElementById('langBtn').addEventListener('click', () => {
        const newLang = document.getElementById('langBtn').innerText.toLowerCase() === 'fr' ? 'fr' : 'en';
        setLanguage(newLang);
    });
}
)();

document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mainNav').classList.toggle('show');
});