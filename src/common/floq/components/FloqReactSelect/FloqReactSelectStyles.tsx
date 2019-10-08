import { Styles } from "react-select/src/styles";

export const FloqReactSelectStyles: Partial<Styles> = {
  valueContainer: base => ({ ...base, width: "100%", padding: 0 }),
  singleValue: base => ({ ...base, color: "inherit" }),
  control: base => ({
    ...base,
    "border": "none",
    "borderRadius": 0,
    "borderBottom": "1px solid rgba(0, 0, 0, 0.12)",
    "boxShadow": "none",
    "&:hover": {
      border: "none",
      borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
      boxShadow: "none",
    },
  }),
  menu: base => ({
    ...base,
    borderRadius: 0,
    boxShadow: "none",
    border: "1px solid rgba(0, 0, 0, 0.12)",
  }),
};
