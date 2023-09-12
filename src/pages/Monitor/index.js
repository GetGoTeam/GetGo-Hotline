import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useMemo, useEffect, memo } from "react";

import classes from "./index.module.scss";
import ModalDetails from "~components/ModalDetails";
import Pagination from "~components/Layout/DefaultLayout/Pagination/Pagination";
import request from "~/src/utils/request";
import { colors } from "~utils/base";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Monitor = memo(() => {
  const [listMonitor, setListMonitor] = useState([]);
  let pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return listMonitor.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize, listMonitor]);

  const [opentModal, setOpenModal] = useState(false);
  const [isFisrtTime, setIsFisrtTime] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [itemMonitorSelected, setItemMonitorSelected] = useState({
    address_pickup: "",
    price: 500,
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

  const handleOpenModalDetails = item => {
    setOpenModal(true);
    setItemMonitorSelected(item);
  };

  const getAll = async () => {
    setIsLoading(true);
    await request
      .get("trips")
      .then(res => {
        console.log(res.data);
        setListMonitor(res.data.reverse());
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
      "http://localhost:3015/api/tracking-trip/update-trip"
    );

    eventSource.onmessage = event => {
      const eventData = JSON.parse(event.data);
      if (eventData.savedTrip)
        setListMonitor(listMonitor => [eventData.savedTrip, ...listMonitor]);
      else setListMonitor(listMonitor => [eventData.trip, ...listMonitor]);
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

      {opentModal ? (
        <div className={classes["container__home-modal"]}>
          <ModalDetails
            handleOpen={() => {
              setOpenModal(false);
            }}
            itemMonitorSelected={itemMonitorSelected}
          />
        </div>
      ) : (
        ""
      )}

      <div className={classes["container__home-heading"]}>
        <div className={classes["container__home-heading-title"]}>
          Tình trạng cuốc xe
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
          <div
            className={`${classes["table-container-status"]} ${classes["title"]}`}
          >
            Trạng Thái
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
                className={`${classes["table-container-status"]} ${classes["item"]}`}
              >
                {item.status}
              </div>
              <div
                className={`${classes["table-container-tools"]} ${classes["item"]}`}
              >
                <div
                  className={classes["btn-customize"]}
                  onClick={() => handleOpenModalDetails(item)}
                >
                  <FontAwesomeIcon icon={faEye} color="#fff" />
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
          totalCount={listMonitor.length}
          pageSize={pageSize}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>
    </div>
  );
});

export default Monitor;
