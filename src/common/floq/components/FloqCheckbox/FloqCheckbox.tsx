import checkboxStyles from "./styles.module.scss";
import React from "react";

type FloqCheckboxProps = { label: string } & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
const FloqCheckbox: React.FC<FloqCheckboxProps> = (
  props: FloqCheckboxProps
) => {
  return (
    <label className={checkboxStyles.wrapper}>
      <input type="checkbox" {...props} />
      <span className={checkboxStyles.label}>{props.label}</span>
    </label>
  );
};

export default FloqCheckbox;
