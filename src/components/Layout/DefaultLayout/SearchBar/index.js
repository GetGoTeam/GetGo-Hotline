import classes from "./SearchBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import TextField from "@mui/material/TextField";

const SearchBar = () => {
  return (
    <div className={classes["container"]}>
      <div className={classes["input-container"]}>
        <TextField
          className={classes["input"]}
          variant="outlined"
          label="Nhập số điện thoại"
          size="small"
          fullWidth
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
      <div className={classes["searchBtn-container"]}>
        <FontAwesomeIcon icon={faMagnifyingGlass} color="white" />
      </div>
    </div>
  );
};

export default SearchBar;
