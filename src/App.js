import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function Weather() {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    fetchWeather('Pune');
  }, []);

  const fetchWeather = async (city) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f327a81a2a120fd158a88e9528340ec5`
    );
    if (!response.ok) {
      alert('No weather found.');
      throw new Error('No weather found.');
    }
    const data = await response.json();
    setWeatherData(data);
  };

  const displayWeather = (data) => {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
  };

  const search = () => {
    fetchWeather(document.querySelector(".search-bar").value);
  };

  return (
    <div className="weather">
      <div className="search">
        <input className="search-bar" type="text" />
        <button onClick={search}>Search</button>
      </div>
      {Object.keys(weatherData).length !== 0 ? (
        <div>
          <p className="city">Weather in {weatherData.name}</p>
          <img
            className="icon"
            src={`https://openweathermap.org/img/wn/${
              weatherData.weather[0].icon
            }.png`}
            alt=""
          />
          <p className="description">{weatherData.weather[0].description}</p>
          <p className="temp">{weatherData.main.temp}°C</p>
          <p className="humidity">Humidity: {weatherData.main.humidity}%</p>
          <p className="wind">Wind speed: {weatherData.wind.speed} km/h</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Weather;
