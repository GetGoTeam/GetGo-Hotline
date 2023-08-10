import classes from "./ChooseDestination.module.scss";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useState } from "react";
import Marker from "~components/Marker";

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const ChooseDestination = () => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_APIKEY });

  const [mapCenter, setMapCenter] = useState(center);

  const onLoad = (mapInstance) => {
    mapInstance.addListener("dragend", () => {
      const newCenter = mapInstance.getCenter();
      setMapCenter({ lat: newCenter.lat(), lng: newCenter.lng() });
    });
  };

  return (
    <>
      <h1>Chọn điểm đến</h1>
      {isLoaded ? (
        <GoogleMap
          mapContainerClassName={classes.mapContainer}
          center={center}
          zoom={10}
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
