import { displayWidget } from './widget.js';
import { getPosition } from './getPosition.js';
import { dataContainer } from '../main.js';
import { apiKey } from '../apiKey';

// weatherApi data query
let count = 0;
export const loadJSON = async (type = 'q=Hamburg') => {
  const url = `https://api.openweathermap.org/data/2.5/weather?${type}&lang=de&units=metric&appid=${apiKey}`;
  try {
    console.log(url);
    const data = await (await fetch(url)).json();
    switch (data.cod) {
      case '429':
        // to many request
        console.log(data.message);
        setTimeout(() => {
          loadJSON();
        }, 3800000);
        break;
      case '404':
        // city not found
        console.log(data.message);
        dataContainer.message += 'Stadt konnte nicht gefunden werden <br>';
        getPosition();
        break;
      case 200:
        //successful
        displayWidget(data);
        break;
      default:
        console.log(data.message);
        count < 3 && loadJSON();
        count++;
        break;
    }
  } catch (error) {
    throw new Error('Wooops');
  }
};
