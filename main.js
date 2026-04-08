import { loadDrivers, initDriverControls } from './js/pages/drivers.js';
import { loadConstructors } from './js/pages/constructors.js';
import { loadCalendar } from './js/pages/calendar.js';

let activeTab = 'drivers';

const tabs = {
    'driversTab': { load: loadDrivers, name: 'drivers' },
    'constructorsTab': { load: loadConstructors, name: 'constructors' },
    'calendarTab': { load: loadCalendar, name: 'calendar' }
};

function setActiveTab(tabId) {
    // Remove active class from all
    Object.keys(tabs).forEach(id => {
        const el = document.getElementById(id);
        if(el) el.classList.remove("active");
    });
    
    // Add active to current
    const currentEl = document.getElementById(tabId);
    if(currentEl) currentEl.classList.add("active");
    
    activeTab = tabs[tabId].name;
    
    // Hide/show the controls section
    const controls = document.getElementById("controls-container");
    if(controls) {
        if (activeTab === 'drivers') {
            controls.style.display = "flex";
        } else {
            controls.style.display = "none";
        }
    }

    // execute load logic
    tabs[tabId].load();
}

// Bind tabs
Object.keys(tabs).forEach(id => {
    const el = document.getElementById(id);
    if(el) {
        el.addEventListener("click", () => setActiveTab(id));
    }
});

// Boot up
document.addEventListener("DOMContentLoaded", () => {
    initDriverControls();
    setActiveTab('driversTab');
});