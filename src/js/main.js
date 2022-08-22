'use strict';

import { changeModeHeandler } from './components/buttonMode.js';
import { displayWidget } from './components/widget.js';

const buttonMode = document.getElementById('buttonMode');
buttonMode.addEventListener('click', changeModeHeandler);

export let { message, cityName } = { message: '', cityName: '' };

// weatherApi data query
const loadJSON = async (type = 'q=Hamburg') => {
  const apiKey = '123';
  const url = `https://api.openweathermap.org/data/2.5/weather?${type}&lang=de&units=metric&appid=${apiKey}`;
  try {
    const data = await (await fetch(url)).json();
    if (data.cod == 429) {
      // too many requests => call again
      setTimeout(() => {
        loadJSON();
      }, 20000);
    } else if (data.cod == 404) {
      // city not found
      message = 'Stadt konnte nicht gefunden werden <br>';
      getCurrentPositionBrowser();
    } else if (data.cod == 200) {
      //successful
      displayWidget(data);
    }
  } catch (error) {
    throw new Error('Whoops!');
  }
};

// query geolocation
const getCurrentPositionBrowser = () => {
  if (navigator.geolocation) {
    const success = (position) => {
      loadJSON(
        `lat=${position.coords.latitude}&lon=${position.coords.longitude}`
      );
    };
    const error = () => {
      message += 'Standort konnte nicht ermittelt werden  <br>';
      loadJSON(); // weatherApi query with default values
    };
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    // no geolocation
    message += 'Standort konnte nicht ermittelt werden';
    loadJSON(); // weatherApi query with default values
  }
};

const savedCity = () => {
  // if safari => no localStorage
  try {
    return localStorage.getItem('city');
  } catch (error) {
    return false;
  }
};

// initial weatherApi query
export const init = (editCity = '') => {
  // weatherApi query once per hour
  editCity || setTimeout(init, 3600000);

  message = '';

  // saved Data?
  cityName = savedCity() || editCity;

  if (cityName) {
    // weatherApi query with saved city
    loadJSON(`q=${cityName}`);
  } else {
    // weatherApi query with geolocation
    getCurrentPositionBrowser();
  }
};

// check if there is the basic container
export const widgetContainer = document.querySelector('.wrapper');
widgetContainer && init();
