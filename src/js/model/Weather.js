import axios from "axios";

export default class Weather {
  constructor(lat, long) {
    this.lat = lat;
    this.long = long;
  }

  async getTodayWeather() {
    const apiKey = "9c5213ce52fe7ffa15a904fc80a5f879",
      iconPath = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/`,
      openWeatherUrl = "https://api.openweathermap.org/data/2.5/";
    let url = `${openWeatherUrl}weather?lat=${this.lat}&lon=${this.long}&appid=${apiKey}&units=imperial`;
    try {
      const res = await axios(url);

      this.name = res.data.name;
      this.description = res.data.weather[0].description;
      this.country = res.data.sys.country;
      this.temp = res.data.main.temp;
      this.icon = `${iconPath}${res.data.weather[0]["icon"]}.svg`;
    } catch (err) {
      console.log(`getWeatherAW fetch err = ${err}`);
    }
  }
}
