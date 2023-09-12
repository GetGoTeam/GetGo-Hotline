import classes from "./Locating.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faChevronLeft,
  faChevronRight,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import Marker from "~components/Marker";
import FadeInOut from "~components/FadeInOut";
import Swal from "sweetalert2";
import { IconBtn } from "~components/Layout/DefaultLayout/Button";
import { Bounce } from "react-activity";
import "react-activity/dist/library.css";
import { colors } from "~utils/base";
import axios from "axios";

export default function Locating(props) {
  const {
    setBackdropStatus,
    itemLocated,
    coordinateOrigin,
    coordinateDestination,
  } = props;
  const { isLoaded: isLoadedMap } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_APIKEY,
  });
  const [originCoord, setOriginCoord] = useState({
    lat: coordinateOrigin.lat,
    lng: coordinateOrigin.lng,
  });
  const [destinationCoord, setDestinationCoord] = useState({
    lat: coordinateDestination.lat,
    lng: coordinateDestination.lng,
  });
  const [isLoadedCoord, setIsLoadedCoord] = useState(true);

  const [screen, setScreen] = useState(1);
  const [fadeInOut, setFadeInOut] = useState(true);
  const duration = 200;

  const onLoadBegin = mapInstance => {
    mapInstance.addListener("dragend", async () => {
      const newCenter = mapInstance.getCenter();
      const lat = newCenter.lat();
      const lng = newCenter.lng();
      setOriginCoord({ lat: lat, lng: lng });
    });
  };

  const onLoadDestination = mapInstance => {
    mapInstance.addListener("dragend", async () => {
      const newCenter = mapInstance.getCenter();
      const lat = newCenter.lat();
      const lng = newCenter.lng();
      setDestinationCoord({ lat: lat, lng: lng });
    });
  };

  function handleConfirm() {
    const dataPatch = {
      _id: itemLocated._id,
      address_destination: itemLocated.address_destination,
      address_pickup: itemLocated.address_pickup,
      lat_destination: destinationCoord.lat,
      lat_pickup: originCoord.lat,
      long_destination: destinationCoord.lng,
      long_pickup: originCoord.lng,
      phone: itemLocated.phone,
      vehicleType: itemLocated.vehicleType,
    };

    console.log(dataPatch);
    axios
      .patch(`http://localhost:3007/hotlines/update-trip-location`, dataPatch)
      .then(response => {
        console.log(response);
        Swal.fire({
          icon: "success",
          title: "Định vị thành công!",
          width: "50rem",
          confirmButtonColor: colors.primary_900,
        }).then(() => {
          window.location.reload(false);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    setOriginCoord({
      lat: coordinateOrigin.lat,
      lng: coordinateOrigin.lng,
    });
    setDestinationCoord({
      lat: coordinateDestination.lat,
      lng: coordinateDestination.lng,
    });

    console.log(coordinateOrigin, coordinateDestination);
  }, [coordinateOrigin, coordinateDestination]);

  return (
    <div className={classes["container"]}>
      <div className={classes["header"]}>
        <div className={classes["label"]}>Locating</div>
        <FontAwesomeIcon
          icon={faXmark}
          className={classes["close-btn"]}
          onClick={() => setBackdropStatus(false)}
        />
      </div>

      <div className={classes["body"]}>
        <div className={classes["address-container"]}>
          <div className={classes["pagination-btn-container"]}>
            <div className={classes["IconBtn"]}>
              <IconBtn
                title="Quay lại"
                iconLeft={faChevronLeft}
                width={100}
                disable={screen === 1 ? true : false}
                onClick={() => {
                  setFadeInOut(false);
                  setTimeout(() => {
                    setScreen(1);
                    setFadeInOut(true);
                  }, duration + 100);
                }}
              />
            </div>
            <div className={classes["IconBtn"]}>
              {screen === 1 ? (
                <IconBtn
                  title="Tiếp tục"
                  iconRight={faChevronRight}
                  width={100}
                  // disable={isLoadedCoord && isLoadedMap ? false : true}
                  onClick={() => {
                    setFadeInOut(false);
                    setTimeout(() => {
                      setScreen(2);
                      setFadeInOut(true);
                    }, duration + 100);
                  }}
                />
              ) : (
                <IconBtn
                  title="Xác nhận"
                  iconRight={faCheck}
                  width={100}
                  onClick={() => handleConfirm()}
                />
              )}
            </div>
          </div>
          {screen === 1 ? (
            <div className={classes["address"]}>
              Điểm đón: {itemLocated.address_pickup}
            </div>
          ) : (
            <div className={classes["address"]}>
              Điểm đến: {itemLocated.address_destination}
            </div>
          )}
        </div>

        {screen === 1 ? (
          <FadeInOut show={fadeInOut} duration={duration}>
            <div className={classes["GoogleMap"]}>
              {isLoadedMap && isLoadedCoord ? (
                <GoogleMap
                  mapContainerClassName={classes.mapContainer}
                  center={originCoord}
                  zoom={15}
                  onLoad={onLoadBegin}
                  onCenterChanged={() => {}}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "70px",
                      userSelect: "none",
                      WebkitUserSelect: "none",
                    }}
                  >
                    Lat: {originCoord.lat.toFixed(6)}, Lng:
                    {originCoord.lng.toFixed(6)}
                  </div>
                  <div className={classes["marker-container"]}>
                    <Marker />
                  </div>
                </GoogleMap>
              ) : (
                <Bounce className={classes["loading"]} />
              )}
            </div>
          </FadeInOut>
        ) : (
          <FadeInOut show={fadeInOut} duration={duration}>
            <div className={classes["GoogleMap"]}>
              {isLoadedMap && isLoadedCoord ? (
                <GoogleMap
                  mapContainerClassName={classes.mapContainer}
                  center={destinationCoord}
                  zoom={15}
                  onLoad={onLoadDestination}
                  onCenterChanged={() => {}}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "70px",
                      userSelect: "none",
                      WebkitUserSelect: "none",
                    }}
                  >
                    Lat: {destinationCoord.lat.toFixed(6)}, Lng:
                    {destinationCoord.lng.toFixed(6)}
                  </div>
                  <div className={classes["marker-container"]}>
                    <Marker />
                  </div>
                </GoogleMap>
              ) : (
                <Bounce className={classes["loading"]} />
              )}
            </div>
          </FadeInOut>
        )}
      </div>
    </div>
  );
}
