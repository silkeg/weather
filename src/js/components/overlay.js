import { init, cityName, message } from '../main.js';

// create overlay for edit cityname

export const editCityHeandler = (displayedName) => {
  const overlay = `
    <ul class="overlay--edit-city">
        <li class="error-message">
          ${message ? message : ''}
        </li>
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

  const backdrop = document.createElement('DIV');
  backdrop.classList.add('backdrop');
  document.body.append(backdrop);
  backdrop.insertAdjacentHTML('afterend', overlay);

  const buttonCancel = document.getElementById('overlayCancel');
  const buttonSave = document.getElementById('overlaySave');
  const defaultCity = document.getElementById('defaultCity');
  const custemCity = document.getElementById('custemCity');
  const inputCity = document.getElementById('inputCity');

  // what is selected
  if (cityName || message) {
    custemCity.setAttribute('checked', 'checked');
    inputCity.value = cityName;
  } else {
    defaultCity.setAttribute('checked', 'checked');
  }

  const removeBackdrop = () => {
    // cose overlay
    backdrop.nextElementSibling.remove();
    backdrop.remove();
  };

  const saveData = () => {
    const data = custemCity.checked ? inputCity.value.trim() : '';
    localStorage.setItem('city', data); // save city data
    removeBackdrop();
    init(true); // creat new widget => display new data
  };

  buttonSave.addEventListener('click', saveData);
  buttonCancel.addEventListener('click', removeBackdrop);
  backdrop.addEventListener('click', removeBackdrop);
};
