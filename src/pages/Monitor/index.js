/* eslint-disable import/no-anonymous-default-export */
import { faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useMemo, useEffect } from "react";

import classes from "./index.module.scss";
import ModalDetails from "~components/ModalDetails";
import Pagination from "~components/Layout/DefaultLayout/Pagination/Pagination";

export default () => {
  const [listMonitor, setListMonitor] = useState([]);
  let pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return listMonitor.slice(firstPageIndex, lastPageIndex);
  }, [listMonitor]);
  const [opentModal, setOpenModal] = useState(false);

  const [events, setEvents] = useState([]);

  const [itemMonitorSelected, setItemMonitorSelected] = useState();

  const options = [
    { value: 1, label: "Xe máy" },
    { value: 4, label: "Xe hơi 4 chỗ" },
    { value: 7, label: "Xe hơi 7 chỗ" },
  ];

  const handleShowTypeVerhicle = vehicleType => {
    // return vehicleType;
    return options.find(item => item.value === vehicleType).label;
  };

  const handleFormatTime = timeCreated => {
    const splitTime = timeCreated.split("T");
    const splitDate = splitTime[0].split("-");
    const splitTimeCreated = splitTime[1].split(":");

    return (
      splitTimeCreated[0] +
      ":" +
      splitTimeCreated[1] +
      " " +
      splitDate[2] +
      "/" +
      splitDate[1] +
      "/" +
      splitDate[0]
    );
  };

  const handleOpenModalDetails = item => {
    setOpenModal(true);
    setItemMonitorSelected(item);
  };

  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:3015/api/tracking-trip/update-trip"
    );

    eventSource.onmessage = event => {
      const eventData = JSON.parse(event.data);
      setEvents(eventData.trip);
      // console.log(events);
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

  useEffect(() => {
    let newListMonitor = [];

    if (listMonitor.length === 0) {
      newListMonitor = [events];
    } else {
      newListMonitor = [...listMonitor, events];
    }
    setListMonitor(newListMonitor);
  }, [events]);

  return (
    <div className={classes.container__home}>
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
          {currentTableData.map(
            (item, index) =>
              item._id && (
                <div
                  className={classes["table-container-content-item"]}
                  key={(currentPage - 1) * 10 + index}
                >
                  <div
                    className={`${classes["table-container-no"]} ${classes["item"]}`}
                  >
                    {(currentPage - 1) * 10 + index}
                  </div>
                  <div
                    className={`${classes["table-container-name"]} ${classes["item"]}`}
                  >
                    {item.phone}
                  </div>
                  <div
                    className={`${classes["table-container-dob"]} ${classes["item"]}`}
                  >
                    {handleShowTypeVerhicle(item.vehicleType)}
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
                      onClick={handleOpenModalDetails(item)}
                    >
                      <FontAwesomeIcon icon={faEye} color="#fff" />
                    </div>
                  </div>
                </div>
              )
          )}
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
};
