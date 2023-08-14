import classes from "./CreateBill.module.scss";
import { IconBtn, ToolBtn } from "~components/Layout/DefaultLayout/Button";
import {
  faXmarkCircle,
  faLocationDot,
  faLocationCrosshairs,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "~components/Layout/DefaultLayout/SearchBar";
import Pagination from "~components/Layout/DefaultLayout/Pagination/Pagination";
import React, { useState, useMemo } from "react";

const CreateBill = () => {
  let pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return database.slice(firstPageIndex, lastPageIndex);
  }, [pageSize, currentPage]);

  return (
    <div className={classes["container"]}>
      <div className={classes["title-container"]}>
        <h1>Tạo đơn</h1>
        <a href="/" style={{ textDecoration: "none" }}>
          <IconBtn iconLeft={faXmarkCircle} title="Hủy đơn" />
        </a>
      </div>
      <div className={classes["searchBar-container"]}>
        <div>
          <div className={classes["search-text"]}>Nhập số điện thoại khách hàng</div>
          <SearchBar />
        </div>
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
            <div className={classes["table-container-content-item"]}>
              <div className={`${classes["table-container-no"]} ${classes["item"]}`}>
                {pageSize * (currentPage - 1) + index + 1}
              </div>
              <div className={`${classes["table-container-origin"]} ${classes["item"]}`}>{item.origin}</div>
              <div className={`${classes["table-container-destination"]} ${classes["item"]}`}>{item.destination}</div>
              <div className={`${classes["table-container-tools"]} ${classes["item"]}`}>
                <div className={classes["ToolBtn"]}>
                  <ToolBtn icon={faLocationDot} />
                </div>
                <div className={classes["ToolBtn"]}>
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

      <div className={classes["pagination-btn-container"]}>
        <div className={classes["IconBtn"]}>
          <IconBtn title="Quay lại" iconLeft={faChevronLeft} width={100} />
        </div>
        <div className={classes["IconBtn"]}>
          <IconBtn title="Tiếp tục" iconRight={faChevronRight} width={100} />
        </div>
      </div>
    </div>
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
