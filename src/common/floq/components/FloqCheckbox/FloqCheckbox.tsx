/* eslint-disable react/display-name */
import checkboxStyles from "./styles.module.scss";
import React from "react";

type FloqCheckboxProps = { label: string } & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const FloqCheckbox = React.forwardRef<HTMLInputElement, FloqCheckboxProps>(
  (props: FloqCheckboxProps, ref) => {
    const { label, ...forward } = props;
    return (
      <label className={checkboxStyles.wrapper}>
        <input type="checkbox" ref={ref} {...forward} />
        <span className={checkboxStyles.label}>{label}</span>
      </label>
    );
  }
);

export default FloqCheckbox;
