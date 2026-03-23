# 🏎️ F1 Dashboard

## 📌 Project Overview
The **F1 Dashboard** is a web application built using React that displays Formula 1 data such as Driver Standings (WDC) and Constructor Standings (WCC).

The purpose of this project is to demonstrate:
- API integration using `fetch`
- Data manipulation using JavaScript array methods
- Clean and responsive UI development
- Implementation of performance-enhancing features

This project is developed as part of an academic assignment to showcase practical frontend development skills.

---

## 🎯 Objectives
- Fetch and display F1 data from a public API
- Implement search and filtering functionality
- Create a responsive and professional UI
- Apply modern JavaScript concepts and best practices

---

## 🌐 API Used
This project uses the **Jolpica F1 API (Ergast-compatible API)**.

### 🔗 Base Endpoint:
https://api.jolpi.ca/ergast/f1/

### 📊 Endpoints Used:
- Driver Standings: /current/driverStandings.json
- Constructor Standings: /current/constructorStandings.json


---

## ✨ Features

### ✅ Core Features
- Display **Driver Standings (WDC)**
- Display **Constructor Standings (WCC)**
- Search drivers by name
- Filter and sort data using JavaScript array methods
- Responsive and clean UI design

---

### ⭐ Bonus Features Implemented
- **Loading Indicator** – Displays a loader while fetching API data
- **Debounced Search** – Optimized search to improve performance
- **Local Storage (Favorites ⭐)** – Save and persist favorite drivers

---

## 🛠️ Technologies Used
- **React (Vite)**
- **Tailwind CSS**
- **JavaScript (ES6+)**
- **Fetch API**
- **Local Storage API**

---

## 🧱 Project Structure
f1-dashboard/
│
├── src/
│ ├── components/
│ │ ├── Navbar.jsx
│ │ ├── DriverStandings.jsx
│ │ ├── ConstructorStandings.jsx
│ │ ├── SearchBar.jsx
│ │ └── DriverCard.jsx
│ │
│ ├── App.jsx
│ └── main.jsx
│
├── public/
├── index.html
└── package.json


---


## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```bash
    git clone <repo-link>
    cd f1-dashboard
- Install dependencies
    npm install
- Run the development server
    npm run dev
- Open in browser
    http://localhost:5173
```


---


Live App: ```<Demo Link here>```


---

Deployed using:
- **Vercel** 

---

🎨 UI & Design Approach
- Dark theme inspired by Formula 1 aesthetics
- Minimal and clean layout
- Card-based and structured UI for better readability
- Fully responsive design

🚀 Future Improvements
- Pagination or infinite scroll
- Race schedules and results
- Driver performance analytics
- Progressive Web App (PWA) support

📚 Learning Outcomes
- Working with real-world APIs
- Managing state in React
- Implementing debouncing for performance optimization
- Building a professional UI using Tailwind CSS
