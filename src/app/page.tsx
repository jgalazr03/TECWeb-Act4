"use client";

import { useWeather } from "../hooks/useWeather";
import SearchBar from "../components/SearchBar";
import CityCard from "../components/CityCard";
import ErrorModal from "../components/ErrorModal";

export default function Home() {
  const { cities, fetchWeather, removeCity, error, setError } = useWeather();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Buscador de Clima</h1>

      <div className="w-full max-w-md">
        <SearchBar onSearch={fetchWeather} />
      </div>

      {error && <ErrorModal message={error} onClose={() => setError(null)} />}

      {cities.length === 0 ? (
        <p className="text-center mt-6 text-gray-500">
          Busca una ciudad para ver su clima.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {cities.map((city) => (
            <CityCard
              key={`${city.name}-${city.sys.country}`}
              city={city}
              onRemove={removeCity}
            />
          ))}
        </div>
      )}
    </div>
  );
}
