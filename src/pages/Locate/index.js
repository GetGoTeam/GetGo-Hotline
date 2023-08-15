/* eslint-disable import/no-anonymous-default-export */
import { faEye, faLocationCrosshairs, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useMemo } from "react";
import classes from "./index.module.scss";
import Pagination from "~components/Layout/DefaultLayout/Pagination/Pagination";
import BackDrop from "~components/BackDrop";
import Locating from "~components/Locating";

export default () => {
  const database = [
    {
      name: "Tran Bao Long",
      phone: "012345678901",
      pickUp: "135b Tran Hung Dao",
      destination: "224 Nguyen Van Cu, quan 5, TP HCM",
      time: "27/06/2023 lúc 11:27",
      status: "Chưa xác nhận",
    },
    {
      name: "Tran Bao Long",
      phone: "012345678901",
      pickUp: "135b Tran Hung Dao",
      destination: "224 Nguyen Van Cu",
      time: "27/06/2023 lúc 11:27",
      status: "Chưa xác nhận",
    },
    {
      name: "Tran Bao Long",
      phone: "012345678901",
      pickUp: "135b Tran Hung Dao",
      destination: "224 Nguyen Van Cu",
      time: "27/06/2023 lúc 11:27",
      status: "Chưa xác nhận",
    },
    {
      name: "Tran Bao Long",
      phone: "012345678901",
      pickUp: "135b Tran Hung Dao",
      destination: "224 Nguyen Van Cu",
      time: "27/06/2023 lúc 11:27",
      status: "Chưa xác nhận",
    },
    {
      name: "Tran Bao Long",
      phone: "012345678901",
      pickUp: "135b Tran Hung Dao",
      destination: "224 Nguyen Van Cu",
      time: "27/06/2023 lúc 11:27",
      status: "Chưa xác nhận",
    },
    {
      name: "Tran Bao Long",
      phone: "012345678901",
      pickUp: "135b Tran Hung Dao",
      destination: "224 Nguyen Van Cu, quan 5, TP HCM",
      time: "27/06/2023 lúc 11:27",
      status: "Chưa xác nhận",
    },
    {
      name: "Tran Bao Long",
      phone: "012345678901",
      pickUp: "135b Tran Hung Dao",
      destination: "224 Nguyen Van Cu",
      time: "27/06/2023 lúc 11:27",
      status: "Chưa xác nhận",
    },
    {
      name: "Tran Bao Long",
      phone: "012345678901",
      pickUp: "135b Tran Hung Dao",
      destination: "224 Nguyen Van Cu",
      time: "27/06/2023 lúc 11:27",
      status: "Chưa xác nhận",
    },
    {
      name: "Tran Bao Long",
      phone: "012345678901",
      pickUp: "135b Tran Hung Dao",
      destination: "224 Nguyen Van Cu",
      time: "27/06/2023 lúc 11:27",
      status: "Chưa xác nhận",
    },
    {
      name: "Tran Bao Long",
      phone: "012345678901",
      pickUp: "135b Tran Hung Dao",
      destination: "224 Nguyen Van Cu",
      time: "27/06/2023 lúc 11:27",
      status: "Chưa xác nhận",
    },
    {
      name: "Tran Bao Long",
      phone: "012345678901",
      pickUp: "135b Tran Hung Dao",
      destination: "224 Nguyen Van Cu, quan 5, TP HCM",
      time: "27/06/2023 lúc 11:27",
      status: "Chưa xác nhận",
    },
    {
      name: "Tran Bao Long",
      phone: "012345678901",
      pickUp: "135b Tran Hung Dao",
      destination: "224 Nguyen Van Cu",
      time: "27/06/2023 lúc 11:27",
      status: "Chưa xác nhận",
    },
    {
      name: "Tran Bao Long",
      phone: "012345678901",
      pickUp: "135b Tran Hung Dao",
      destination: "224 Nguyen Van Cu",
      time: "27/06/2023 lúc 11:27",
      status: "Chưa xác nhận",
    },
    {
      name: "Tran Bao Long",
      phone: "012345678901",
      pickUp: "135b Tran Hung Dao",
      destination: "224 Nguyen Van Cu",
      time: "27/06/2023 lúc 11:27",
      status: "Chưa xác nhận",
    },
    {
      name: "Tran Bao Long",
      phone: "012345678901",
      pickUp: "135b Tran Hung Dao",
      destination: "224 Nguyen Van Cu",
      time: "27/06/2023 lúc 11:27",
      status: "Chưa xác nhận",
    },
  ];

  let pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return database.slice(firstPageIndex, lastPageIndex);
  }, [pageSize, currentPage]);

  const [backdropStatus, setBackdropStatus] = useState(false);
  const [orignPicked, setOrignPicked] = useState();
  const [destinationPicked, setDestinationPicked] = useState();

  return (
    <div className={classes.container__home}>
      <div className={classes["container__home-heading"]}>
        <div className={classes["container__home-heading-title"]}>Các cuốc xe chưa định vị</div>
      </div>
      <div className={classes["table-container"]}>
        <div className={classes["table-container-title"]}>
          <div className={`${classes["table-container-no"]} ${classes["title"]}`}>STT</div>
          <div className={`${classes["table-container-name"]} ${classes["title"]}`}>Tên Khách Hàng</div>
          <div className={`${classes["table-container-dob"]} ${classes["title"]}`}>Tên Tài Xế</div>
          <div className={`${classes["table-container-phone"]} ${classes["title"]}`}>Điểm Đón</div>
          <div className={`${classes["table-container-account"]} ${classes["title"]}`}>Điểm Đến</div>
          <div className={`${classes["table-container-time"]} ${classes["title"]}`}>Thời Gian</div>

          <div className={`${classes["table-container-tools"]}`}></div>
        </div>
        <div className={classes["table-container-content"]}>
          {currentTableData.map((item, index) => (
            <div className={classes["table-container-content-item"]} key={(currentPage - 1) * 10 + index}>
              <div className={`${classes["table-container-no"]} ${classes["item"]}`}>
                {(currentPage - 1) * 10 + index + 1}
              </div>
              <div className={`${classes["table-container-name"]} ${classes["item"]}`}>{item.name}</div>
              <div className={`${classes["table-container-dob"]} ${classes["item"]}`}>{item.phone}</div>
              <div className={`${classes["table-container-phone"]} ${classes["item"]}`}>{item.pickUp}</div>
              <div className={`${classes["table-container-account"]} ${classes["item"]}`}>{item.destination}</div>
              <div className={`${classes["table-container-time"]} ${classes["item"]}`}>{item.time}</div>
              <div className={`${classes["table-container-tools"]} ${classes["item"]}`}>
                <div
                  className={classes["btn-customize"]}
                  onClick={() => {
                    setOrignPicked(item.pickUp);
                    setDestinationPicked(item.destination);
                    setBackdropStatus(true);
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
          totalCount={database.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      <BackDrop
        status={backdropStatus}
        component={
          <Locating
            setBackdropStatus={setBackdropStatus}
            originAddress={orignPicked}
            destinationAddress={destinationPicked}
          />
        }
      />
    </div>
  );
};
