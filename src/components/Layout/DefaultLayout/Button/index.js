import classes from "./Button.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CustomizeBtn(props) {
  const { iconBtn, titleBtn } = props;
  return (
    <div className={classes["customize-btn"]}>
      <div className={classes["customize-btn-icon"]}>
        <img src={iconBtn} alt="none" />
      </div>
      <div className={classes["customize-btn-title"]}>{titleBtn}</div>
    </div>
  );
}

function IconBtn(props) {
  const { iconLeft, iconRight, title, disable, width, height, onClick } = props;
  return (
    <div
      className={`${classes["icon-btn"]} ${disable && classes["btn--disable"]}`}
      style={{ width: width, height: height }}
      onClick={onClick}
    >
      {iconLeft && <FontAwesomeIcon icon={iconLeft} color="white" />}
      <div className={classes["icon-btn-title"]}>{title}</div>
      {iconRight && <FontAwesomeIcon icon={iconRight} color="white" />}
    </div>
  );
}

function ToolBtn(props) {
  const { icon, disable, onClick } = props;
  return (
    <div className={`${classes["tool-btn"]} ${disable && classes["btn--disable"]}`} onClick={onClick}>
      <FontAwesomeIcon icon={icon} color="white" />
    </div>
  );
}

export { CustomizeBtn, IconBtn, ToolBtn };
