# Darija Translator - React Client

A modern, interactive web interface for translating English text to Moroccan Arabic Dialect (Darija) using Google's Gemini AI.

## Features

- 🌐 Real-time translation to Moroccan Darija
- 💬 Chat-style interface
- ✨ Smooth animations and modern UI
- 📱 Responsive design
- 📸 Image translation

## 🌐 Deployment

This shell aggregates the following applications:

 - The application is accessible via this link : https://b-zakaria-u.github.io/Moroccan-Dialect-Translator/.
## Prerequisites

- Node.js 16+ and npm
- Backend API running (see `Translation backend` folder)

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set your backend API URL:
   ```
   VITE_API_URL=http://localhost:8080
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost/Moroccan-Dialect-Translator`

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## Deployment

### Render

1. Push your code to GitHub
2. Import the project in Render
3. Set the environment variable:
   - `VITE_API_URL`: Your deployed backend URL
4. Deploy!

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variable `VITE_API_URL` in Netlify dashboard

## Technologies

- React
- Three.js
- Vite
- CSS3 with modern animations

