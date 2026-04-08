import { fetchRaceCalendar } from "../api/ergast.js";

export async function loadCalendar() {
    document.getElementById("page-header").innerHTML = `
      <h2>Race Calendar</h2>
      <p>FIA Formula One World Championship</p>
    `;

    document.getElementById("loader-container").classList.remove("hidden");
    document.getElementById("main-grid").innerHTML = "";
    document.getElementById("main-grid").className = "grid";

    try {
        const races = await fetchRaceCalendar();
        renderCalendar(races);
    } catch (error) {
        document.getElementById("main-grid").innerHTML = `<p style="color:red">Failed to load calendar.</p>`;
    }
    
    document.getElementById("loader-container").classList.add("hidden");
}

function renderCalendar(races) {
    const grid = document.getElementById("main-grid");
    if (!grid) return;

    if (races.length === 0) {
        grid.innerHTML = `<p style="color:red">No races found.</p>`;
        return;
    }

    const html = races.map(race => {
        let raceDateDisplay = "Unknown date";
        if (race.date) {
            const parsed = new Date(`${race.date}T${race.time || "00:00:00Z"}`);
            raceDateDisplay = parsed.toLocaleDateString();
        }

        return `
            <div class="card calendar-card">
                <p class="cal-round">Round ${race.round}</p>
                <h3 class="cal-title">${race.raceName}</h3>
                <div class="cal-detail">
                    <strong>Circuit:</strong> <span>${race.Circuit.circuitName}</span>
                </div>
                <div class="cal-detail">
                    <strong>Location:</strong> <span>${race.Circuit.Location.locality}, ${race.Circuit.Location.country}</span>
                </div>
                <div class="cal-detail">
                    <strong>Date:</strong> <span>${raceDateDisplay}</span>
                </div>
            </div>
        `;
    }).join("");

    grid.innerHTML = html;
}
