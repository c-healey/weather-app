// Data Controller
// Public Methods
// initLocalWeather - fetches the location, today's weather and 5 day forecast, renders all

// UIController
// Public Methods
// displayLocalWeather - render todays local weather
// displayForecastWeather - render 5 day local forecast

// controller
// Public Methods
// init invokes DataController.initLocalWeather

const DataController = (() => {
  class Weather {
    constructor(name, temp, description, country, icon) {
      this.name = name;
      this.temp = Math.round(temp);
      this.description = description;
      this.country = country;
      this.icon = icon;
    }
  }

  class WeatherForecast extends Weather {
    constructor(name, temp, description, country, icon, dayofYear, min, max) {
      super(name, temp, description, country, icon);
      this.dayofYear = formattDate(dayofYear);
      this.min = Math.round(min);
      this.max = Math.round(max);
    }
  }
  let lat = 0,
    long = 0;
  const apiKey = "9c5213ce52fe7ffa15a904fc80a5f879",
    iconPath = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/`,
    openWeatherUrl = "https://api.openweathermap.org/data/2.5/";

  let weatherdata = {
    local: {},
    forecast: []
  };

  getCurrentPosition = (options = {}) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  fetchCoordinates = async () => {
    try {
      const { coords } = await getCurrentPosition();
      const { latitude, longitude } = coords;
      lat = latitude;
      long = longitude;

      // Handle coordinates
    } catch (error) {
      console.error(`fetch coordinates error = ${error}`);
    }
  };
  getWeatherAW = async url => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw `${response.status} ${response.statusText}`;
      }
      let json = await response.json();

      return json;
    } catch (err) {
      console.log(`getWeatherAW fetch err = ${err}`);
    }
  };

  setTodayWeatherPrv = data => {
    const { main, name, sys, weather, dt } = data;
    weatherdata.local = new Weather(
      name,
      main.temp,
      weather[0].description,
      sys.country,
      `${iconPath}${weather[0]["icon"]}.svg`
    );
  };
  setForecastPrv = json => {
    console.log("json = ", json);
    let city = json.city.name;
    let country = json.city.country;
    for (item of json.list) {
      weatherdata.forecast.push(
        new WeatherForecast(
          city,
          item.temp.day,
          item.weather[0].description,
          country,
          `${iconPath}${item.weather[0].icon}.svg`,
          item.dt * 1000,
          item.temp.min,
          item.temp.max
        )
      );
    }
  };

  formattDate = date => {
    var now, year, month, months;
    months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    now = new Date(date);
    year = now.getFullYear();
    month = now.getMonth();
    day = now.getDate();
    return `${months[month]} ${day}, ${year}`;
  };

  return {
    initLocalWeather: async () => {
      try {
        fetchCoordinates().then(() => {
          let url = `${openWeatherUrl}weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;
          getWeatherAW(url).then(data => {
            if (data) {
              setTodayWeatherPrv(data);
              UIController.displayLocalWeather(weatherdata.local);
            }
            //  get forecast data

            let url = `${openWeatherUrl}forecast/daily?lat=${lat}&lon=${long}&appid=${apiKey}&cnt=5&units=imperial`;
            getWeatherAW(url).then(data => {
              if (data) {
                setForecastPrv(data);
                UIController.displayForecastWeather(weatherdata.forecast);
              }
            });
          });
        });
      } catch (err) {
        console.log(`Catch err = ${err}`);
      }
    },

    getWeatherData: () => {
      return weatherdata;
    },
    testing: () => {
      console.log(weatherdata);
    }
  };
})();

const UIController = (() => {
  return {
    displayLocalWeather: local => {
      // document.querySelector(".name").textContent = local.name;
      // document.querySelector(".description").textContent = local.description;
      // document.querySelector(".temp").textContent = local.temp;
      // document.querySelector(".city-icon").src = local.icon;
      HTMLString = `<h2 class="city-name">
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
      document
        .querySelector(".weather")
        .insertAdjacentHTML("beforeend", HTMLString);
    },

    displayForecastWeather: forecast => {
      HTMLString = `<div class="city">
        <h2 class="city-name">
          <span class="date">${forecast[0].name}</span>
        </h2>
        <div class="description">Five Day Forecast</div>
        <div class="date-range">${forecast[0].dayofYear} - ${
        forecast[forecast.length - 1].dayofYear
      }</div>
      </div>`;
      document
        .querySelector(".weather-forecast")
        .insertAdjacentHTML("beforeend", HTMLString);

      forecast.forEach((f, i) => {
        HTMLString = `<div class='city'>
          <h2 class="city-name">
          <span class="date">${f.dayofYear}</span>
          </h2>
          <div class="city-temp"><span class="max-min">${f.min}</span><sup>°F</sup>
            <span class="max-min">${f.max}</span><sup>°F</sup></div>
          <figure>
            <img class="city-icon"   src='${f.icon}' alt="description">
            <figcaption class='description'>${f.description}</figcaption>
          </figure>
        </div>`;

        document
          .querySelector(".weather-forecast")
          .insertAdjacentHTML("beforeend", HTMLString);
      });
    }
  };
})();

var controller = ((budgetCtrl, UICtrl) => {
  return {
    init: () => {
      console.log("Application has started.");
      DataController.initLocalWeather();
    }
  };
})(UIController, DataController);

controller.init();
