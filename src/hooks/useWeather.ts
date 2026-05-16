import { useState, useCallback, useEffect } from 'react';
import { fetchWeatherData, WeatherApiError } from '../services/weatherApi';
import type { WeatherData } from '../types/weather';

interface UseWeatherReturn {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (location: string) => Promise<void>;
}

export function useWeather(initialLocation?: string): UseWeatherReturn {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (location: string) => {
    if (!location.trim()) {
      setError('Please enter a location');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
    } catch (err) {
      if (err instanceof WeatherApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialLocation) {
      fetchWeather(initialLocation);
    }
  }, [initialLocation, fetchWeather]);

  return {
    weatherData,
    loading,
    error,
    fetchWeather,
  };
}
