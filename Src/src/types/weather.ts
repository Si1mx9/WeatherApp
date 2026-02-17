// Weather API Response Types
export interface WeatherApiResponse {
  resolvedAddress: string;
  timezone: string;
  currentConditions: CurrentConditions;
  days: DayForecast[];
}

export interface CurrentConditions {
  datetime: string;
  temp: number;
  feelslike: number;
  humidity: number;
  windspeed: number;
  pressure: number;
  visibility: number;
  conditions: string;
  icon: string;
}

export interface DayForecast {
  datetime: string;
  tempmax: number;
  tempmin: number;
  temp: number;
  conditions: string;
  icon: string;
  humidity: number;
  windspeed: number;
}

// Processed Weather Data Types
export interface WeatherData {
  location: LocationInfo;
  current: CurrentWeather;
  forecast: ForecastDay[];
}

export interface LocationInfo {
  name: string;
  timezone: string;
}

export interface CurrentWeather {
  datetime: string;
  temp: number;
  feelslike: number;
  humidity: number;
  windspeed: number;
  pressure: number;
  visibility: number;
  conditions: string;
  icon: string;
}

export interface ForecastDay {
  datetime: string;
  tempmax: number;
  tempmin: number;
  conditions: string;
  icon: string;
}

// Temperature Unit Type
export type TemperatureUnit = 'celsius' | 'fahrenheit';

// Weather Condition Categories for Background
export type WeatherCondition = 
  | 'clear-day' 
  | 'clear-night' 
  | 'rain' 
  | 'snow' 
  | 'cloudy' 
  | 'fog' 
  | 'thunderstorm' 
  | 'drizzle';
