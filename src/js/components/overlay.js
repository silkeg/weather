import { init, cityName, message } from '../main.js';

// create overlay for edit cityname

export const editCityHeandler = () => {
  const overlay = `
    <ul class="overlay--edit-city">
        <li id="errorMessage" class="error-message"></li>
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
                class="overlay--input__city"
                type="text"
                value=""
                placeholder="Ort eingeben"/>
            </label>
        </li>
        <li>
            <button id="overlayCancel">Abbrechen</button>
            <button id="overlaySave">Speichern</button>
        </li>
    </ul>`;

  let overlayContianer = document.querySelector('dialog');

  if (!overlayContianer) {
    overlayContianer = document.createElement('dialog');
    document.body.append(overlayContianer);
    overlayContianer.innerHTML = overlay;
  }

  document.getElementById('errorMessage').innerHTML = message;
  overlayContianer.showModal();

  const buttonCancel = document.getElementById('overlayCancel');
  const buttonSave = document.getElementById('overlaySave');
  const defaultCity = document.getElementById('defaultCity');
  const custemCity = document.getElementById('custemCity');
  const inputCity = document.getElementById('inputCity');

  // what is selected
  //if (cityName) {
  if (cityName || message) {
    custemCity.setAttribute('checked', 'checked');
    inputCity.value = cityName;
  } else {
    defaultCity.setAttribute('checked', 'checked');
  }

  const setData = () => {
    const data = custemCity.checked ? inputCity.value.trim() : '';
    // if safari => no localStorage
    try {
      localStorage.setItem('city', data); // save city data
    } catch (error) {
      return data;
    }
  };

  const closeOverlay = () => overlayContianer.close();

  const saveData = (event) => {
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
