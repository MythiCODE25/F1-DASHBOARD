import { fetchDriverStandings } from "../api/ergast.js";
import { getMergedDriverData, getFavorites, toggleFavoriteDriver } from "../utils/mapper.js";

let currentDrivers = [];
let debounceTimer;

export async function loadDrivers() {
    document.getElementById("page-header").innerHTML = `
      <h2>Championship Standings</h2>
      <p>World Drivers' Championship</p>
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
        }
        renderDriversList(currentDrivers);
    } catch (error) {
        document.getElementById("main-grid").innerHTML = `<p style="color:red">Failed to load drivers.</p>`;
    }
    
    document.getElementById("loader-container").classList.add("hidden");
}

let showFavoritesOnly = false;
let initDone = false;

export function initDriverControls() {
    if (initDone) return;
    initDone = true;
    
    document.getElementById("sort-points-btn").addEventListener("click", () => {
        const sorted = [...currentDrivers].sort((a, b) => b.points - a.points);
        renderDriversList(sorted);
    });

    document.getElementById("sort-pos-btn").addEventListener("click", () => {
        const sorted = [...currentDrivers].sort((a, b) => a.position - b.position);
        renderDriversList(sorted);
    });

    document.getElementById("filter-fav-btn").addEventListener("click", () => {
        showFavoritesOnly = !showFavoritesOnly;
        const btn = document.getElementById("filter-fav-btn");
        if (showFavoritesOnly) {
            btn.classList.add("active");
            const favorites = getFavorites();
            const filtered = currentDrivers.filter(d => favorites.includes(d.id));
            renderDriversList(filtered);
        } else {
            btn.classList.remove("active");
            renderDriversList(currentDrivers);
        }
    });

    const searchBar = document.getElementById("search-bar");
    searchBar.addEventListener("input", (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const query = e.target.value.toLowerCase();
            const filtered = currentDrivers.filter(d => 
                d.name.toLowerCase().includes(query) || 
                d.team.toLowerCase().includes(query)
            );
            renderDriversList(filtered);
        }, 300);
    });
}

function renderDriversList(driversToRender) {
    const grid = document.getElementById("main-grid");
    if (!grid) return;

    if (driversToRender.length === 0) {
        grid.innerHTML = `<p style="text-align: center; width:100%">No drivers found.</p>`;
        return;
    }

    const favorites = getFavorites();

    const html = driversToRender.map(driver => {
        const isFav = favorites.includes(driver.id);
        const favIcon = isFav ? "★" : "☆";
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
                    <p class="driver-team">${driver.team}</p>
                    <div class="pts-wrapper">
                        <span class="pts-val">${driver.points}</span>
                        <span class="pts-lbl">pts</span>
                    </div>
                </div>
            </div>
        `;
    }).join("");

    grid.innerHTML = html;

    document.querySelectorAll(".fav-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            toggleFavoriteDriver(id);
            renderDriversList(driversToRender);
        });
    });
}
