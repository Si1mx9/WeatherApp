import type { WeatherApiResponse, WeatherData } from '../types/weather';

const API_KEY = 'NB8HLCFCAVRMZEHBGTBJYWJMR';
const API_BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

export class WeatherApiError extends Error {
  public statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'WeatherApiError';
    this.statusCode = statusCode;
  }
}

export async function fetchWeatherData(location: string): Promise<WeatherData> {
  try {
    const url = `${API_BASE_URL}/${encodeURIComponent(location)}?unitGroup=metric&key=${API_KEY}&contentType=json`;
    
    const response = await fetch(url, { mode: 'cors' });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new WeatherApiError('Location not found. Please try another city.', 404);
      } else if (response.status === 401) {
        throw new WeatherApiError('API key invalid or expired.', 401);
      } else {
        throw new WeatherApiError(`Failed to fetch weather data (${response.status})`, response.status);
      }
    }
    
    const data: WeatherApiResponse = await response.json();
    return processWeatherData(data);
    
  } catch (error) {
    if (error instanceof WeatherApiError) {
      throw error;
    }
    
    if (error instanceof TypeError) {
      throw new WeatherApiError('Network error. Please check your connection.');
    }
    
    throw new WeatherApiError('An unexpected error occurred. Please try again.');
  }
}

function processWeatherData(data: WeatherApiResponse): WeatherData {
  return {
    location: {
      name: data.resolvedAddress,
      timezone: data.timezone,
    },
    current: {
      datetime: data.currentConditions.datetime,
      temp: data.currentConditions.temp,
      feelslike: data.currentConditions.feelslike,
      humidity: data.currentConditions.humidity,
      windspeed: data.currentConditions.windspeed,
      pressure: data.currentConditions.pressure,
      visibility: data.currentConditions.visibility,
      conditions: data.currentConditions.conditions,
      icon: data.currentConditions.icon,
    },
    forecast: data.days.slice(0, 7).map(day => ({
      datetime: day.datetime,
      tempmax: day.tempmax,
      tempmin: day.tempmin,
      conditions: day.conditions,
      icon: day.icon,
    })),
  };
}

export function getWeatherIconUrl(iconName: string): string {
  return `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/2nd%20Set%20-%20Color/${iconName}.svg`;
}
