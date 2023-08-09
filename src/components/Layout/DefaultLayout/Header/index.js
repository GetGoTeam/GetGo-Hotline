import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Header.module.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { img_hotline } from "../../../../assets/icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Router } from "react-router-dom";

function Header() {
  return (
    <div className={classes["header-container"]}>
      <div className={classes["logo-container"]}>
        <a className={classes["logo"]} href="/">
          Hotline
        </a>
      </div>
      <div className={classes["navbar-container"]}>
        <div className={classes["navbar-icon"]}>
          <img src={img_hotline} alt="none" />
        </div>
        <div className={classes["logout"]}>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </div>
      </div>
    </div>
  );
}

export default Header;
