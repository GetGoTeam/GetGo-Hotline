class GoongPlugin {
  locateAddress = async address => {
    try {
      const url = `https://rsapi.goong.io/geocode?address=${encodeURIComponent(
        address
      )}&api_key=${process.env.REACT_APP_GOONG_APIKEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.results.length > 0) {
        const latitude = data.results[0].geometry.location.lat;
        const longitude = data.results[0].geometry.location.lng;
        // return {
        //   lat: latitude,
        //   lng: longitude,
        // };
        this.coordinate.lat = latitude;
        this.coordinate.lng = longitude;
      } else {
        console.error("No results found.");
        // return null;
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  getCoordinates = () => {
    return this.coordinate;
  };

  constructor() {
    this.coordinate = { lat: null, lng: null };
  }
}

const pluginGoong = new GoongPlugin();
export default pluginGoong;
