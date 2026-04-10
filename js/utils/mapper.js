const TEAM_CLASSES = {
    "Mercedes": "team-mercedes",
    "Ferrari": "team-ferrari",
    "McLaren": "team-mclaren",
    "Red Bull Racing": "team-red-bull",
    "Aston Martin": "team-aston-martin",
    "Alpine F1 Team": "team-alpine",
    "Williams": "team-williams",
    "Visa Cash App RB": "team-rb",
    "Kick Sauber": "team-sauber",
    "Haas F1 Team": "team-haas"
};

// Map driver names to their exact Wikipedia article titles
const DRIVER_WIKI = {
    "verstappen":   "Max_Verstappen",
    "norris":       "Lando_Norris",
    "leclerc":      "Charles_Leclerc",
    "antonelli":    "Andrea_Kimi_Antonelli",
    "russell":      "George_Russell_(racing_driver)",
    "hamilton":     "Lewis_Hamilton",
    "piastri":      "Oscar_Piastri",
    "sainz":        "Carlos_Sainz_Jr.",
    "alonso":       "Fernando_Alonso",
    "tsunoda":      "Yuki_Tsunoda",
    "ocon":         "Esteban_Ocon",
    "gasly":        "Pierre_Gasly",
    "albon":        "Alexander_Albon",
    "hulkenberg":   "Nico_Hülkenberg",
    "perez":        "Sergio_Pérez",
    "stroll":       "Lance_Stroll",
    "bearman":      "Oliver_Bearman",
    "colapinto":    "Franco_Colapinto",
    "bottas":       "Valtteri_Bottas",
    "zhou":         "Zhou_Guanyu",
    "lawson":       "Liam_Lawson",
    "doohan":       "Jack_Doohan",
    "hadjar":       "Isack_Hadjar",
    "bortoleto":    "Gabriel_Bortoleto"
};

// Map team names to their Wikipedia article titles
const TEAM_WIKI = {
    "Mercedes":        "Mercedes-AMG_Petronas_Formula_One_Team",
    "Ferrari":         "Scuderia_Ferrari",
    "McLaren":         "McLaren",
    "Red Bull Racing": "Red_Bull_Racing",
    "Aston Martin":    "Aston_Martin_in_Formula_One",
    "Alpine F1 Team":  "Alpine_F1_Team",
    "Williams":        "Williams_Racing",
    "Visa Cash App RB": "RB_Formula_One_Team",
    "Kick Sauber":     "Stake_F1_Team_Kick_Sauber",
    "Haas F1 Team":    "Haas_F1_Team"
};

const WIKI_SUMMARY_BASE = "https://en.wikipedia.org/api/rest_v1/page/summary";
const DEFAULT_AVATAR = "https://placehold.co/300x400/1e2029/aaaaaa?text=No+Image";
const DEFAULT_LOGO   = "https://placehold.co/120x60/1e2029/aaaaaa?text=No+Logo";

// Direct hardcoded logo URLs for teams where Wikipedia gives wrong thumbnails (car photos)
// Only Red Bull and Audi are overridden — all other teams use Wikipedia REST API
const LOGO_OVERRIDES = {
    "Red Bull Racing": "https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Red_Bull_Racing_Logo_2026.svg/500px-Red_Bull_Racing_Logo_2026.svg.png",
    "Audi":            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Audif1.com_logo17_%28cropped%29.svg/330px-Audif1.com_logo17_%28cropped%29.svg.png"
};

// Fetch Wikipedia summary and return thumbnail URL
async function getWikiThumb(articleTitle) {
    try {
        const url = `${WIKI_SUMMARY_BASE}/${encodeURIComponent(articleTitle)}`;
        const res = await fetch(url);
        if (!res.ok) return null;
        const data = await res.json();
        return data.thumbnail?.source || null;
    } catch {
        return null;
    }
}

export async function getMergedDriverData(ergastDrivers) {
    // Fetch all driver images in parallel
    const driversWithImages = await Promise.all(
        ergastDrivers.map(async driver => {
            const firstName = driver.Driver.givenName;
            const lastName  = driver.Driver.familyName;
            const teamName  = driver.Constructors[0]?.name || "Unknown Team";

            // Normalize to lowercase ASCII for key lookup (handles accents/umlauts)
            const keyRaw = lastName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const wikiTitle = DRIVER_WIKI[keyRaw] || `${firstName}_${lastName}`.replace(/ /g, "_");

            const image = (await getWikiThumb(wikiTitle)) || DEFAULT_AVATAR;

            return {
                id:          driver.Driver.driverId,
                position:    parseInt(driver.position),
                name:        `${firstName} ${lastName}`,
                team:        teamName,
                teamClass:   TEAM_CLASSES[teamName] || "",
                points:      parseFloat(driver.points),
                wins:        driver.wins,
                nationality: driver.Driver.nationality,
                image:       image
            };
        })
    );
    return driversWithImages;
}

export async function getMergedConstructorData(ergastConstructors) {
    const constructorsWithLogos = await Promise.all(
        ergastConstructors.map(async constructor => {
            const teamName = constructor.Constructor.name;

            let logo;
            if (LOGO_OVERRIDES[teamName]) {
                // Hardcoded logo for Red Bull and Audi — skips Wikipedia entirely
                logo = LOGO_OVERRIDES[teamName];
            } else {
                const wikiTitle = TEAM_WIKI[teamName] || teamName.replace(/ /g, "_");
                logo = (await getWikiThumb(wikiTitle)) || DEFAULT_LOGO;
            }

            return {
                id:          constructor.Constructor.constructorId,
                position:    parseInt(constructor.position),
                name:        teamName,
                teamClass:   TEAM_CLASSES[teamName] || "",
                points:      parseFloat(constructor.points),
                wins:        constructor.wins,
                nationality: constructor.Constructor.nationality,
                logo:        logo
            };
        })
    );
    return constructorsWithLogos;
}

// ---------- Favorites (localStorage) ----------
export function getFavorites() {
    return JSON.parse(localStorage.getItem("f1_favorites") || "[]");
}

export function toggleFavoriteDriver(driverId) {
    let favorites = getFavorites();
    if (favorites.includes(driverId)) {
        favorites = favorites.filter(id => id !== driverId);
    } else {
        favorites.push(driverId);
    }
    localStorage.setItem("f1_favorites", JSON.stringify(favorites));
    return favorites;
}
