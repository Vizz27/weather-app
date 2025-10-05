import React from 'react';
import { getWeatherIcon, formatDate, capitalizeFirst } from '../../utils/helpers';
import styles from './Forecast.module.css';

const Forecast = ({ forecast }) => {
  // Group forecast by date (taking one forecast per day at 12:00 PM)
  const dailyForecasts = forecast.list.filter((item, index) => {
    const date = new Date(item.dt * 1000);
    return date.getHours() === 12 || index === 0;
  }).slice(0, 5);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>5-Day Forecast</h3>
      <div className={styles.forecastList}>
        {dailyForecasts.map((day, index) => (
          <div key={day.dt} className={styles.forecastItem}>
            <div className={styles.date}>
              {index === 0 ? 'Today' : formatDate(day.dt).split(',')}
            </div>
            <div className={styles.iconContainer}>
              <img 
                src={getWeatherIcon(day.weather.icon)} 
                alt={day.weather.description}
                className={styles.icon}
              />
            </div>
            <div className={styles.description}>
              {capitalizeFirst(day.weather.description)}
            </div>
            <div className={styles.temperature}>
              <span className={styles.maxTemp}>{Math.round(day.main.temp_max)}°</span>
              <span className={styles.minTemp}>{Math.round(day.main.temp_min)}°</span>
            </div>
            <div className={styles.details}>
              <div className={styles.humidity}>💧 {day.main.humidity}%</div>
              <div className={styles.wind}>💨 {day.wind.speed} m/s</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
