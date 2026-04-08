const TEAM_MAPPING = {
    "Red Bull": "Red Bull Racing",
    "Mercedes": "Mercedes AMG Petronas",
    "Ferrari": "Ferrari",
    "McLaren": "McLaren",
    "Aston Martin": "Aston Martin",
    "Alpine F1 Team": "Alpine F1 Team",
    "Williams": "Williams",
    "Haas F1 Team": "Haas F1 Team",
    "Visa Cash App RB": "Visa Cash App RB",
    "Kick Sauber": "Kick Sauber",
    "Sauber": "Kick Sauber"
};

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

// Hardcoded safe Wikimedia thumbs to avoid SportsDB 404s and Wikipedia Hotlink 403s
const DRIVER_IMAGES = {
    "Verstappen": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Max_Verstappen_2017_Malaysia_3.jpg/300px-Max_Verstappen_2017_Malaysia_3.jpg",
    "Norris": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Lando_Norris_2019.jpg/300px-Lando_Norris_2019.jpg",
    "Leclerc": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Charles_Leclerc_2019.jpg/300px-Charles_Leclerc_2019.jpg",
    "Antonelli": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Andrea_Kimi_Antonelli_2023.jpg/300px-Andrea_Kimi_Antonelli_2023.jpg",
    "Russell": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/George_Russell_2019.jpg/300px-George_Russell_2019.jpg",
    "Hamilton": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg/300px-Lewis_Hamilton_2016_Malaysia_2.jpg",
    "Piastri": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Oscar_Piastri_2022.jpg/300px-Oscar_Piastri_2022.jpg",
    "Sainz": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Carlos_Sainz_Jr_2019.jpg/300px-Carlos_Sainz_Jr_2019.jpg",
    "Alonso": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Fernando_Alonso_2018.jpg/300px-Fernando_Alonso_2018.jpg",
    "Tsunoda": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Yuki_Tsunoda_2022.jpg/300px-Yuki_Tsunoda_2022.jpg",
    "Ocon": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Esteban_Ocon_2017.jpg/300px-Esteban_Ocon_2017.jpg",
    "Gasly": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Pierre_Gasly_2017.jpg/300px-Pierre_Gasly_2017.jpg",
    "Albon": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Alex_Albon_2019.jpg/300px-Alex_Albon_2019.jpg",
    "Hülkenberg": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Nico_Hulkenberg_2017.jpg/300px-Nico_Hulkenberg_2017.jpg",
    "Pérez": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Sergio_Perez_2019.jpg/300px-Sergio_Perez_2019.jpg",
    "Stroll": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Lance_Stroll_2017.jpg/300px-Lance_Stroll_2017.jpg",
    "Bearman": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Oliver_Bearman_2022.jpg/300px-Oliver_Bearman_2022.jpg",
    "Colapinto": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Franco_Colapinto_2022.jpg/300px-Franco_Colapinto_2022.jpg"
};
const DEFAULT_AVATAR = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/300px-Unknown_person.jpg";

const TEAM_LOGOS = {
    "Red Bull Racing": "https://upload.wikimedia.org/wikipedia/en/thumb/0/01/Red_Bull_Racing_logo_2022.svg/300px-Red_Bull_Racing_logo_2022.svg.png",
    "McLaren": "https://upload.wikimedia.org/wikipedia/en/thumb/6/66/McLaren_Racing_logo.svg/300px-McLaren_Racing_logo.svg.png",
    "Ferrari": "https://upload.wikimedia.org/wikipedia/en/thumb/c/c0/Scuderia_Ferrari_Logo.svg/300px-Scuderia_Ferrari_Logo.svg.png",
    "Mercedes": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg/300px-Mercedes_AMG_Petronas_F1_Logo.svg.png",
    "Aston Martin": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Aston_Martin_Aramco_Cognizant_F1.svg/300px-Aston_Martin_Aramco_Cognizant_F1.svg.png",
    "Alpine F1 Team": "https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Alpine_F1_Team_Logo.svg/300px-Alpine_F1_Team_Logo.svg.png",
    "Williams": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Williams_Racing_2020_logo.svg/300px-Williams_Racing_2020_logo.svg.png",
    "Visa Cash App RB": "https://upload.wikimedia.org/wikipedia/en/thumb/3/36/Visa_Cash_App_RB_F1_Team_logo.svg/300px-Visa_Cash_App_RB_F1_Team_logo.svg.png",
    "Kick Sauber": "https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Sauber_Logo_2024.svg/300px-Sauber_Logo_2024.svg.png",
    "Haas F1 Team": "https://upload.wikimedia.org/wikipedia/en/thumb/9/91/Haas_F1_Team_logo.svg/300px-Haas_F1_Team_logo.svg.png"
};
const DEFAULT_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F1_logo.svg/300px-F1_logo.svg.png";

export async function getMergedDriverData(ergastDrivers) {
    return ergastDrivers.map(driver => {
        const firstName = driver.Driver.givenName;
        const lastName = driver.Driver.familyName;
        const driverName = `${firstName} ${lastName}`;
        const teamName = driver.Constructors[0]?.name || "Unknown Team";

        // Map safe images directly to prevent 403s and ensure visibility
        let image = DEFAULT_AVATAR;
        for (let key of Object.keys(DRIVER_IMAGES)) {
            if (lastName.includes(key)) {
                image = DRIVER_IMAGES[key];
                break;
            }
        }

        const teamClass = TEAM_CLASSES[teamName] || "";

        return {
            id: driver.Driver.driverId,
            position: parseInt(driver.position),
            name: driverName,
            team: teamName,
            teamClass: teamClass,
            points: parseFloat(driver.points),
            wins: driver.wins,
            nationality: driver.Driver.nationality,
            image: image,
            logo: "" // Not strictly needed inside driver card based on screenshot
        };
    });
}

export async function getMergedConstructorData(ergastConstructors) {
    return ergastConstructors.map(constructor => {
        const teamName = constructor.Constructor.name;
        
        let logo = DEFAULT_LOGO;
        for (let key of Object.keys(TEAM_LOGOS)) {
            if (teamName.includes(key) || key.includes(teamName)) {
                logo = TEAM_LOGOS[key];
                break;
            }
        }
        
        const teamClass = TEAM_CLASSES[teamName] || "";

        return {
            id: constructor.Constructor.constructorId,
            position: parseInt(constructor.position),
            name: teamName,
            teamClass: teamClass,
            points: parseFloat(constructor.points),
            wins: constructor.wins,
            nationality: constructor.Constructor.nationality,
            logo: logo
        };
    });
}

// Local Storage for Favorites
export function getFavorites() {
    return JSON.parse(localStorage.getItem('f1_favorites') || '[]');
}

export function toggleFavoriteDriver(driverId) {
    let favorites = getFavorites();
    if (favorites.includes(driverId)) {
        favorites = favorites.filter(id => id !== driverId);
    } else {
        favorites.push(driverId);
    }
    localStorage.setItem('f1_favorites', JSON.stringify(favorites));
    return favorites;
}
