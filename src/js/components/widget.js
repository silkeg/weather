import { editCityHeandler } from './overlay.js';
import { widgetContainer } from '../main.js';

// create widget
// insert into page

export const displayWidget = (data) => {
  let widget = {};
  const widgetContent = `
        <img 
          src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" 
          alt="${data.weather[0].description}" />
        <span>
          ${data.weather[0].description} <br />
          ${parseInt(data.main.temp_max)} / 
          ${parseInt(data.main.temp_min)} °C 
        </span>
        <button id="buttonEdit" class="widget--button__edit">
          ${data.name} ✏️
        </button>
    `;

  if (!document.querySelector('.widget')) {
    widget = document.createElement('DIV');
    widget.classList.add('widget');
  } else {
    widget = document.querySelector('.widget');
  }

  widget.innerHTML = widgetContent;
  widgetContainer.append(widget);

  const buttonEdit = document.getElementById('buttonEdit');
  buttonEdit.addEventListener(
    'click',
    editCityHeandler.bind(null, `${data.name}`)
  );
};
