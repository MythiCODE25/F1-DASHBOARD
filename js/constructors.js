import fetchData from "./api.js";
import {showLoader,showError} from "../main.js";
import {renderConstructors} from "./ui.js";

export default async function loadConstructors(){
    try {
        showLoader();
        let data = await fetchData("https://api.jolpi.ca/ergast/f1/current/constructorStandings.json");
        let constructorStandings  = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        renderConstructors(constructorStandings);
    } 
    catch (error) {
        showError();
        console.log("API ERROR:",error);
    }
}