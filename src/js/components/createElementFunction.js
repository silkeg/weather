export const createElementFunction = (elementName, appentTo) => {
  let element = document.createElement(elementName);
  if (appentTo) {
    appentTo.appendChild(element);
  }
  return element;
};
