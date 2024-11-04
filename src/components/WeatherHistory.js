import React, { useEffect, useState } from "react";
import axios from "axios";

/* {
  coord: { lon: 72.8777, lat: 19.076 },
  weather: [ { id: 711, main: 'Smoke', description: 'smoke', icon: '50d' } ],
  base: 'stations',
  main: {
    temp: 307.15,
    feels_like: 306.61,
    temp_min: 307.15,
    temp_max: 308.1,
    pressure: 1010,
    humidity: 31,
    sea_level: 1010,
    grnd_level: 1009
  },
  visibility: 3500,
  wind: { speed: 3.6, deg: 50 },
  clouds: { all: 6 },
  dt: 1730707645,
  sys: {
    type: 1,
    id: 9052,
    country: 'IN',
    sunrise: 1730682618,
    sunset: 1730723626
  },
  timezone: 19800,
  id: 8131499,
  name: 'Konkan Division',
  cod: 200
} */

const WeatherHistory = ({ location }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (location) {
      fetchHistory();
    }
  }, [location]);

  const fetchHistory = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8010/api/weather/GETWEATHERHISTORY?location=${location}`
      );

      if (response.data.success) {
        setHistory(response?.data?.data);
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error("Failed to fetch history", error);
    }
  };

  return (
    <div className="mt-5">
      <h3 className="text-lg font-semibold">Weather History</h3>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 border">Date</th>
            <th className="py-2 border">Temperature</th>
            <th className="py-2 border">Description</th>
          </tr>
        </thead>

        <tbody>
          {history?.map((record, index) => (
            <tr key={index} className="text-center">
              <td className="py-2 border">
                {new Date(record?.createdAt).toLocaleDateString()}
              </td>
              <td className="py-2 border">{record?.main?.temp}°F</td>
              <td className="py-2 border">
                {record?.weather?.[0]?.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherHistory;
