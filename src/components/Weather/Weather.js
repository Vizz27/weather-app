import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import Forecast from '../Forecast/Forecast';
import SearchBox from '../Search/SearchBox';
import Loading from '../Loading/Loading';
import weatherService from '../../services/weatherService';
import { getCurrentLocation } from '../../utils/helpers';
import styles from './Weather.module.css';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    handleCurrentLocation();
  }, []);

  const handleCurrentLocation = async () => {
    setLoading(true);
    setError('');

    try {
      const { lat, lon } = await getCurrentLocation();
      await fetchWeatherByCoords(lat, lon);
    } catch (error) {
      console.error('Location error:', error);
      // Fallback to a default city
      await fetchWeatherByCity('London');
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherService.getCurrentWeatherByCoords(lat, lon),
        weatherService.getForecastByCoords(lat, lon)
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (city) => {
    setLoading(true);
    setError('');

    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherService.getCurrentWeatherByCity(city),
        weatherService.getForecastByCity(city)
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (city) => {
    fetchWeatherByCity(city);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>🌤️ Weather App</h1>
        <p className={styles.subtitle}>Get current weather and forecast for any city</p>
      </header>

      <SearchBox onSearch={handleSearch} onCurrentLocation={handleCurrentLocation} />

      <main className={styles.main}>
        {loading && <Loading />}
        
        {error && (
          <div className={styles.error}>
            <p>❌ {error}</p>
            <button onClick={handleCurrentLocation} className={styles.retryButton}>
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && weather && (
          <>
            <WeatherCard weather={weather} />
            {forecast && <Forecast forecast={forecast} />}
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <p>Weather data provided by OpenWeatherMap</p>
      </footer>
    </div>
  );
};

export default Weather;
