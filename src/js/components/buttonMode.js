const htmlElement = document.getElementsByTagName('html')[0];

export const changeModeHeandler = () =>
  htmlElement.classList.toggle('color-scheme-dark');
