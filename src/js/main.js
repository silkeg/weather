import { changeModeHeandler } from './components/buttonMode.js';
import { getPosition } from './components/getPosition.js';
import { loadJSON } from './components/getWeatherData.js';

const buttonMode = document.getElementById('buttonMode');
buttonMode.addEventListener('click', changeModeHeandler);

export const dataContainer = { message: '', cityName: '' };

// initial weatherApi query
export const init = (editCity = '') => {
  editCity || setTimeout(init, 3600000); // weatherApi query once per hour

  const getCityName = () => {
    // if safari => no localStorage
    try {
      return localStorage.getItem('city');
    } catch (error) {
      return;
    }
  };

  dataContainer.cityName = getCityName() || editCity;
  dataContainer.cityName
    ? loadJSON(`q=${dataContainer.cityName}`)
    : getPosition();
};

export const widgetContainer = document.querySelector('.wrapper');
widgetContainer && init();
