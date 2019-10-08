import inputStyles from "./styles.module.scss";
import React from "react";

type FloqInputProps = {
  children: React.ReactNode;
  error?: string;
};
const FloqInput: React.FC<FloqInputProps> = (props: FloqInputProps) => {
  const { children, error } = props;
  const classNames = [inputStyles.wrapper, error && inputStyles.error]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={classNames}>
      {children}
      {error && <span className={inputStyles.errorMessage}>{error}</span>}
    </div>
  );
};

export default FloqInput;
