/**
 * Designs a card element with the specified properties.
 * @param {HTMLElement} element - The card element to be designed.
 */

const designCard = (element, data) => {
  element.className = "element";
  element.style.setProperty("--card-rgb", data.backgroundColor);
  element.style.setProperty("--card-border-rgb", data.boxShadow);

  const numberBox = document.createElement("div");
  numberBox.className = "numberBox";

  const country = document.createElement("div");
  country.textContent = data.country;
  numberBox.appendChild(country);

  const number = document.createElement("div");
  number.textContent = data.age;
  numberBox.appendChild(number);

  element.appendChild(numberBox);

  const symbol = document.createElement("img");
  symbol.className = "image";
  symbol.src = data.image;
  element.appendChild(symbol);

  const details = document.createElement("div");
  details.className = "details";
  details.innerHTML = `<b> ${data.name} </b>` + "<br>" + data.interest;
  element.appendChild(details);
};

export { designCard };
