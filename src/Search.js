import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function SearchForm() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loaded, setLoaded] = useState(false);

  function showWeather(response) {
    setLoaded(true);
    setWeather({
      setCity: response.data.name,
      temperature: response.data.main.temp,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "858d477189f385816ffe23d2ae072edf";
    let units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Search for a city..."
        onChange={updateCity}
      />
      <button type="submit">Search</button>
    </form>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <h2>🏙 City: {weather.setCity}</h2>
        <ul>
          <li>🌡 Temperature: {Math.round(weather.temperature)}°F</li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
          <li>🌤 Currently {weather.description}</li>
          <li>🔥 Humidity: {weather.humidity}%</li>
          <li>🍃 Windspeed: {weather.wind}</li>
        </ul>
      </div>
    );
  } else {
    return <div>{form}</div>;
  }
}
