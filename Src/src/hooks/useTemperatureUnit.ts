import { useState, useEffect } from 'react';
import type { TemperatureUnit } from '../types/weather';

const STORAGE_KEY = 'weather-app-temperature-unit';

export function useTemperatureUnit() {
  const [unit, setUnit] = useState<TemperatureUnit>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored === 'fahrenheit' ? 'fahrenheit' : 'celsius') as TemperatureUnit;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, unit);
  }, [unit]);

  const toggleUnit = () => {
    setUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  const convertTemperature = (celsius: number): number => {
    if (unit === 'fahrenheit') {
      return (celsius * 9/5) + 32;
    }
    return celsius;
  };

  const getUnitSymbol = (): string => {
    return unit === 'celsius' ? '°C' : '°F';
  };

  return {
    unit,
    setUnit,
    toggleUnit,
    convertTemperature,
    getUnitSymbol,
  };
}
