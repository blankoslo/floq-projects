import inputStyles from "./styles.module.scss";
import React from "react";

type FloqInputProps = { error?: string } & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
const FloqInput: React.FC<FloqInputProps> = (props: FloqInputProps) => {
  return (
    <div className={inputStyles.wrapper}>
      <input className={inputStyles.input} {...props} />
      {props.error && (
        <span className={inputStyles.errorMessage}>{props.error}</span>
      )}
    </div>
  );
};

export default FloqInput;
