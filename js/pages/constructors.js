import { fetchConstructorStandings } from "../api/ergast.js";
import { getMergedConstructorData } from "../utils/mapper.js";

let currentConstructors = [];

export async function loadConstructors() {
    document.getElementById("page-header").innerHTML = `
      <h2>Constructor Standings</h2>
      <p>World Constructors' Championship</p>
    `;

    document.getElementById("loader-container").classList.remove("hidden");
    document.getElementById("main-grid").innerHTML = "";
    document.getElementById("main-grid").className = "grid constructors-grid";

    try {
        if (currentConstructors.length === 0) {
            const rawConstructors = await fetchConstructorStandings();
            currentConstructors = await getMergedConstructorData(rawConstructors);
        }
        renderConstructorsList(currentConstructors);
    } catch (error) {
        document.getElementById("main-grid").innerHTML = `<p style="color:red">Failed to load constructors.</p>`;
    }
    
    document.getElementById("loader-container").classList.add("hidden");
}

function renderConstructorsList(constructorsToRender) {
    const grid = document.getElementById("main-grid");
    if (!grid) return;

    const html = constructorsToRender.map(team => {
        let posClass = "pos-other";
        if (team.position === 1) posClass = "pos-1";
        else if (team.position === 2) posClass = "pos-2";
        else if (team.position === 3) posClass = "pos-3";

        return `
            <div class="card constructor-card" style="border-left-color: var(--${team.teamClass});">
                <div class="pos-wrapper ${posClass}">#${team.position}</div>
                <img src="${team.logo}" alt="${team.name}" class="constructor-img">
                <div class="constructor-details">
                    <h3 class="constructor-name">${team.name}</h3>
                    <p class="constructor-nat">${team.nationality}</p>
                </div>
                <div class="pts-wrapper">
                    <span class="pts-val">${team.points}</span>
                    <span class="pts-lbl">pts</span>
                </div>
            </div>
        `;
    }).join("");

    grid.innerHTML = html;
}
