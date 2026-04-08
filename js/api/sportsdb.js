export async function fetchTeams() {
    try {
        // The endpoint provided in requirements (note: might 404 or be restricted)
        const response = await fetch("https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=4370");
        if (!response.ok) throw new Error("SportsDB Teams Fetch Failed");
        const data = await response.json();
        return data.teams || [];
    } catch (error) {
        console.warn("Could not fetch teams from SportsDB:", error);
        return []; // Return empty array as fallback
    }
}

export async function fetchPlayers(teamId) {
    try {
        // The endpoint provided in requirements
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=${teamId}`);
        if (!response.ok) throw new Error("SportsDB Players Fetch Failed");
        const data = await response.json();
        return data.player || [];
    } catch (error) {
        console.warn(`Could not fetch players for team ${teamId}:`, error);
        return []; // Return empty array as fallback
    }
}
