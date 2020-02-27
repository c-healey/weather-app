console.log("Imported Location module");
export default class Search {
  constructor(state = 0) {
    this.state = state;
  }

  getCurrentPosition(options = {}) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }
  async getLocation() {
    try {
      const { coords } = await this.getCurrentPosition();
      const { latitude, longitude } = coords;
      this.lat = latitude;
      this.long = longitude;
      this.state = 1;
      console.log(`LON - ${this.long} LAT = ${this.lat} state = ${this.state}`);
      // Handle coordinates
    } catch (error) {
      console.error(`get Location error = ${error}`);
    }
  }
}
