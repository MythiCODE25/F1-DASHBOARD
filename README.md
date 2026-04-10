# F1 Dashboard

## Project Overview
The **F1 Dashboard** is a high-performance web application built using HTML, CSS, and JavaScript that displays real-time Formula 1 data such as Driver Standings (WDC) and Constructor Standings (WCC).

The purpose of this project is to demonstrate:
- Orchestrating complex data flows from multiple external APIs
- Implementing efficient state management and data mapping
- Building a modular and scalable frontend architecture
- Creating a premium, responsive UI with modern CSS techniques

This project is developed as part of an academic assignment to showcase professional frontend development skills.

---

## Objectives
- Fetch and display real-time F1 data from professional-grade APIs
- Implement advanced search, filtering, and sorting functionality
- Create a responsive and premium UI inspired by motorsport aesthetics
- Apply modern JavaScript (ES6+) and best practices for performance

---

## API Used
This project integrates data from several sources to provide a rich experience:
1. **Jolpica F1 API (Ergast-compatible)** – Core championship data.
2. **Wikipedia REST API** – Dynamic imagery and biographical summaries.
3. **TheSportsDB API** – Fallback for team and driver metadata.

### Base Endpoint:
- Ergast: `https://api.jolpi.ca/ergast/f1/`
- Wikipedia: `https://en.wikipedia.org/api/rest_v1/page/summary/`
- SportsDB: `https://www.thesportsdb.com/api/v1/json/1/`

### Endpoints Used:
- Driver Standings: `/current/driverStandings.json`
- Constructor Standings: `/current/constructorStandings.json`
- Race Calendar: `/current.json`
- Wiki Summary: `/page/summary/{title}`
- SportsDB Teams: `lookup_all_teams.php?id=4370`
- SportsDB Players: `lookup_all_players.php?id={teamId}`

---

## Features
- **Real-time Standings:** Live tracking of WDC and WCC rankings.
- **Race Calendar:** Dynamic schedule for the current Formula 1 season.
- **Advanced Controls:** Search by name, filter by team, and sort by points or position.
- **Persistent Favorites:** Save favorite drivers with persistence across browser sessions.
- **Performance Optimized:** Optimized with debounced search and modular logic.

---

## Technologies Used
- **HTML5** – Semantic structure for accessibility.
- **CSS3** – Custom design system with glassmorphism and CSS variables.
- **JavaScript (ES6+)** – Modular logic with ES Modules.
- **Fetch API** – Asynchronous data retrieval.
- **Local Storage API** – Persistent state management for user favorites.

---

## Project Structure
```bash
f1-dashboard/
├── index.html          # Main entry and UI structure
├── style.css           # Global styles and design system
├── main.js             # Application bootstrapper
├── js/
│   ├── api/            # API service layers (Ergast, SportsDB)
│   ├── pages/          # Feature-specific logic (Drivers, Constructors, Calendar)
│   └── utils/          # Data mappers and helper utilities
└── assets/             # Logos and static assets
```

---

## Setup & Installation

### Clone the repository
```bash
git clone https://github.com/MythiCODE25/F1-DASHBOARD.git
cd F1-DASHBOARD
```
### Open the project
Simply open the `index.html` file in your browser.
Use **Live Server** (recommended):
Right click `index.html` → **Open with Live Server**

---

## UI & Design Approach
- **Modern Dark Theme:** Premium aesthetic inspired by official telemetry displays.
- **Modular Component Design:** Reusable card layouts and consistent spacing.
- **Glassmorphism:** Elegant use of transparency and blurs for a high-end feel.
- **Responsive Layout:** Grid and Flexbox-based system for seamless mobile-to-desktop transitions.

---

## Future Improvements
- **Detailed Statistics:** Interactive charts for driver performance history.
- **Race Results:** Comprehensive breakdown of individual Grand Prix outcomes.
- **PWA Support:** Offline access and installation capability.
- **Dark/Light Mode Toggle:** User-selectable theme preferences.

--- 

## Learning Outcomes:
- **Modular JavaScript Architecture:** Mastering code organization into logical layers.
- **Asynchronous API Composition:** Learning to merge data from multiple sources (Ergast + Wiki).
- **Advanced State Management:** Implementing filters and persistence without external libraries.
- **Modern CSS Engineering:** Building a professional design system using vanilla CSS.
