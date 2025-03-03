import { useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

export interface City {
  id?: number;
  name: string;
  sys: { country: string };
  coord: { lat: number; lon: number };
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
}

export const useWeather = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string, countryCode?: string) => {
    try {
      const query = countryCode ? `${city},${countryCode}` : city;

      const geoRes = await fetch(
        `${GEO_URL}?q=${encodeURIComponent(query)}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoRes.json();

      if (!geoData || geoData.length === 0) {
        setError(`No se encontró la ciudad "${city}". Intente de nuevo.`);
        return;
      }

      const { lat, lon, name, country } = geoData[0];

      const weatherRes = await fetch(
        `${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
      );
      const weatherData = await weatherRes.json();

      if (weatherRes.ok) {
        setCities((prev) => [
          ...prev,
          { ...weatherData, name, sys: { country } },
        ]);
        setError(null);
      } else {
        setError("Error al obtener datos del clima.");
      }
    } catch (error) {
      console.error(error);
      setError("Error al conectar con la API.");
    }
  };

  const removeCity = (cityName: string) => {
    setCities((prev) => prev.filter((city) => city.name !== cityName));
  };

  return { cities, fetchWeather, removeCity, error, setError };
};
