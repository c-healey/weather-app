import { elements } from "./base";

export default "render todays weather";

export const renderToday = local => {
  const markup = `<h2 class="city-name">
    <span class="name">${local.name}</span>
  </h2>
  <div class="city-temp">
    <span class="temp">${local.temp}</span><sup>°F</sup>
  </div>
  <figure class="city-icon__figure">
    <img
      class="city-icon"
      src=${local.icon}
      alt="icon"
    />
    <figcaption class="description">${local.description}</figcaption>
  </figure>`;
  elements.todayWeather.insertAdjacentHTML("afterbegin", markup);
};
