import React from "react";

const WeatherDisplay = ({ data }) => {
  return (
    <div className="mt-4 p-4 bg-white rounded shadow-md text-center">
      <h2 className="text-xl font-semibold">{data.location}</h2>
      <p>{data.description}</p>
      <img
        src={`http://openweathermap.org/img/w/${data.icon}.png`}
        alt="weather icon"
        className="mx-auto"
      />
      <p className="text-2xl">{data.temperature}°C</p>
    </div>
  );
};

export default WeatherDisplay;
