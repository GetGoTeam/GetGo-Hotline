/* eslint-disable import/no-anonymous-default-export */
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useMemo, useEffect, memo } from "react";
import classes from "./index.module.scss";
import Pagination from "~components/Layout/DefaultLayout/Pagination/Pagination";
import BackDrop from "~components/BackDrop";
import Locating from "~components/Locating";
// import PluginManager from "~src/plugins2/PluginManager";
// import listPlugins from "~src/plugins2/index";
import axios from "axios";
import { colors } from "~utils/base";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Locate = memo(() => {
  const [listLocate, setListLocate] = useState([]);
  let pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    const newListLocate = Array.from(
      new Set(listLocate.map(JSON.stringify))
    ).map(JSON.parse);
    return newListLocate.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize, listLocate]);

  const [backdropStatus, setBackdropStatus] = useState(false);
  const [isFisrtTime, setIsFisrtTime] = useState(true);

  const [coordinateOrigin, setCoordinateOrigin] = useState();
  const [coordinateDestination, setCoordinateDestination] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const [itemLocated, setItemLocated] = useState({
    id: "",
    address_destination: "",
    address_pickup: "",
    lat_destination: "",
    lat_pickup: "",
    long_destination: "",
    long_pickup: "",
    phone: "",
    vehicleType: "",
  });

  const handleFormatTime = dateUpdate => {
    const date = dateUpdate ? new Date(dateUpdate) : new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours > 10 ? hours : "0" + hours}:${
      minutes > 10 ? minutes : "0" + minutes
    } ${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;
  };

  const getAll = async () => {
    setIsLoading(true);
    await axios
      .get("http://localhost:3007/hotlines/unlocated-trips")
      .then(res => {
        console.log(res.data.elements);
        setListLocate(res.data.elements.reverse());
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isFisrtTime) {
    getAll();
    setIsFisrtTime(false);
  }

  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:3015/api/tracking-trip/new-trip"
    );

    eventSource.onmessage = event => {
      const eventData = JSON.parse(event.data);

      setListLocate(listLocate => [eventData.trip, ...listLocate]);
      console.log(eventData);
    };

    eventSource.onerror = error => {
      // Xử lý lỗi kết nối SSE ở đây
      console.error("Error with SSE connection:", error);
    };

    return () => {
      eventSource.close(); // Đóng kết nối khi component bị hủy
    };
  }, []);

  const locateAddress = async (address, type) => {
    try {
      const url = `https://rsapi.goong.io/geocode?address=${encodeURIComponent(
        address
      )}&api_key=${process.env.REACT_APP_GOONG_APIKEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.results.length > 0) {
        const latitude = data.results[0].geometry.location.lat;
        const longitude = data.results[0].geometry.location.lng;
        const result = {
          lat: latitude,
          lng: longitude,
        };

        if (type === 0) {
          console.log("000", result);

          setCoordinateOrigin(result);
        } else {
          console.log("111", result);
          setCoordinateDestination(result);
        }
      } else {
        console.error("No results found.");
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (coordinateDestination && coordinateOrigin) {
      setBackdropStatus(true);
      setIsLoading(false);
      console.log(coordinateOrigin, coordinateDestination);
    }
  }, [coordinateDestination, coordinateOrigin]);

  return (
    <div className={classes.container__home}>
      <Backdrop
        sx={{
          color: colors.primary_900,
          zIndex: theme => theme.zIndex.drawer + 1,
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes["container__home-heading"]}>
        <div className={classes["container__home-heading-title"]}>
          Các cuốc xe chưa định vị
        </div>
      </div>
      <div className={classes["table-container"]}>
        <div className={classes["table-container-title"]}>
          <div
            className={`${classes["table-container-no"]} ${classes["title"]}`}
          >
            STT
          </div>
          <div
            className={`${classes["table-container-name"]} ${classes["title"]}`}
          >
            Số Điện Thoại
          </div>
          <div
            className={`${classes["table-container-dob"]} ${classes["title"]}`}
          >
            Loại xe
          </div>
          <div
            className={`${classes["table-container-phone"]} ${classes["title"]}`}
          >
            Điểm Đón
          </div>
          <div
            className={`${classes["table-container-account"]} ${classes["title"]}`}
          >
            Điểm Đến
          </div>
          <div
            className={`${classes["table-container-time"]} ${classes["title"]}`}
          >
            Thời Gian
          </div>

          <div className={`${classes["table-container-tools"]}`}></div>
        </div>
        <div className={classes["table-container-content"]}>
          {currentTableData.map((item, index) => (
            <div
              className={classes["table-container-content-item"]}
              key={(currentPage - 1) * 10 + index}
            >
              <div
                className={`${classes["table-container-no"]} ${classes["item"]}`}
              >
                {(currentPage - 1) * 10 + index + 1}
              </div>
              <div
                className={`${classes["table-container-name"]} ${classes["item"]}`}
              >
                {item.phone}
              </div>
              <div
                className={`${classes["table-container-dob"]} ${classes["item"]}`}
              >
                {item.vehicleType === 1
                  ? "Xe máy"
                  : item.vehicleType === 4
                  ? "Xe hơi 4 chỗ"
                  : "Xe hơi 7 chỗ"}
              </div>
              <div
                className={`${classes["table-container-phone"]} ${classes["item"]}`}
              >
                {item.address_pickup}
              </div>
              <div
                className={`${classes["table-container-account"]} ${classes["item"]}`}
              >
                {item.address_destination}
              </div>
              <div
                className={`${classes["table-container-time"]} ${classes["item"]}`}
              >
                {handleFormatTime(item.updatedAt)}
              </div>
              <div
                className={`${classes["table-container-tools"]} ${classes["item"]}`}
              >
                <div
                  className={classes["btn-customize"]}
                  onClick={() => {
                    setIsLoading(true);
                    locateAddress(item.address_pickup, 0);
                    locateAddress(item.address_destination, 1);
                    setItemLocated(item);
                  }}
                >
                  <FontAwesomeIcon icon={faLocationCrosshairs} color="#fff" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={classes["pagination-bar-container"]}>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={listLocate.length}
          pageSize={pageSize}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>

      <BackDrop
        status={backdropStatus}
        component={
          <Locating
            setBackdropStatus={setBackdropStatus}
            coordinateOrigin={coordinateOrigin}
            coordinateDestination={coordinateDestination}
            itemLocated={itemLocated}
          />
        }
      />
    </div>
  );
});

export default Locate;
