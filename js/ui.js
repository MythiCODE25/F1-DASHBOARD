export function renderDrivers(drivers){
    let driverData =  
    drivers.map(driver => 
        `
        <li>
        <div class="driver-card">
            <h3>${driver.Driver.givenName} ${driver.Driver.familyName}</h3>
            <h4>Team: ${driver.Constructors[0].name}</h4>
            <h4>Nationality: ${driver.Driver.nationality}
            <p>Wins: ${driver.wins}</p>
            <p>Points: ${driver.points}</p>
        </div>
        </li>
    `).join("");
    renderStandings(driverData)
}

export function renderConstructors(constructors){
    let constructorData  =  
    constructors.map(constructor => 
        `
        <li>
        <div class="constructor-card">
            <h3>Team: ${constructor.Constructor.name}</h3>
            <h4> Nationality: ${constructor.Constructor.nationality}</h4>
            <p>Wins: ${constructor.wins}</p>
            <p>Points: ${constructor.points}</p>
        </div>
        </li>
    `).join("");
    renderStandings(constructorData)
}

export function renderStandings(data){
    const loader = document.getElementById("loader-container")
    loader.classList.remove("loader")
    content.innerHTML = 
    `<ol>
        ${data}
    </ol>
    `
}


