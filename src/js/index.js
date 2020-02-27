import Location from "./model/Location";
import Weather from "./model/Weather";
import Forecast from "./model/Forecast";
import * as weatherView from "./views/weatherView";
import * as forecastView from "./views/forecastView";
import { elements, renderLoader, clearLoader } from "./views/base";

const state = {};

const controlToday = async () => {
  //    get location
  state.location = new Location();
  await state.location.getLocation();
  if (state.location.state) {
    // get local today weather
    state.today = new Weather(state.location.lat, state.location.long);
    await state.today.getTodayWeather();
    weatherView.renderToday(state.today);

    state.forecast = new Forecast(state.location.lat, state.location.long);
    await state.forecast.getForecastWeather();
    forecastView.renderForecast(state.forecast);
  }
};

window.addEventListener("load", e => {
  e.preventDefault();
  controlToday();
});
