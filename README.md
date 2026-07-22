# 🌍 Travel Planner

Travel Planner is a web application that helps users organize and manage their trips in one place. Users can create an account, plan upcoming trips, add notes, and keep track of their travel plans.

### Travel Planner
(/public/images/travelPlanner.png)

----
## Live Demo
https://travelplanner-lz55.onrender.com
---

## Run Locally

### Clone the repository

```bash
git clone https://github.com/IHXI/travelPlanner.git
```

### Install dependencies

```bash
npm install
```

### Create a `.env` file
```env
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
WEATHER_API_KEY=your_weather_api_key
CURRENCY_EXCHANGE_API_KEY=your_currency_Exchange_api_key
```

### Start the server
```bash
nodemon
```
### Open your browser and visit:
```
http://localhost:3000
```
---
## 🚀 Features

- User authentication (Sign Up, Sign In, Sign Out)
- Choose a profile avatar during registration
- Create, edit, and delete trips
- Public trip page displaying trips from all users
- Add and delete notes for each trip

---
## Future Improvements

- Upload trip photos
- Save favourite attractions
- Flight search integration
- Currency converter
- Dark mode
- Search and filter trips

## Resources Used

- OpenWeather API – Current weather information.
- GeeksforGeeks JavaScript Currency Converter tutorial – Used as the basis for implementing the currency converter feature and adapted to fit this application's workflow. :contentReference[oaicite:0]{index=0}
