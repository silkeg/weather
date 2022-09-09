import { init, dataContainer } from '../main.js';
import { createHtmlElement } from './createHtmlElement.js';

const overlay = () => {
  let overlayContianer = document.getElementById('overlayContianer');
  overlayContianer && overlayContianer.remove();
  overlayContianer = createHtmlElement('dialog', null, 'overlayContianer', 'overlay__contianer');

  const ulElement = createHtmlElement('ul', overlayContianer, null, 'overlay__edit-city');

  if (dataContainer.message.length > 0) {
    const errorMessage = createHtmlElement('li', ulElement, null, 'error-message');
    for (let i in dataContainer.message) {
      const spanElement = createHtmlElement('span', errorMessage);
      spanElement.textContent = dataContainer.message[i];
      createHtmlElement('br', errorMessage);
    }
  }

  const myPosition = createHtmlElement('li', ulElement);
  const inputElement = createHtmlElement('input', myPosition, 'defaultCity');
  inputElement.name = 'inputTyp';
  inputElement.type = 'radio';
  const labelElement = createHtmlElement('label', myPosition);
  labelElement.setAttribute('for', 'defaultCity');
  labelElement.textContent = 'Mein Standort';

  const custemPosition = createHtmlElement('li', ulElement);
  const input2Element = createHtmlElement('input', custemPosition, 'custemCity');
  input2Element.name = 'inputTyp';
  input2Element.type = 'radio';
  const label2Element = createHtmlElement('label', custemPosition);
  label2Element.setAttribute('for', 'custemCity');
  label2Element.textContent = 'Ort wählen';
  const input3Element = createHtmlElement('input', label2Element, 'inputCity', 'overlay__input--city');
  input3Element.type = 'text';
  input3Element.placeholder = 'Ort eingeben';

  const buttonsRow = createHtmlElement('li', ulElement);
  const button1Element = createHtmlElement('button', buttonsRow, 'overlayCancel');
  button1Element.textContent = 'Abbrechen';
  const button2Element = createHtmlElement('button', buttonsRow, 'overlaySave');
  button2Element.textContent = 'Speichern';

  return overlayContianer;
};

// create overlay for edit cityname
export const editCityHeandler = () => {
  document.body.append(overlay());
  const overlayContianer = document.getElementById('overlayContianer');
  overlayContianer.showModal();

  const defaultCity = document.getElementById('defaultCity');
  const custemCity = document.getElementById('custemCity');
  const inputCity = document.getElementById('inputCity');

  // what is selected
  if (dataContainer.cityName || dataContainer.message) {
    custemCity.checked = true;
    inputCity.value = dataContainer.cityName;
  } else {
    defaultCity.checked = true;
  }

  const setData = () => {
    const data = custemCity.checked ? inputCity.value.trim() : '';
    // if safari => no localStorage
    try {
      localStorage.setItem('city', data); // save city data
      return '';
    } catch (error) {
      return data;
    }
  };

  const closeOverlay = () => {
    //overlayContianer.close();
    overlayContianer.remove();
    dataContainer.message = [];
    document.querySelector('.error-message') && document.querySelector('.error-message').remove();
  };

  const saveData = () => {
    init(setData()); // creat new widget => display new data
    closeOverlay();
  };

  const backdropHeandler = (event) => {
    const ul = overlayContianer.querySelector('ul');
    ul.contains(event.target) || closeOverlay();
  };

  inputCity.addEventListener('keypress', (e) => {
    var keycode = e.keyCode ? e.keyCode : e.which;
    keycode == '13' && saveData();
  });

  const buttonCancel = document.getElementById('overlayCancel');
  buttonCancel.addEventListener('click', closeOverlay);

  const buttonSave = document.getElementById('overlaySave');
  buttonSave.addEventListener('click', saveData);

  overlayContianer.addEventListener('click', backdropHeandler);
};
