import { editCityHeandler } from './overlay.js';
import { widgetContainer } from '../main.js';
import { createElementFunction } from './createElementFunction.js';

// create widget
// insert into page

export const displayWidget = (data) => {
  let widget = document.querySelector('.widget');
  widget && widget.remove();

  widget = createElementFunction('div');
  widget.className = 'widget';
  const imgElement = createElementFunction('img', widget);
  imgElement.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  imgElement.setAttribute('alt', data.weather[0].description);

  const divElement = createElementFunction('div', widget);
  const span1Element = createElementFunction('span', divElement);
  span1Element.textContent = data.weather[0].description;
  const brElement = createElementFunction('br', divElement);
  const span2Element = createElementFunction('span', divElement);
  span2Element.textContent = `
      ${parseInt(data.main.temp_max)} / ${parseInt(data.main.temp_min)} °C
    `;
  const buttonElement = createElementFunction('button', widget);
  buttonElement.className = 'widget__button--edit';
  buttonElement.textContent = data.name;
  buttonElement.addEventListener('click', editCityHeandler);

  widgetContainer.append(widget);
};
