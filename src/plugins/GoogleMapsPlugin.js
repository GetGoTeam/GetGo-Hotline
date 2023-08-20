class GoogleMapsPlugin {
  locateAddress = async (address) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&components=country:VN&key=${process.env.REACT_APP_GOOGLE_MAPS_APIKEY}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length > 0) {
        const latitude = data.results[0].geometry.location.lat;
        const longitude = data.results[0].geometry.location.lng;
        return {
          lat: latitude,
          lng: longitude,
        };
      } else {
        console.error("No results found.");
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  name = () => {
    return "GoogleMapsPlugin";
  };
}

module.exports = GoogleMapsPlugin;
