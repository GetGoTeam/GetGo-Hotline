import classes from "./SearchBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const SearchBar = props => {
  const { label, hiddenSearchBtn, handleSearchPhone } = props;
  const [inputValue, setInputValue] = useState();

  const handleInputChange = event => {
    setInputValue(event.target.value);
    // console.log(event);
  };

  const handleSubmitPhone = event => {
    if (event.keyCode === 13) {
      handleSearchPhone(inputValue);
    }
  };

  return (
    <div className={classes["container"]}>
      <div className={classes["input-container"]}>
        <TextField
          className={classes["input"]}
          onChange={handleInputChange}
          onKeyDown={handleSubmitPhone}
          variant="outlined"
          label={label}
          size="small"
          fullWidth
          InputProps={{
            classes: {
              notchedOutline: `${classes["input-border"]} ${
                hiddenSearchBtn && classes["border-radius"]
              }`,
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
        <div
          className={classes["searchBtn-container"]}
          // onClick={handleSearchPhone(inputValue)}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} color="white" />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
