/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";

import classes from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleDot,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
export default props => {
  const { handleOpen, itemMonitorSelected } = props;
  const [inforDriver, setInforDriver] = useState();
  console.log(itemMonitorSelected);

  const handleGetInforDriver = async idDriver => {
    await axios
      .get(`http://localhost:3000/api/drivers/${idDriver}`)
      .then(res => {
        console.log(res.data);
        setInforDriver(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (itemMonitorSelected.driver) {
      handleGetInforDriver(itemMonitorSelected.driver);
    }
  }, [itemMonitorSelected]);

  useEffect(() => {
    console.log(inforDriver);
  }, [inforDriver]);
  return (
    <div className={classes.container__modal}>
      <div className={classes["container__modal-title"]}>Chi Tiết Đơn Hàng</div>
      <div className={classes["container__modal-body"]}>
        <div className={classes["container__modal-body-location"]}>
          <div className={classes["container__modal-body-location-point"]}>
            <FontAwesomeIcon icon={faCircleDot} color="#009268" size="x" />
            <div
              className={classes["container__modal-body-location-point-line"]}
            />
            <FontAwesomeIcon
              icon={faMapLocationDot}
              color="#FF9494"
              size="2x"
            />
          </div>
          <div className={classes["container__modal-body-location-name"]}>
            <p>{itemMonitorSelected.address_pickup}</p>
            <p>{itemMonitorSelected.address_destination}</p>
          </div>
        </div>
        <div className={classes["container__modal-body-infor"]}>
          <div className={classes["container__modal-body-infor-driver"]}>
            <h3>Thông tin tài xế</h3>
            {itemMonitorSelected.driver && inforDriver ? (
              <>
                <p>Họ và tên: {inforDriver.driver.username}</p>
                <p>Số điện thoại: {inforDriver.driver.phone} </p>
                <p>Năm sinh: 12/01/2002 </p>
                <p>
                  Giới tính:
                  {inforDriver.driver.gender === "Male" ? " Nam" : " Nữ"}
                </p>
                <p>
                  Loại xe sử dụng:
                  {inforDriver.vehicle.capacity === 1
                    ? " Xe máy"
                    : inforDriver.vehicle.capacity === 4
                    ? " Xe hơi 4 chỗ"
                    : " Xe hơi 7 chỗ"}
                </p>
              </>
            ) : (
              <p>Chưa có tài xế</p>
            )}
            {/* <p>Mô tả phương tiện: Xe màu đen, bao ngầu </p> */}
          </div>
          <div className={classes["container__modal-body-infor-customer"]}>
            <h3>Thông tin khách hàng</h3>
            <p>Họ và tên: Trần Bảo Long</p>
            <p>Số điện thoại: {itemMonitorSelected.phone} </p>
          </div>
        </div>
        <div className={classes["container__modal-body-payment"]}>
          <p>Số tiền cần thanh toán: </p>
          <p>
            {itemMonitorSelected.price
              ? itemMonitorSelected.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })
              : 0}
          </p>
        </div>
        <div className={classes["container__modal-body-btn"]}>
          <div
            className={classes["container__modal-body-btn-accept"]}
            onClick={handleOpen}
          >
            Xác nhận
          </div>
        </div>
      </div>
    </div>
  );
};
