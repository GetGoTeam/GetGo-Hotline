import classes from "./GoongAutoComplete.module.scss";
import Select from "react-select";
import { useState } from "react";
import debounce from "lodash.debounce";

export default function GoongAutoComplete(props) {
  const { apiKey, onChange, borderColorFocus, borderColor, defaultInputValue } = props;
  const [options, setOptions] = useState();

  const placeSearch = async (input) => {
    try {
      const url = `https://rsapi.goong.io/Place/AutoComplete?api_key=${apiKey}&input=${encodeURIComponent(input)}
      }`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.predictions.length > 0) {
        const data2options = data.predictions.map((item) => ({ value: item.description, label: item.description }));
        setOptions(data2options);
      } else {
        console.error("No results found.");
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const handleInputChange = debounce((inputValue) => {
    if (!inputValue) return;
    placeSearch(inputValue);
  }, props.debounce | 500);

  return (
    <div className={classes["container"]}>
      <Select
        defaultInputValue={defaultInputValue}
        options={options}
        onInputChange={handleInputChange}
        onChange={onChange}
        styles={{
          control: (base, state) => ({
            ...base,
            borderColor: state.isFocused ? borderColorFocus : borderColor,
            boxShadow: state.isFocused ? `0 0 0 1px ${borderColorFocus}` : "none",
            "&:hover": {
              borderColor: borderColorFocus,
            },
          }),
        }}
      />
    </div>
  );
}
