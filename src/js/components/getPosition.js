import { dataContainer } from '../main';
import { loadJSON } from './getWeatherData';

const getGeoLocation = () => {
  const promis = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (success) => resolve(success),
      (error) => reject(error)
    );
  });
  return promis;
};

export const getPosition = async () => {
  try {
    const position = await getGeoLocation();
    loadJSON(
      `lat=${position.coords.latitude}&lon=${position.coords.longitude}`
    );
  } catch (error) {
    dataContainer.message += 'Standort konnte nicht ermittelt werden  <br>';
    loadJSON();
  }
};
