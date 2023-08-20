/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from "react";

import classes from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleDot,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
export default props => {
  const { handleOpen, itemMonitorSelected } = props;

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
            <p>Họ và tên: Trần Bảo Long</p>
            <p>Số điện thoại: 01234567891 </p>
            <p>Năm sinh: 02/10/2002 </p>
            <p>Giới tính: Nam</p>
            <p>Loại xe sử dụng: Xe máy</p>
            <p>Mô tả phương tiện: Xe màu đen, bao ngầu </p>
          </div>
          <div className={classes["container__modal-body-infor-customer"]}>
            <h3>Thông tin khách hàng</h3>
            <p>Họ và tên: Trần Bảo Long</p>
            <p>Số điện thoại: {itemMonitorSelected.phone} </p>
            <p>Năm sinh: 02/10/2002 </p>
            <p>Giới tính: Nam</p>
          </div>
        </div>
        <div className={classes["container__modal-body-payment"]}>
          <p>Số tiền cần thanh toán: </p>
          <p>
            {itemMonitorSelected.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
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
