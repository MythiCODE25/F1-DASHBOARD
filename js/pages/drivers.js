import { fetchDriverStandings } from "../api/ergast.js";
import { getMergedDriverData, getFavorites, toggleFavoriteDriver } from "../utils/mapper.js";

let currentDrivers = [];
let debounceTimer;
let showFavoritesOnly = false;
let initDone = false;

export async function loadDrivers() {
    document.getElementById("page-header").innerHTML = `
      <h2>Championship Standings</h2>
      <p>World Drivers' Championship · 2025</p>
    `;

    document.getElementById("loader-container").classList.remove("hidden");
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("loader-text").classList.remove("hidden");

    document.getElementById("main-grid").innerHTML = "";
    document.getElementById("main-grid").className = "grid";

    try {
        if (currentDrivers.length === 0) {
            const rawDrivers = await fetchDriverStandings();
            currentDrivers = await getMergedDriverData(rawDrivers);
            populateTeamFilter(currentDrivers);
        }
        applyFiltersAndRender();
    } catch (error) {
        document.getElementById("main-grid").innerHTML = `<p style="color:red">Failed to load drivers.</p>`;
    }

    document.getElementById("loader-container").classList.add("hidden");
}

// Populate the "All Teams" dropdown with unique team names from the data
function populateTeamFilter(drivers) {
    const select = document.getElementById("team-filter");
    if (!select) return;

    // Get sorted unique team names
    const teams = [...new Set(drivers.map(d => d.team))].sort();
    teams.forEach(team => {
        const opt = document.createElement("option");
        opt.value = team;
        opt.textContent = team;
        select.appendChild(opt);
    });
}

// Apply current search + team + sort state and re-render
function applyFiltersAndRender() {
    const query     = (document.getElementById("search-bar")?.value || "").toLowerCase();
    const teamVal   = document.getElementById("team-filter")?.value || "all";
    const sortVal   = document.getElementById("sort-select")?.value || "position";
    const favorites = getFavorites();

    let result = [...currentDrivers];

    // Filter: favorites only
    if (showFavoritesOnly) {
        result = result.filter(d => favorites.includes(d.id));
    }

    // Filter: team dropdown
    if (teamVal !== "all") {
        result = result.filter(d => d.team === teamVal);
    }

    // Filter: search query (name or team)
    if (query) {
        result = result.filter(d =>
            d.name.toLowerCase().includes(query) ||
            d.team.toLowerCase().includes(query)
        );
    }

    // Sort
    if (sortVal === "points-desc") {
        result.sort((a, b) => b.points - a.points);
    } else if (sortVal === "points-asc") {
        result.sort((a, b) => a.points - b.points);
    } else if (sortVal === "name") {
        result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        // default: position
        result.sort((a, b) => a.position - b.position);
    }

    renderDriversList(result);
}

export function initDriverControls() {
    if (initDone) return;
    initDone = true;

    // Sort dropdown
    document.getElementById("sort-select")?.addEventListener("change", applyFiltersAndRender);

    // Team filter dropdown
    document.getElementById("team-filter")?.addEventListener("change", applyFiltersAndRender);

    // Favorites toggle
    document.getElementById("filter-fav-btn")?.addEventListener("click", () => {
        showFavoritesOnly = !showFavoritesOnly;
        const btn = document.getElementById("filter-fav-btn");
        btn.classList.toggle("active", showFavoritesOnly);
        applyFiltersAndRender();
    });

    // Debounced search
    document.getElementById("search-bar")?.addEventListener("input", () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(applyFiltersAndRender, 300);
    });
}

function renderDriversList(driversToRender) {
    const grid = document.getElementById("main-grid");
    if (!grid) return;

    if (driversToRender.length === 0) {
        grid.innerHTML = `<p style="text-align:center;width:100%;padding:40px;color:#aaa">No drivers found.</p>`;
        return;
    }

    const favorites = getFavorites();

    const html = driversToRender.map(driver => {
        const isFav    = favorites.includes(driver.id);
        const favIcon  = isFav ? "★" : "☆";
        const favClass = isFav ? "is-fav" : "";

        let posClass = "pos-other";
        if (driver.position === 1) posClass = "pos-1";
        else if (driver.position === 2) posClass = "pos-2";
        else if (driver.position === 3) posClass = "pos-3";

        return `
            <div class="card" style="border-left-color: var(--${driver.teamClass});">
                <div class="driver-img-container">
                    <div class="pos-wrapper ${posClass}">#${driver.position}</div>
                    <button class="fav-btn ${favClass}" data-id="${driver.id}">${favIcon}</button>
                    <img src="${driver.image}" alt="${driver.name}" class="driver-img">
                </div>
                <div class="card-body">
                    <h3 class="driver-name">${driver.name}</h3>
                    <p class="driver-team">${driver.team.toUpperCase()}</p>
                    <div class="pts-wrapper">
                        <span class="pts-val">${driver.points}</span>
                        <span class="pts-lbl">pts</span>
                    </div>
                </div>
            </div>
        `;
    }).join("");

    grid.innerHTML = html;

    // Attach favorite button events after rendering
    document.querySelectorAll(".fav-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            toggleFavoriteDriver(id);
            applyFiltersAndRender();
        });
    });
}
