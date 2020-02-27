import axios from "axios";

export default class Forecast {
  constructor(lat, long) {
    this.lat = lat;
    this.long = long;
  }
  formatDate(date) {
    let now, year, month, curDay, months;
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
    curDay = now.getDate();
    return `${months[month]} ${curDay}, ${year}`;
  }

  async getForecastWeather() {
    const apiKey = "9c5213ce52fe7ffa15a904fc80a5f879",
      iconPath = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/`,
      openWeatherUrl = "https://api.openweathermap.org/data/2.5/";
    let url = `${openWeatherUrl}forecast/daily?lat=${this.lat}&lon=${this.long}&appid=${apiKey}&cnt=5&units=imperial`;
    try {
      const json = await axios(url);

      this.city = json.data.city.name;
      this.country = json.data.city.country;
      this.daysForecast = [];
      let list = json.data.list;

      for (let i = 0; i < list.length; i++) {
        let item = list[i];

        this.daysForecast.push({
          //   day: item.temp.day,
          description: item.weather[0].description,
          icon: `${iconPath}${item.weather[0].icon}.svg`,
          date: this.formatDate(item.dt * 1000),
          min: item.temp.min,
          max: item.temp.max
        });
      }
    } catch (err) {
      console.log(`Forecast get = ${err}`);
    }
  }
}
