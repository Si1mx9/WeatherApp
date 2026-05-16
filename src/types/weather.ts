export interface WeatherApiResponse {
  resolvedAddress: string;
  timezone: string;
  description: string;
  currentConditions: CurrentConditions;
  days: DayForecast[];
}

export interface CurrentConditions {
  datetime: string;
  temp: number;
  feelslike: number;
  humidity: number;
  windspeed: number;
  winddir: number;
  pressure: number;
  visibility: number;
  conditions: string;
  icon: string;
  sunrise: string;
  sunset: string;
  uvindex: number;
  precipprob: number;
}

export interface DayForecast {
  datetime: string;
  tempmax: number;
  tempmin: number;
  temp: number;
  conditions: string;
  description: string;
  icon: string;
  humidity: number;
  windspeed: number;
  winddir: number;
  pressure: number;
  visibility: number;
  sunrise: string;
  sunset: string;
  uvindex: number;
  precipprob: number;
  hours: HourlyForecast[];
}

export interface HourlyForecast {
  datetime: string;
  temp: number;
  feelslike: number;
  humidity: number;
  windspeed: number;
  winddir: number;
  pressure: number;
  visibility: number;
  conditions: string;
  icon: string;
  precipprob: number;
}

export interface WeatherData {
  location: LocationInfo;
  current: CurrentWeather;
  forecast: ForecastDay[];
  hourly: HourlyForecast[];
  description: string;
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
  winddir: number;
  pressure: number;
  visibility: number;
  conditions: string;
  icon: string;
  sunrise: string;
  sunset: string;
  uvindex: number;
  precipprob: number;
}

export interface ForecastDay {
  datetime: string;
  tempmax: number;
  tempmin: number;
  conditions: string;
  icon: string;
  sunrise: string;
  sunset: string;
  uvindex: number;
  precipprob: number;
  description: string;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export type WeatherCondition =
  | 'clear-day'
  | 'clear-night'
  | 'rain'
  | 'snow'
  | 'cloudy'
  | 'fog'
  | 'thunderstorm'
  | 'drizzle';
