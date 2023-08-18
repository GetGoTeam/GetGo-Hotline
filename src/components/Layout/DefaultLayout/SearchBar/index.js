import classes from "./SearchBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const SearchBar = (props) => {
  const { label, hiddenSearchBtn, onChange } = props;
  const [inputValue, setInputValue] = useState();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    onChange(inputValue);
  };

  return (
    <div className={classes["container"]}>
      <div className={classes["input-container"]}>
        <TextField
          className={classes["input"]}
          onChange={handleInputChange}
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
        <div className={classes["searchBtn-container"]} onClick={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} color="white" />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
