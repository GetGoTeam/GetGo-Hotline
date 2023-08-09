/* eslint-disable import/no-anonymous-default-export */
import { faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import classes from "./index.module.scss";
import ModalDetails from "../../components/ModalDetails";

export default () => {
  const database = [
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
          Lịch sử đơn hàng mới nhất
        </div>
        <div className={classes["container__home-heading-btn"]}>
          <FontAwesomeIcon icon={faPlus} />
          <p>Tạo đơn</p>
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
            Tên Khách Hàng
          </div>
          <div
            className={`${classes["table-container-dob"]} ${classes["title"]}`}
          >
            Số Điện Thoại
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
          {database.map((item, index) => (
            <div className={classes["table-container-content-item"]}>
              <div
                className={`${classes["table-container-no"]} ${classes["item"]}`}
              >
                {index + 1}
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
    </div>
  );
};
