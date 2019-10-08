import formControlStyles from "./styles.module.scss";
import React from "react";

type FloqFormControlProps = {
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
};
const FloqFormControl: React.FC<FloqFormControlProps> = (
  props: FloqFormControlProps
) => {
  const classNames = [
    formControlStyles.formcontrol,
    (props.size && formControlStyles[props.size]) || formControlStyles.medium,
  ].join(" ");
  return <div className={classNames}>{props.children}</div>;
};

export default FloqFormControl;
