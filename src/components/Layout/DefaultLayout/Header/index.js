import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Header.module.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { img_hotline } from "~assets/icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { colors } from "~utils/base";

function Header() {
  const navigate = useNavigate();

  return (
    <div className={classes["header-container"]}>
      <div className={classes["logo-container"]}>
        <a className={classes["logo"]} href="/">
          Hotline
        </a>
      </div>
      <div className={classes["logo-container"]}>
        <a className={classes["logo"]} href="/locate">
          Locate
        </a>
      </div>
      <div className={classes["logo-container"]}>
        <a className={classes["logo"]} href="/monitor">
          Monitor
        </a>
      </div>
      <div className={classes["navbar-container"]}>
        <div className={classes["navbar-icon"]} onClick={() => navigate("/profile")}>
          <img src={img_hotline} alt="none" />
        </div>
        <div
          className={classes["logout"]}
          onClick={() => {
            Swal.fire({
              title: "Xác nhận đăng xuất?",
              showCancelButton: true,
              cancelButtonText: `Hủy`,
              confirmButtonText: "OK",
              confirmButtonColor: colors.primary_900,
              reverseButtons: true,
            }).then((result) => {
              if (result.isConfirmed) {
                localStorage.setItem("token", "null");
                window.location.reload(false);
              }
            });
          }}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
        </div>
      </div>
    </div>
  );
}

export default Header;
