"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { City } from "../hooks/useWeather";

interface CityCardProps {
  city: City;
  onRemove: (name: string) => void;
}

const CityCard: React.FC<CityCardProps> = ({ city, onRemove }) => {
  return (
    <Card className="relative w-full shadow-md border border-gray-200">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 text-red-500 hover:bg-red-100"
        onClick={() => onRemove(city.name)}
      >
        <X size={20} />
      </Button>
      <CardHeader>
        <CardTitle>
          {city.name}, {city.sys.country}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <p>
          <strong>Temperatura:</strong> {city.main.temp}°C
        </p>
        <p>
          <strong>Clima:</strong> {city.weather[0].description}
        </p>
        <p>
          <strong>Viento:</strong> {city.wind.speed} m/s
        </p>
      </CardContent>
    </Card>
  );
};

export default CityCard;
