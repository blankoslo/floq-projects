/* eslint-disable react/display-name */
import inputStyles from "./styles.module.scss";
import React from "react";

type FloqInputProps = {
  children: React.ReactNode;
  error?: string;
};
const FloqInput: React.FC<FloqInputProps> = (props: FloqInputProps) => {
  const { children, error } = props;
  return (
    <div className={inputStyles.wrapper}>
      {children}
      {error && <span className={inputStyles.errorMessage}>{error}</span>}
    </div>
  );
};

export default FloqInput;
