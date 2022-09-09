import { editCityHeandler } from './overlay.js';
import { widgetContainer } from '../main.js';
import { createHtmlElement } from './createHtmlElement.js';

// create widget
export const displayWidget = (data) => {
  let widget = document.getElementById('widget');
  widget && widget.remove();
  widget = createHtmlElement('div', null, 'widget', 'widget');

  const imgElement = createHtmlElement('img', widget);
  imgElement.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  imgElement.setAttribute('alt', data.weather[0].description);

  const divElement = createHtmlElement('div', widget);

  const span1Element = createHtmlElement('span', divElement);
  span1Element.textContent = data.weather[0].description;

  const brElement = createHtmlElement('br', divElement);

  const span2Element = createHtmlElement('span', divElement);
  span2Element.textContent = `${parseInt(data.main.temp_max)} / ${parseInt(data.main.temp_min)} °C`;

  const buttonElement = createHtmlElement('button', widget, 'widget__button--edit');
  buttonElement.textContent = data.name;
  buttonElement.addEventListener('click', editCityHeandler);

  widgetContainer.append(widget);
};
