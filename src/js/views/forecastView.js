import { elements } from "./base";

export default "render forecast weather";

export const renderForecast = forecast => {
  let markup = `<div class="city">
        <h2 class="city-name">
          <span class="date">${forecast.city}</span>
        </h2>
        <div class="description">Five Day Forecast</div>
        <div class="date-range">${forecast.daysForecast[0].date} - 
        ${forecast.daysForecast[forecast.daysForecast.length - 1].date}</div>
      </div>`;

  elements.forecastWeather.insertAdjacentHTML("beforeend", markup);

  forecast.daysForecast.forEach(f => {
    markup = `<div class='city'>
          <h2 class="city-name">
          <span class="date">${f.date}</span>
          </h2>
          <div class="city-temp"><span class="max-min">${f.min}</span><sup>°F</sup>
          <span class="max-min">${f.max}</span><sup>°F</sup></div>
          <figure>
          <img class="city-icon"   src='${f.icon}' alt="description">
          <figcaption class='description'>${f.description}</figcaption>
          </figure>
      </div>`;

    elements.forecastWeather.insertAdjacentHTML("beforeend", markup);
  });
};
