import React, { useState } from "react";
import axios from "axios";
import WeatherHistory from "./components/WeatherHistory";

function App() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8010/api/weather/getweather",
        {
          location,
        }
      );
      if (response.data.success) setWeatherData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch weather data", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <h1 className="text-2xl font-bold mb-5">Weather App</h1>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border p-2 mb-4 w-64"
      />
      <button
        onClick={fetchWeather}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Get Weather
      </button>
      {/* {weatherData && <WeatherDisplay data={weatherData} />} */}
      <WeatherHistory location={location} />
    </div>
  );
}

export default App;
