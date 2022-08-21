import { init, cityName, message } from '../main.js';

// create overlay for edit cityname
export const editCityHeandler = () => {
  const overlay = `
    <ul class="overlay__edit-city">
        <li id="errorMessage" class="error-message">${message}</li>
        <li>
            <input type="radio" name="inputTyp" id="defaultCity" />
            <label for="defaultCity"> Mein Standort</label><br>
        </li>
        <li>
            <input type="radio" name="inputTyp" id="custemCity" />
            <label for="custemCity">
                Ort wählen
                <input
                id = "inputCity"
                class="overlay__input--city"
                type="text"
                placeholder="Ort eingeben"/>
            </label>
        </li>
        <li>
            <button id="overlayCancel">Abbrechen</button>
            <button id="overlaySave">Speichern</button>
        </li>
    </ul>`;

  let overlayContianer = document.querySelector('.overlay__contianer');

  if (!overlayContianer) {
    overlayContianer = document.createElement('dialog');
    overlayContianer.classList.add('overlay__contianer');
    document.body.append(overlayContianer);
  }

  overlayContianer.innerHTML = overlay;
  overlayContianer.showModal();

  const buttonCancel = document.getElementById('overlayCancel');
  const buttonSave = document.getElementById('overlaySave');
  const defaultCity = document.getElementById('defaultCity');
  const custemCity = document.getElementById('custemCity');
  const inputCity = document.getElementById('inputCity');

  // what is selected
  //if (cityName) {
  if (cityName || message) {
    custemCity.checked = true;
    inputCity.value = cityName;
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

  const closeOverlay = () => overlayContianer.close();

  const saveData = () => {
    init(setData()); // creat new widget => display new data
    closeOverlay();
  };

  const backdropHeandler = (event) => {
    const ul = overlayContianer.querySelector('ul');
    ul.contains(event.target) || closeOverlay();
  };

  buttonSave.addEventListener('click', saveData);
  buttonCancel.addEventListener('click', closeOverlay);
  overlayContianer.addEventListener('click', backdropHeandler);
};
