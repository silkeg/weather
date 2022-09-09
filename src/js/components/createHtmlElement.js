export const createHtmlElement = (elementName, appentTo, hasId, hasClass) => {
  let element = document.createElement(elementName);
  hasId && (element.id = hasId);
  hasClass && (element.className = hasClass);
  appentTo && appentTo.appendChild(element);
  return element;
};
