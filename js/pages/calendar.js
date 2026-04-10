import { fetchRaceCalendar } from "../api/ergast.js";

export async function loadCalendar() {
    document.getElementById("page-header").innerHTML = `
      <h2>Race Calendar</h2>
      <p>FIA Formula One World Championship · 2025</p>
    `;

    document.getElementById("loader-container").classList.remove("hidden");
    document.getElementById("main-grid").innerHTML = "";
    document.getElementById("main-grid").className = "grid calendar-grid";

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
        grid.innerHTML = `<p style="text-align:center;width:100%">No races found.</p>`;
        return;
    }

    const now = new Date();

    const html = races.map(race => {
        // Build the race date — use noon UTC if no time provided so day comparison works globally
        const raceDate = new Date(`${race.date}T${race.time || "12:00:00Z"}`);
        const isDone = raceDate < now;

        // Human-readable date string
        const dateDisplay = raceDate.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });

        const doneClass   = isDone ? "race-done" : "";
        const statusLabel = isDone
            ? `<span class="race-status done-label">✓ Completed</span>`
            : `<span class="race-status upcoming-label">Upcoming</span>`;

        return `
            <div class="card calendar-card ${doneClass}">
                <p class="cal-round">Round ${race.round}</p>
                ${statusLabel}
                <h3 class="cal-title">${race.raceName}</h3>
                <div class="cal-detail">
                    <strong>Circuit:</strong>
                    <span>${race.Circuit.circuitName}</span>
                </div>
                <div class="cal-detail">
                    <strong>Location:</strong>
                    <span>${race.Circuit.Location.locality}, ${race.Circuit.Location.country}</span>
                </div>
                <div class="cal-detail">
                    <strong>Date:</strong>
                    <span>${dateDisplay}</span>
                </div>
            </div>
        `;
    }).join("");

    grid.innerHTML = html;
}
