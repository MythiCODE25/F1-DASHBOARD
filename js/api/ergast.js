export const ERGAST_URL = "https://api.jolpi.ca/ergast/f1/current";

export async function fetchDriverStandings() {
    try {
        const response = await fetch(`${ERGAST_URL}/driverStandings.json`);
        if (!response.ok) throw new Error("Ergast Drivers Fetch Failed");
        const data = await response.json();
        return data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function fetchConstructorStandings() {
    try {
        const response = await fetch(`${ERGAST_URL}/constructorStandings.json`);
        if (!response.ok) throw new Error("Ergast Constructors Fetch Failed");
        const data = await response.json();
        return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function fetchRaceCalendar() {
    try {
        const response = await fetch(`${ERGAST_URL}.json`);
        if (!response.ok) throw new Error("Ergast Calendar Fetch Failed");
        const data = await response.json();
        return data.MRData.RaceTable.Races;
    } catch (error) {
        console.error(error);
        return [];
    }
}
