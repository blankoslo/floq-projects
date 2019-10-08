/* eslint-disable react/display-name */
import inputStyles from "./styles.module.scss";
import React from "react";

type FloqInputFieldProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
const FloqInputField = React.forwardRef<HTMLInputElement, FloqInputFieldProps>(
  (props: FloqInputFieldProps, ref) => {
    return <input className={inputStyles.input} ref={ref} {...props} />;
  }
);

export default FloqInputField;
