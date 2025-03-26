import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [error, setError] = useState('');

  const API_KEY = '0c407ebfdd4cf2504394a8125a4691e6'; // 

  const isZip = /^\d+$/.test(input);

  const fetchWeather = async () => {
    if (!input) return;
  
    const url = isZip
      ? `https://api.openweathermap.org/data/2.5/weather?zip=${input},US&appid=${API_KEY}&units=${unit}&lang=en`
      : `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${API_KEY}&units=${unit}&lang=en`;
  
    try {
      const res = await fetch(url);
      const data = await res.json();
      
      console.log("Fetched raw weather data:", data); 
  
      if (!res.ok) {
        setError(data.message || 'Location not found');
        setWeatherData(null);
        return;
      }
  
  
      const formatTime = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
      };

      setWeatherData({
        city: data.name,
        country: data.sys.country,
        temp: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        sunrise: formatTime(data.sys.sunrise),
        sunset: formatTime(data.sys.sunset),
        humidity: data.main.humidity,
        wind: data.wind.speed,
        pressure: data.main.pressure,
        date: new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        }),
      });
      

      setError('');
    } catch (err) {
      setError('Failed to fetch weather data');
      setWeatherData(null);
    }
  };

  const toggleUnit = () => {
    setUnit((prev) => (prev === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <div className="app">
      <h1>Weather App</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city, zip, or landmark..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      <button onClick={toggleUnit} className="unit-toggle">
        Switch to {unit === 'metric' ? '°F' : '°C'}
      </button>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-card">
          <h2>{weatherData.city}, {weatherData.country}</h2>
          <p className="date">{weatherData.date}</p>

          <img
            src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
            alt="weather icon"
            className="weather-icon"
          />

          <p className="temp">{weatherData.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
          <p className="description">{weatherData.description}</p>

          <div className="details">
            <p>🌅 Sunrise: {weatherData.sunrise}</p>
            <p>🌇 Sunset: {weatherData.sunset}</p>
            <p>💧 Humidity: {weatherData.humidity}%</p>
            <p>🌬️ Wind: {weatherData.wind} m/s</p>
            <p>🌡️ Pressure: {weatherData.pressure} hPa</p>
          </div>
        </div>
      )}
    </div>
  );
}



export default App;
