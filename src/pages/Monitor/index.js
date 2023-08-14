/* eslint-disable import/no-anonymous-default-export */
import { faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useMemo } from "react";

import classes from "./index.module.scss";
import ModalDetails from "~components/ModalDetails";
import Pagination from "~components/Layout/DefaultLayout/Pagination/Pagination";

export default () => {
  const database = [
    {
      name: "Tran Bao Longaa",
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
  const [opentModal, setOpenModal] = useState(false);

  const handleOpenModalDetails = () => {
    setOpenModal(true);
  };
  return (
    <div className={classes.container__home}>
      {opentModal ? (
        <div className={classes["container__home-modal"]}>
          <ModalDetails
            handleOpen={() => {
              setOpenModal(false);
            }}
          />
        </div>
      ) : (
        ""
      )}

      <div className={classes["container__home-heading"]}>
        <div className={classes["container__home-heading-title"]}>
          Tình trạng cuốc xe
        </div>
        {/* <a href="/create-bill" className={classes["container__home-heading-btn"]} style={{ textDecoration: "none" }}>
          <FontAwesomeIcon icon={faPlus} />
          <p>Tạo đơn</p>
        </a> */}
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
            Tên Khách Hàng
          </div>
          <div
            className={`${classes["table-container-dob"]} ${classes["title"]}`}
          >
            Tên Tài Xế
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
            <div className={classes["table-container-content-item"]}>
              <div
                className={`${classes["table-container-no"]} ${classes["item"]}`}
              >
                {(currentPage - 1) * 10 + index + 1}
              </div>
              <div
                className={`${classes["table-container-name"]} ${classes["item"]}`}
              >
                {item.name}
              </div>
              <div
                className={`${classes["table-container-dob"]} ${classes["item"]}`}
              >
                {item.phone}
              </div>
              <div
                className={`${classes["table-container-phone"]} ${classes["item"]}`}
              >
                {item.pickUp}
              </div>
              <div
                className={`${classes["table-container-account"]} ${classes["item"]}`}
              >
                {item.destination}
              </div>
              <div
                className={`${classes["table-container-time"]} ${classes["item"]}`}
              >
                {item.time}
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
                  onClick={handleOpenModalDetails}
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
          totalCount={database.length}
          pageSize={pageSize}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};
