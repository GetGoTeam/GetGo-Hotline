import classes from "./Locating.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faChevronLeft, faChevronRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import Marker from "~components/Marker";
import FadeInOut from "~components/FadeInOut";
import Swal from "sweetalert2";
import { IconBtn } from "~components/Layout/DefaultLayout/Button";

const getCoordinatesFromAddress = async (address) => {
  try {
    const url = `https://rsapi.goong.io/geocode?address=${encodeURIComponent(address)}&api_key=${
      process.env.REACT_APP_GOONG_APIKEY
    }`;

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

export default function Locating(props) {
  const { setBackdropStatus, originAddress, destinationAddress } = props;
  const { isLoaded: isLoadedMap } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_APIKEY });
  const [originCoord, setOriginCoord] = useState();
  const [destinationCoord, setDestinationCoord] = useState();
  const [isLoadedCoord, setIsLoadedCoord] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const origin = await getCoordinatesFromAddress(originAddress);
        setOriginCoord(origin);
        const destination = await getCoordinatesFromAddress(destinationAddress);
        setDestinationCoord(destination);
        console.log("request: ", originCoord);
      } catch (error) {
        console.error("Lỗi khi lấy vị trí:", error);
      } finally {
        setIsLoadedCoord(true);
      }
    })();
  }, [destinationAddress, originAddress, originCoord]);

  const [screen, setScreen] = useState(1);
  const [fadeInOut, setFadeInOut] = useState(true);
  const duration = 200;

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
