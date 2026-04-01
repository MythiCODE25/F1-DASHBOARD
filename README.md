# F1 Dashboard

## Project Overview
The **F1 Dashboard** is a web application built using HTML, CSS, and JavaScript that displays Formula 1 data such as Driver Standings (WDC) and Constructor Standings (WCC).

The purpose of this project is to demonstrate:
- API integration using `fetch`
- Data manipulation using JavaScript array methods
- Clean and responsive UI development
- Implementation of performance-enhancing features

This project is developed as part of an academic assignment to showcase practical frontend development skills.

---

## Objectives
- Fetch and display F1 data from a public API
- Implement search and filtering functionality
- Create a responsive and professional UI
- Apply modern JavaScript concepts and best practices

---

## API Used
This project uses the **Jolpica F1 API (Ergast-compatible API)**.

### Base Endpoint:
https://api.jolpi.ca/ergast/f1/


### Endpoints Used:
- Driver Standings: /current/driverStandings.json
- Constructor Standings: /current/constructorStandings.json


---

## Features

### Core Features
- Display **Driver Standings (WDC)**
- Display **Constructor Standings (WCC)**
- Search drivers by name
- Filter and sort data using JavaScript array methods
- Responsive and clean UI design

---

### Bonus Features Implemented
- **Loading Indicator** – Displays a loader while fetching API data
- **Debounced Search** – Optimized search to improve performance
- **Local Storage (Favorites)** – Save and persist favorite drivers

---

## Technologies Used
- **HTML5**
- **CSS3 / Tailwind CSS (optional)**
- **JavaScript (ES6+)**
- **Fetch API**
- **Local Storage API**

---

## Project Structure
f1-dashboard/
│
├── index.html
├── style.css
├── script.js
└── assets/

---

## Setup & Installation

### Clone the repository
```bash
git clone <your-repo-link>
cd f1-dashboard
```
### Open the project
Simply open the index.html file in your browser.
Use Live Server (recommended):
Right click → Open with Live Server

---

## UI & Design Approach
- Dark theme inspired by Formula 1 aesthetics
- Clean and minimal layout
- Structured tables/cards for readability
- Responsive design for different screen sizes

---

## Future Improvements
- Pagination or infinite scroll
- Race schedules and results
- Driver performance analytics
- Progressive Web App (PWA) support

--- 

## Learning Outcomes:
- Working with real-world APIs
- Using JavaScript array methods like .map(), .filter(), .sort()
- Implementing debouncing for performance optimization
- Managing browser storage using localStorage
- Building a clean and user-friendly UI

