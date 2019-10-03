import buttonGroupStyles from "./styles.module.scss";
import React from "react";

type FloqButtonGroupProps = { children: React.ReactNode };
const FloqButtonGroup: React.FC<FloqButtonGroupProps> = (
  props: FloqButtonGroupProps
) => {
  return <div className={buttonGroupStyles.buttonGroup}>{props.children}</div>;
};

export default FloqButtonGroup;
