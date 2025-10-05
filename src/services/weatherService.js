import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = process.env.REACT_APP_WEATHER_API_URL;

class WeatherService {
  async getCurrentWeatherByCoords(lat, lon) {
    try {
      const response = await axios.get(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getCurrentWeatherByCity(city) {
    try {
      const response = await axios.get(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getForecastByCity(city) {
    try {
      const response = await axios.get(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getForecastByCoords(lat, lon) {
    try {
      const response = await axios.get(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          return new Error('City not found');
        case 401:
          return new Error('Invalid API key');
        case 429:
          return new Error('Rate limit exceeded');
        default:
          return new Error('Weather service unavailable');
      }
    }
    return new Error('Network error occurred');
  }
}

export default new WeatherService();
