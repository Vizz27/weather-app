import React, { useState } from 'react';
import styles from './SearchBox.module.css';

const SearchBox = ({ onSearch, onCurrentLocation }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  const handleCurrentLocation = () => {
    onCurrentLocation();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className={styles.input}
          />
          <button type="submit" className={styles.searchButton}>
            🔍
          </button>
        </div>
      </form>
      <button
        onClick={handleCurrentLocation}
        className={styles.locationButton}
        title="Use current location"
      >
        📍 Current Location
      </button>
    </div>
  );
};

export default SearchBox;
