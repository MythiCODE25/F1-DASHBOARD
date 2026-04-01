import fetchData from "./api.js";
import {showLoader,showError} from "../main.js";
import {renderDrivers} from "./ui.js";

export default async function loadDrivers(){
    try {
        showLoader();
        const data = await fetchData("https://api.jolpi.ca/ergast/f1/current/driverStandings.json");
        const drivers = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        renderDrivers(drivers);
    } 
    catch (error) {
        showError()
        console.log("API ERROR:",error)
    }
}

