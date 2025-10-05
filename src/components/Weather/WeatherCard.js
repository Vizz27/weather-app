import React from 'react';
import { getWeatherIcon, capitalizeFirst, formatTime } from '../../utils/helpers';
import styles from './WeatherCard.module.css';

const WeatherCard = ({ weather }) => {
  const {
    name,
    main: { temp, feels_like, humidity, pressure },
    weather: [{ main: weatherMain, description, icon }],
    wind: { speed },
    visibility,
    sys: { sunrise, sunset },
  } = weather;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.location}>
          <h2>{name}</h2>
          <p className={styles.description}>{capitalizeFirst(description)}</p>
        </div>
        <div className={styles.iconContainer}>
          <img src={getWeatherIcon(icon)} alt={description} className={styles.icon} />
        </div>
      </div>

      <div className={styles.temperature}>
        <span className={styles.temp}>{Math.round(temp)}°C</span>
        <p className={styles.feelsLike}>Feels like {Math.round(feels_like)}°C</p>
      </div>

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.label}>Humidity</span>
          <span className={styles.value}>{humidity}%</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>Wind Speed</span>
          <span className={styles.value}>{speed} m/s</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>Pressure</span>
          <span className={styles.value}>{pressure} hPa</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>Visibility</span>
          <span className={styles.value}>{(visibility / 1000).toFixed(1)} km</span>
        </div>
      </div>

      <div className={styles.sunInfo}>
        <div className={styles.sunItem}>
          <span className={styles.sunLabel}>🌅 Sunrise</span>
          <span className={styles.sunTime}>{formatTime(sunrise)}</span>
        </div>
        <div className={styles.sunItem}>
          <span className={styles.sunLabel}>🌇 Sunset</span>
          <span className={styles.sunTime}>{formatTime(sunset)}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
