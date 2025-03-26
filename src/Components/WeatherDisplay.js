import React from "react";
import { WiDaySunny, WiCloud, WiRain, WiSnow } from "react-icons/wi";

const WeatherDisplay = ({ weather }) => {
  const { name, main, weather: weatherData } = weather;
  const temp = Math.round(main.temp);
  const description = weatherData[0].description;

  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear":
        return <WiDaySunny size={80} />;
      case "Clouds":
        return <WiCloud size={80} />;
      case "Rain":
        return <WiRain size={80} />;
      case "Snow":
        return <WiSnow size={80} />;
      default:
        return <WiCloud size={80} />;
    }
  };

  return (
    <div className="weather-display">
      <h2>{name}</h2>
      <p>{temp}°C</p>
      <p>{description}</p>
      {getWeatherIcon(weatherData[0].main)}
    </div>
  );
};

export default WeatherDisplay;
