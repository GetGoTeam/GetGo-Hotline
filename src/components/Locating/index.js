import classes from "./Locating.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faChevronLeft, faChevronRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import Marker from "~components/Marker";
import FadeInOut from "~components/FadeInOut";
import Swal from "sweetalert2";
import { IconBtn } from "~components/Layout/DefaultLayout/Button";
import { Bounce } from "react-activity";
import "react-activity/dist/library.css";
import { colors } from "~utils/base";

// Microkernel: Quản lý việc tải, gỡ bỏ và giao tiếp giữa các plugin
class Microkernel {
  constructor() {
    this.plugins = {};
  }

  registerPlugin(name, plugin) {
    this.plugins[name] = plugin;
  }

  locateAddress = async (address, plugin) => {
    const selectedPlugin = this.plugins[plugin];
    if (selectedPlugin) {
      return selectedPlugin.locateAddress(address);
    }
    return "Plugin không khả dụng";
  };
}

const defaultCoord = {
  lat: 10.762619,
  lng: 106.682598,
};

// Plugin Google Maps
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
}

// Plugin Goong
class GoongPlugin {
  locateAddress = async (address) => {
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
}

export default function Locating(props) {
  const { setBackdropStatus, originAddress, destinationAddress } = props;
  const { isLoaded: isLoadedMap } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_APIKEY });
  const [originCoord, setOriginCoord] = useState(defaultCoord);
  const [destinationCoord, setDestinationCoord] = useState(defaultCoord);
  const [isLoadedCoord, setIsLoadedCoord] = useState(false);

  // Tạo và cấu hình microkernel
  const microkernel = new Microkernel();
  microkernel.registerPlugin("googleMaps", new GoogleMapsPlugin());
  microkernel.registerPlugin("Goong", new GoongPlugin());

  useEffect(() => {
    (async () => {
      try {
        const origin = await microkernel.locateAddress(originAddress, "Goong");
        if (origin) setOriginCoord(origin);
        const destination = await microkernel.locateAddress(destinationAddress, "Goong");
        if (destination) setDestinationCoord(destination);
      } catch (error) {
        console.error("Lỗi khi lấy vị trí:", error);
      } finally {
        setIsLoadedCoord(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      confirmButtonColor: colors.primary_900,
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
                    Lat: {destinationCoord.lat.toFixed(6)}, Lng: {destinationCoord.lng.toFixed(6)}
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
