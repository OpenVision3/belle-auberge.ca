const langData = {
    en: {
        langBtn: 'Fr',
        navHome: 'Home',
        navRooms: 'Rooms',
        navBooking: 'Booking',
        navTarif: 'Tarif',
        menuContact: "Contact",
        contactTitle: "Contact",
        followUsTitle: "Follow Us",
        labelCell: "Cellphone",
        labelEmail: "Email",
        labelAddress: "Address"
    },
    fr: {
        langBtn: 'En',
        navHome: 'Accueil',
        navRooms: 'Chambres',
        navBooking: 'Réservation',
        navTarif: 'Tarifs',
        menuContact: "Contact",
        contactTitle: "Contact",
        followUsTitle: "Suivez-nous",
        labelCell: "Téléphone",
        labelEmail: "Courriel",
        labelAddress: "Adresse"
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
    localStorage.setItem('preferredLanguage', lang);
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