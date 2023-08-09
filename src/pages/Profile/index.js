/* eslint-disable import/no-anonymous-default-export */
import {
  faFloppyDisk,
  faPen,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import classes from "./index.module.scss";
import { img_profile } from "../../assets/icons";

export default () => {
  const [imgProfile, setImgProfile] = useState(img_profile);
  const [openEdit, setOpenEdit] = useState(false);

  //   const base64ToBlob = base64Data => {
  //     const byteString = atob(base64Data.split(",")[1]);
  //     const ab = new ArrayBuffer(byteString.length);
  //     const ia = new Uint8Array(ab);
  //     for (let i = 0; i < byteString.length; i++) {
  //       ia[i] = byteString.charCodeAt(i);
  //     }
  //     return new Blob([ab], { type: "image/png" });
  //   };

  //   const arrayBufferToString = buffer => {
  //     const uintArray = new Uint16Array(buffer);
  //     const charArray = [];
  //     for (let i = 0; i < uintArray.length; i++) {
  //       charArray.push(String.fromCharCode(uintArray[i]));
  //     }
  //     return charArray.join("");
  //   };

  const handleFileInputChange = e => {
    const target = e.target;
    if (target.files) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        const result = e.target.result;
        setImgProfile(result);
      };
      reader.readAsDataURL(file);
      target.value = "";
    }
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCancel = () => {
    setOpenEdit(false);
  };

  const handleSave = () => {
    setOpenEdit(false);
  };
  return (
    <div className={classes.container__profile}>
      <h3 className={classes["container__profile-heading"]}>Tài Khoản</h3>
      <div className={classes["container__profile-body"]}>
        <div className={classes["container__profile-body-picture"]}>
          <div className={classes.block__img}>
            <img src={imgProfile} alt="none" />
            <div
              className={`${classes["block__img-edit"]} ${classes["block__img-edit-full1"]}`}
            >
              <input type="file" onChange={e => handleFileInputChange(e)} />
              <svg
                viewBox="-368.64 -368.64 1761.28 1761.28"
                class="icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0">
                  <rect
                    x="-368.64"
                    y="-368.64"
                    width="1761.28"
                    height="1761.28"
                    rx="880.64"
                    fill="#7ed0ec"
                    strokewidth="0"
                  ></rect>
                </g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M723.2 258.133333H302.933333L375.466667 149.333333c8.533333-12.8 21.333333-19.2 36.266666-19.2h204.8c14.933333 0 27.733333 6.4 36.266667 19.2l70.4 108.8zM298.666667 234.666667H170.666667V196.266667C170.666667 181.333333 181.333333 170.666667 196.266667 170.666667h76.8c14.933333 0 25.6 10.666667 25.6 25.6V234.666667z"
                    fill="#5E35B1"
                  ></path>
                  <path
                    d="M853.333333 896H170.666667c-46.933333 0-85.333333-38.4-85.333334-85.333333V298.666667c0-46.933333 38.4-85.333333 85.333334-85.333334h682.666666c46.933333 0 85.333333 38.4 85.333334 85.333334v512c0 46.933333-38.4 85.333333-85.333334 85.333333z"
                    fill="#5E35B1"
                  ></path>
                  <path
                    d="M725.333333 533.333333c0-117.333333-96-213.333333-213.333333-213.333333-51.2 0-98.133333 17.066667-134.4 46.933333l25.6 34.133334C433.066667 377.6 469.333333 362.666667 512 362.666667c93.866667 0 170.666667 76.8 170.666667 170.666666h-74.666667l96 119.466667 96-119.466667H725.333333zM620.8 665.6C590.933333 689.066667 552.533333 704 512 704c-93.866667 0-170.666667-76.8-170.666667-170.666667h74.666667L320 413.866667 224 533.333333H298.666667c0 117.333333 96 213.333333 213.333333 213.333334 51.2 0 98.133333-17.066667 134.4-46.933334l-25.6-34.133333z"
                    fill="#E8EAF6"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div className={classes["container__profile-body-infor"]}>
          <div className={classes["container__profile-body-infor-account"]}>
            <h3>Thông tin tài khoản</h3>
            <div className={classes["container__profile-body-infor-content"]}>
              <label>Tên đăng nhập</label>
              <input type="text" />
            </div>
            <div className={classes["container__profile-body-infor-content"]}>
              <label>Ngày tạo</label>
              <input type="text" />
            </div>
          </div>
          <div className={classes["container__profile-body-infor-indivi"]}>
            <h3>Thông tin cá nhân</h3>
            <div className={classes["container__profile-body-infor-content"]}>
              <label>Họ và tên</label>
              <input type="text" />
            </div>
            <div className={classes["container__profile-body-infor-content"]}>
              <label>Giới tính</label>
              <input type="text" />
            </div>
            <div className={classes["container__profile-body-infor-content"]}>
              <label>Ngày sinh</label>
              <input type="text" />
            </div>
            <div className={classes["container__profile-body-infor-content"]}>
              <label>SĐT</label>
              <input type="text" />
            </div>
          </div>
          <div className={classes["container__profile-body-infor-btn"]}>
            {openEdit ? (
              <>
                <div
                  className={`${classes["container__profile-body-infor-btn-edit"]} ${classes["container__profile-body-infor-btn-edit-cancel"]}`}
                  onClick={handleCancel}
                >
                  <FontAwesomeIcon icon={faXmark} />
                  <p>Hủy</p>
                </div>
                <div
                  className={classes["container__profile-body-infor-btn-edit"]}
                  onClick={handleSave}
                >
                  <FontAwesomeIcon icon={faFloppyDisk} />
                  <p>Lưu</p>
                </div>
              </>
            ) : (
              <div
                className={classes["container__profile-body-infor-btn-edit"]}
                onClick={handleOpenEdit}
              >
                <FontAwesomeIcon icon={faPen} />
                <p>Chỉnh sửa</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
