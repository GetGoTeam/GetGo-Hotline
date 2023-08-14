import classes from "./SearchBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import TextField from "@mui/material/TextField";

const SearchBar = (props) => {
  const { label, hiddenSearchBtn } = props;

  return (
    <div className={classes["container"]}>
      <div className={classes["input-container"]}>
        <TextField
          className={classes["input"]}
          variant="outlined"
          label={label}
          size="small"
          fullWidth
          InputProps={{
            classes: {
              notchedOutline: `${classes["input-border"]} ${hiddenSearchBtn && classes["border-radius"]}`,
            },
          }}
          InputLabelProps={{
            classes: {
              focused: classes.inputLabel,
            },
          }}
        />
      </div>
      {!hiddenSearchBtn && (
        <div className={classes["searchBtn-container"]}>
          <FontAwesomeIcon icon={faMagnifyingGlass} color="white" />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
