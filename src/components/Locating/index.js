import classes from "./Locating.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faChevronLeft, faChevronRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useState } from "react";
import Marker from "~components/Marker";
import FadeInOut from "~components/FadeInOut";
import Swal from "sweetalert2";
import { IconBtn } from "~components/Layout/DefaultLayout/Button";

const originCoordDefault = {
  lat: 10.7626,
  lng: 106.6823,
};

const destinationCoordDefault = {
  lat: 10.7626,
  lng: 106.6823,
};

export default function Locating(props) {
  const { setBackdropStatus, originAddress, destinationAddress } = props;
  const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_APIKEY });
  const [originCoord, setOriginCoord] = useState(originCoordDefault);
  const [destinationCoord, setDestinationCoord] = useState(destinationCoordDefault);

  const [screen, setScreen] = useState(1);
  const [fadeInOut, setFadeInOut] = useState(true);
  const duration = 0;

  const onLoadBegin = (mapInstance) => {
    mapInstance.addListener("dragend", async () => {
      const newCenter = mapInstance.getCenter();
      const lat = newCenter.lat();
      const lng = newCenter.lng();
      setOriginCoord({ lat: lat, lng: lng });
    });
  };

  const onLoadDestination = (mapInstance) => {
    mapInstance.addListener("dragend", async () => {
      const newCenter = mapInstance.getCenter();
      const lat = newCenter.lat();
      const lng = newCenter.lng();
      setDestinationCoord({ lat: lat, lng: lng });
    });
  };

  function handleConfirm() {
    Swal.fire({
      icon: "success",
      title: "Định vị thành công!",
      width: "50rem",
      confirmButtonColor: "#FF9494",
    }).then(function () {
      setBackdropStatus(false);
    });
  }

  return (
    <div className={classes["container"]}>
      <div className={classes["header"]}>
        <div className={classes["label"]}>Locating</div>
        <FontAwesomeIcon icon={faXmark} className={classes["close-btn"]} onClick={() => setBackdropStatus(false)} />
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
                  onClick={() => {
                    setFadeInOut(false);
                    setTimeout(() => {
                      setScreen(2);
                      setFadeInOut(true);
                    }, duration + 100);
                  }}
                />
              ) : (
                <IconBtn title="Xác nhận" iconRight={faCheck} width={100} onClick={() => handleConfirm()} />
              )}
            </div>
          </div>
          {screen === 1 ? (
            <div className={classes["address"]}>Điểm đón: {originAddress}</div>
          ) : (
            <div className={classes["address"]}>Điểm đến: {destinationAddress}</div>
          )}
        </div>

        {screen === 1 ? (
          <FadeInOut show={fadeInOut} duration={duration}>
            <div className={classes["GoogleMap"]}>
              {isLoaded ? (
                <GoogleMap
                  mapContainerClassName={classes.mapContainer}
                  center={originCoordDefault}
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
                    Lat: {originCoord.lat.toFixed(6)}, Lng: {originCoord.lng.toFixed(6)}
                  </div>
                  <div className={classes["marker-container"]}>
                    <Marker />
                  </div>
                </GoogleMap>
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </FadeInOut>
        ) : (
          <FadeInOut show={fadeInOut} duration={duration}>
            <div className={classes["GoogleMap"]}>
              {isLoaded ? (
                <GoogleMap
                  mapContainerClassName={classes.mapContainer}
                  center={destinationCoordDefault}
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
                    Lat: {destinationCoord.lat.toFixed(6)}, Lng: {destinationCoord.lng.toFixed(6)}
                  </div>
                  <div className={classes["marker-container"]}>
                    <Marker />
                  </div>
                </GoogleMap>
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </FadeInOut>
        )}
      </div>
    </div>
  );
}
