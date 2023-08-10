import classes from "./Marker.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot } from "@fortawesome/free-solid-svg-icons";

export default function Marker() {
  return (
    <div className={classes["marker-container"]}>
      <FontAwesomeIcon icon={faCircleDot} className={classes["marker-head"]} />
      <div className={classes["marker-body"]} />
      <div className={classes["marker-foot"]} />
    </div>
  );
}
