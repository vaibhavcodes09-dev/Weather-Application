# Weather App 🌤️

A simple and responsive Weather App built using **HTML, CSS, and JavaScript**.  
The weather data is fetched securely using a **Vercel Serverless Function**, so the API key is never exposed on the frontend.

---

## 🚀 Features
- Search weather by city  
- Real-time temperature, humidity, wind speed  
- Weather icons  
- Live digital clock  
- Error handling for invalid cities  
- **API key is safely stored on the backend**

---

## 🔐 How the API is Secured
- The frontend calls:  
  `/api/weather?city=London`
- The backend serverless function (in `/api/weather.js`) uses the API key  
- The key is stored in **Vercel → Environment Variables**
- The key is NEVER written in frontend code or GitHub

---

## 🛠️ Tech Used
- HTML  
- CSS  
- JavaScript  
- Vercel Serverless Functions  
- OpenWeatherMap API  
