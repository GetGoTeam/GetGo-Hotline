import classes from "./CreateBill.module.scss";
import { IconBtn, ToolBtn } from "~components/Layout/DefaultLayout/Button";
import {
  faLocationDot,
  faLocationCrosshairs,
  faChevronRight,
  faChevronLeft,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "~components/Layout/DefaultLayout/SearchBar";
import Pagination from "~components/Layout/DefaultLayout/Pagination/Pagination";
import React, { useState, useMemo } from "react";
import TextField from "@mui/material/TextField";
import Select from "react-select";
import FadeInOut from "~components/FadeInOut";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoongAutoComplete from "~components/GoongAutoComplete";
import { colors } from "~utils/base";

const CreateBill = () => {
  let pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return database.slice(firstPageIndex, lastPageIndex);
  }, [pageSize, currentPage]);

  const [screen, setScreen] = useState(1);
  const [fadeInOut, setFadeInOut] = useState(true);

  const [phone, setPhone] = useState();
  const [vehicleType, setVehicleType] = useState();
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();

  const options = [
    { value: "motorcycle", label: "Xe máy" },
    { value: "car4", label: "Xe hơi 4 chỗ" },
    { value: "car7", label: "Xe hơi 7 chỗ" },
  ];

  const duration = 200;

  const handleCreateBill = () => {
    console.log(phone);
    if (!phone || !vehicleType || !origin || !destination)
      Swal.fire({
        icon: "error",
        title: "Tạo đơn thất bại",
        text: "Vui lòng điền đầy đủ thông tin",
        width: "50rem",
        confirmButtonColor: colors.primary_900,
      });
    else
      Swal.fire({
        icon: "success",
        title: "Tạo đơn thành công!",
        width: "50rem",
        confirmButtonColor: colors.primary_900,
      }).then(function () {
        window.location.reload(false);
      });
  };

  const notify = (content) => toast.success(content);

  return (
    <>
      <div className={classes["title-container"]}>
        <h1>Tạo đơn</h1>
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
                onClick={() => {
                  setFadeInOut(false);
                  setTimeout(() => {
                    setScreen(2);
                    setFadeInOut(true);
                  }, duration + 100);
                }}
              />
            ) : (
              <IconBtn title="Tạo đơn" iconRight={faPlus} width={100} onClick={() => handleCreateBill()} />
            )}
          </div>
        </div>
      </div>
      {screen === 1 ? (
        <FadeInOut show={fadeInOut} duration={duration}>
          <div className={classes["screen1-container"]}>
            <div className={classes["searchBar-container"]}>
              <div className={classes["search-text"]}>Nhập số điện thoại khách hàng</div>
              <SearchBar label="Nhập số điện thoại" onChange={setPhone} />
            </div>
            <div className={classes["divLine"]} />
            <div className={classes["table-title"]}>Các địa điểm đi nhiều nhất</div>

            <div className={classes["table-container"]}>
              <div className={classes["table-container-title"]}>
                <div className={`${classes["table-container-no"]} ${classes["title"]}`}>STT</div>
                <div className={`${classes["table-container-origin"]} ${classes["title"]}`}>Điểm đón</div>
                <div className={`${classes["table-container-destination"]} ${classes["title"]}`}>Điểm đến</div>
                <div className={`${classes["table-container-tools"]}`} />
              </div>
              <div className={classes["table-container-content"]}>
                {currentTableData.map((item, index) => (
                  <div className={classes["table-container-content-item"]} key={index}>
                    <div className={`${classes["table-container-no"]} ${classes["item"]}`}>
                      {pageSize * (currentPage - 1) + index + 1}
                    </div>
                    <div className={`${classes["table-container-origin"]} ${classes["item"]}`}>{item.origin}</div>
                    <div className={`${classes["table-container-destination"]} ${classes["item"]}`}>
                      {item.destination}
                    </div>
                    <div className={`${classes["table-container-tools"]} ${classes["item"]}`}>
                      <div
                        className={classes["ToolBtn"]}
                        onClick={() => {
                          setOrigin(item.origin);
                          notify("Đã copy điểm đón " + item.origin);
                        }}
                      >
                        <ToolBtn icon={faLocationDot} />
                      </div>
                      <div
                        className={classes["ToolBtn"]}
                        onClick={() => {
                          setDestination(item.destination);
                          notify("Đã copy điểm đến " + item.destination);
                        }}
                      >
                        <ToolBtn icon={faLocationCrosshairs} />
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
          </div>
        </FadeInOut>
      ) : (
        <FadeInOut show={fadeInOut} duration={duration}>
          <div className={classes["screen2-container"]}>
            <div className={classes["input-container"]}>
              <div className={classes["input-label"]}>Số điện thoại</div>
              <TextField
                defaultValue={phone}
                variant="outlined"
                label={"Số điện thoại"}
                size="small"
                fullWidth
                style={{ backgroundColor: "white" }}
                onChange={(event) => setPhone(event.target.value)}
                InputProps={{
                  classes: {
                    notchedOutline: classes["input-border"],
                  },
                }}
                InputLabelProps={{
                  classes: {
                    focused: classes.inputLabel,
                  },
                }}
              />
            </div>
            <div className={classes["input-container"]}>
              <div className={classes["input-label"]}>Loại xe</div>
              <Select
                options={options}
                onChange={setVehicleType}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderColor: colors.primary_900,
                    boxShadow: state.isFocused ? `0 0 0 1px ${colors.primary_900}` : "none",
                    "&:hover": {
                      borderColor: colors.primary_900,
                    },
                  }),
                }}
              />
            </div>
            <div className={classes["input-container"]}>
              <div className={classes["input-label"]}>Điểm đón</div>
              <GoongAutoComplete
                apiKey={process.env.REACT_APP_GOONG_APIKEY}
                onChange={setOrigin}
                borderColorFocus={colors.primary_900}
                borderColor={colors.primary_900}
                defaultInputValue={origin}
              />
            </div>
            <div className={classes["input-container"]}>
              <div className={classes["input-label"]}>Điểm đến</div>
              <GoongAutoComplete
                apiKey={process.env.REACT_APP_GOONG_APIKEY}
                onChange={setDestination}
                borderColorFocus={colors.primary_900}
                borderColor={colors.primary_900}
                defaultInputValue={destination}
              />
            </div>
          </div>
        </FadeInOut>
      )}
      <ToastContainer position="top-left" autoClose={3000} theme="light" />
    </>
  );
};

const database = [
  {
    origin: "135b Trần Hưng Đạo, P.Cầu Ông Lãnh, Q.1, TP HCM ",
    destination: "135b Trần Hưng Đạo, P.Cầu Ông Lãnh, Q.1, TP HCM ",
  },
  {
    origin: "135b Trần Hưng Đạo, P.Cầu Ông Lãnh, Q.1, TP HCM ",
    destination: "135b Trần Hưng Đạo, P.Cầu Ông Lãnh, Q.1, TP HCM ",
  },
  {
    origin: "135b Trần Hưng Đạo, P.Cầu Ông Lãnh, Q.1, TP HCM ",
    destination: "135b Trần Hưng Đạo, P.Cầu Ông Lãnh, Q.1, TP HCM ",
  },
  {
    origin: "135b Trần Hưng Đạo, P.Cầu Ông Lãnh, Q.1, TP HCM ",
    destination: "135b Trần Hưng Đạo, P.Cầu Ông Lãnh, Q.1, TP HCM ",
  },
  {
    origin: "135b Trần Hưng Đạo, P.Cầu Ông Lãnh, Q.1, TP HCM ",
    destination: "135b Trần Hưng Đạo, P.Cầu Ông Lãnh, Q.1, TP HCM ",
  },
  {
    origin: "135b Trần Hưng Đạo, P.Cầu Ông Lãnh, Q.1, TP HCM ",
    destination: "135b Trần Hưng Đạo, P.Cầu Ông Lãnh, Q.1, TP HCM ",
  },
  {
    origin: "135b Trần Hưng Đạo, P.Cầu Ông Lãnh, Q.1, TP HCM ",
    destination: "135b Trần Hưng Đạo, P.Cầu Ông Lãnh, Q.1, TP HCM ",
  },
  {
    origin: "135b Trần Hưng Đạo, P.Cầu Ông Lãnh, Q.1, TP HCM ",
    destination: "135b Trần Hưng Đạo, P.Cầu Ông Lãnh, Q.1, TP HCM ",
  },
  {
    origin: "135b Trần Hưng Đạo, P.Cầu Ông Lãnh, Q.1, TP HCM ",
    destination: "135b Trần Hưng Đạo, P.Cầu Ông Lãnh, Q.1, TP HCM ",
  },
  {
    origin: "135b Trần Hưng Đạo, P.Cầu Ông Lãnh, Q.1, TP HCM ",
    destination: "135b Trần Hưng Đạo, P.Cầu Ông Lãnh, Q.1, TP HCM ",
  },
  {
    origin: "135b Trần Hưng Đạo, P.Cầu Ông Lãnh, Q.1, TP HCM ",
    destination: "135b Trần Hưng Đạo, P.Cầu Ông Lãnh, Q.1, TP HCM ",
  },
];

export default CreateBill;
