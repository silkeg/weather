'use strict';

import { changeModeHeandler } from './components/buttonMode.js';
import { displayWidget } from './components/widget.js';

const buttonMode = document.getElementById('buttonMode');
buttonMode.addEventListener('click', changeModeHeandler);

export let message = '';

// weatherApi data query
const loadJSON = async (type = 'q=Hamburg') => {
  const url = `https://api.openweathermap.org/data/2.5/weather?${type}&lang=de&units=metric&appid=27d587c3db122a797bcd3878986d36b8`;
  try {
    const data = await (await fetch(url)).json();
    if (data.cod == 429) {
      // too many requests => call again
      setTimeout(() => {
        loadJSON();
      }, 20000);
    } else if (data.cod == 404) {
      // city not found" => after user input
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
    // successful
    const success = (position) =>
      loadJSON(
        `lat=${position.coords.latitude}&lon=${position.coords.longitude}`
      );
    // unsuccessful
    const error = () => {
      message += 'Standort konnte nicht ermittelt werden  <br>';
      loadJSON();
    }; // weatherApi query with default values
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    // no geolocation
    loadJSON(); // weatherApi query with default values
    message = +'Standort konnte nicht ermittelt werden';
  }
};

export let cityName = '';

// initial weatherApi query
export const init = (edit = false) => {
  // weatherApi query once per hour
  edit || setTimeout(init, 3600000);

  message = '';

  // saved Data?
  cityName = localStorage.getItem('city');

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
