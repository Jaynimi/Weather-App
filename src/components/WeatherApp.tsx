'use client'
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { WeatherData } from '../types/weather';

const WeatherApp = () => {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_KEY = '6b26cc7cacbb79c24cfab3bd97557e08';

  const fetchWeather = async (): Promise<void> => {
    if (!city.trim()) {
      toast.error('Please enter a city name');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&units=metric&appid=${API_KEY}`
      );
      
      setWeatherData(response.data);
      checkTemperature(response.data.main.temp);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        toast.error('City not found. Please try again.');
      } else {
        toast.error('Failed to fetch weather data');
      }
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const checkTemperature = (temp: number): void => {
    if (temp < 0) {
      toast.success("It is freezing!", {
        icon: '❄️',
      });
    } else if (temp > 20) {
      toast.success("It's boiling!", {
        icon: '🔥',
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  return (
    <div className="max-w-md mx-auto  p-6 bg-white rounded-lg shadow-md text-gray-500 ">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-4">Weather App</h1>
      
      <div className="flex mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter city name"
          className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          onClick={fetchWeather}
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
        >
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </div>

      {weatherData && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md ">
          <h2 className="text-xl font-semibold">
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <div className="flex items-center mt-2">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              className="w-16 h-16"
            />
            <span className="text-3xl font-bold ml-2">
              {Math.round(weatherData.main.temp)}°C
            </span>
          </div>
          <p className="capitalize">{weatherData.weather[0].description}</p>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div>
              <p>Feels like: {Math.round(weatherData.main.feels_like)}°C</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
            </div>
            <div>
              <p>Wind: {weatherData.wind.speed} m/s</p>
              <p>Pressure: {weatherData.main.pressure} hPa</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;