import ReactSelect from "react-select";
import Icon from "../Icon/Icon";

const customStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: "white",
    borderRadius: "14px",
    border: state.isFocused ? "1px solid var(--brand-color)" : "none",
    boxShadow: "none",
    minHeight: "48px",
    height: "48px",
    cursor: "pointer",
    transition: "border-color 0.2s ease",
    "&:hover": {
      border: state.isFocused ? "1px solid var(--brand-color)" : "none",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "14px 0 14px 18px",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    maxWidth: "calc(100% - 20px)",
  }),
  input: (base) => ({
    ...base,
    margin: "0",
    padding: "0",
  }),
  singleValue: (base) => ({
    ...base,
    margin: "0",
    color: "#121417",
    fontSize: "18px",
    fontWeight: "500",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
  indicatorsContainer: (base) => ({
    ...base,
    height: "48px",
    padding: 0,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    display: "none",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "12px",
    padding: "14px 18px",
    border: "none",
    boxShadow: "0px 20px 69px 0px rgba(0, 0, 0, 0.05)",
    marginTop: "4px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    color: state.isFocused || state.isSelected ? "var(--brand-color)" : "rgba(18, 20, 23, 0.2)",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "500",
    padding: "4px 0",
    transition: "color 0.2s ease",
    whiteSpace: "nowrap", 
    overflow: "hidden",  
    textOverflow: "ellipsis"
  }),
};

const DropdownIndicator = (props) => {
  return (
    <div
    {...props.innerProps}
      className="flex items-center justify-center pr-4.5"
      style={{
        transform: props.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.2s ease-in-out",
      }}
    >
      <Icon id="icon-chevron-down" width="20" height="20" className="text-[#121417]" />
    </div>
  );
};

const SingleValue = ({ children, selectProps, data, ...props }) => {
  const isPrice = selectProps.label === "Price";
  const value = data.value;

  return (
    <div
      {...props.innerProps} 
      className="text-[18px] font-medium text-[#121417] truncate max-w-[calc(100%-20px)]"
    >
      {children}
      {isPrice && value !== null ? " $" : ""}
    </div>
  );
};

export default function FilterSelect({
  options,
  label,
  width,
  onChange,
  value,
}) {
  return (
    <div style={{ width: width }} className="flex flex-col gap-2">
      <label className="text-[#8A8A89] text-[14px] font-medium leading-[1.3] ml-1">
        {label}
      </label>

      <ReactSelect
        value={options.find((opt) => opt.value === value) || options[0]}
        options={options}
        styles={customStyles}
        onChange={onChange}
        isSearchable={false}
        isClearable={false}
        label={label}
        components={{
          DropdownIndicator,
          SingleValue,
          IndicatorSeparator: null,
        }}
      />
    </div>
  );
}