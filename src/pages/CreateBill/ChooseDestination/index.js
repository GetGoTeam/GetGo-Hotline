import classes from "./ChooseDestination.module.scss";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import Marker from "~components/Marker";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import axios from "axios";

const center = {
  lat: 10.7626,
  lng: 106.6823,
};

const ChooseDestination = () => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_APIKEY });

  const [mapCenter, setMapCenter] = useState(center);

  const [address, setAddress] = useState(null);

  const onLoad = (mapInstance) => {
    mapInstance.addListener("dragend", async () => {
      const newCenter = mapInstance.getCenter();
      const lat = newCenter.lat();
      const lng = newCenter.lng();
      setMapCenter({ lat: lat, lng: lng });

      const tmp = await getPlaceFromCoordinates(lat, lng);
      setAddress(tmp);
    });
  };

  useEffect(() => {
    if (address) alert(address.label);
  }, [address]);

  const getPlaceFromCoordinates = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_APIKEY}`;

    try {
      const response = await axios.get(url);
      if (response.data.results.length > 0) {
        return response.data.results[0].formatted_address;
      } else {
        console.log(response.data.error_message);
        return null;
      }
    } catch (error) {
      console.error("Error getting place from coordinates:", error);
      return "Error";
    }
  };

  return (
    <>
      <GooglePlacesAutocomplete
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_APIKEY}
        apiOptions={{ language: "vi", region: "VN" }}
        autocompletionRequest={{
          componentRestrictions: {
            country: ["vn"],
          },
        }}
        selectProps={{
          value: address,
          onChange: setAddress,
        }}
      />

      {isLoaded ? (
        <GoogleMap
          mapContainerClassName={classes.mapContainer}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onCenterChanged={() => {}}
        >
          <div style={{ position: "absolute", top: "10px", left: "10px" }}>
            Center: {mapCenter.lat.toFixed(6)}, {mapCenter.lng.toFixed(6)}
          </div>
          <div className={classes["marker-container"]}>
            <Marker />
          </div>
        </GoogleMap>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default ChooseDestination;
