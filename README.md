# SolarFrox — Smart Cold Storage Dashboard

A hackathon-ready interactive prototype inspired by the supplied SolarFrox mobile/dashboard concept.

## Features
- Responsive dashboard
- Live-style temperature, humidity, battery and solar metrics
- Cooling system ON/OFF interaction
- History page with SVG charts
- Alerts page
- Settings page
- Dark/light mode
- Mobile bottom navigation
- CSV export demo
- No build step or dependency required

## Run locally
Open `index.html` in a browser.

## Deploy to GitHub Pages
1. Create a new GitHub repository, e.g. `solarfrox-dashboard`
2. Upload all files from this folder
3. Go to **Settings → Pages**
4. Under **Build and deployment**, choose **Deploy from a branch**
5. Select `main` and `/ (root)`
6. Save

## Suggested hackathon stack upgrade
This prototype is intentionally dependency-free. For production/demo backend integration, connect:
- ESP32 / IoT sensors → MQTT
- Node.js or Firebase backend
- Real-time database / WebSockets
- Alert notifications via Firebase Cloud Messaging

## Structure
```text
solarfrox-dashboard/
├── index.html
├── styles.css
├── app.js
└── README.md
```
