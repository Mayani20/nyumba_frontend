"use client";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import Header from './(app)/Header';

export default function LandingPage() {
  const [apiStatus, setApiStatus] = useState<string>("Checking...");
  const [dbStatus, setDbStatus] = useState<string>("Checking...");
  const [weather, setWeather] = useState<any[]>([]); // Keep as array

  useEffect(() => {
    const testBackend = async () => {
      try {
        // Test health endpoint
        const health = await api.healthCheck();
        setApiStatus(`Online: ${health.data.status}`);

        // Test database connection
        const db = await api.dbTest();
        setDbStatus(db.data.connected ? "Connected" : "Disconnected");

        // Test weather endpoint - FIX: Ensure we get the array
        const weatherResponse = await api.weatherForecast();
        // Check if response.data is an array, if not, log it and set empty array
        if (Array.isArray(weatherResponse.data)) {
          setWeather(weatherResponse.data);
        } else {
          console.error("Weather data is not an array:", weatherResponse.data);
          setWeather([]);
        }

      } catch (error: any) {
        console.error("Backend connection error:", error);
        setApiStatus("Offline - Backend not reachable");
        setDbStatus("Failed to connect");
        setWeather([]); // Set empty array on error
      }
    };

    testBackend();
  }, []);

  return (
    <div>
      <Header />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Nyumba API Status</h1>

        <div className="mb-4">
          <p><strong>API Status:</strong> {apiStatus}</p>
          <p><strong>Database Status:</strong> {dbStatus}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Weather Forecast (Sample)</h2>
          <div className="grid gap-2">
            {Array.isArray(weather) && weather.length > 0 ? (
              weather.map((item, index) => (
                <div key={index} className="border p-2 rounded">
                  <p>Date: {item.date}</p>
                  <p>Temperature: {item.temperatureC}°C / {item.temperatureF}°F</p>
                  <p>Summary: {item.summary}</p>
                </div>
              ))
            ) : (
              <p>No weather data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
