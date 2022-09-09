export const createElementFunction = (elementName, appentTo, hasClass) => {
  let element = document.createElement(elementName);
  hasClass && (element.className = hasClass);
  appentTo && appentTo.appendChild(element);
  return element;
};
