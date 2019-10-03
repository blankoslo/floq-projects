import inputLabelStyles from "./styles.module.scss";
import React from "react";

type FloqInputLabelProps = { label: string };
const FloqInputLabel: React.FC<FloqInputLabelProps> = (
  props: FloqInputLabelProps
) => {
  return <div className={inputLabelStyles.headerText}>{props.label}</div>;
};

export default FloqInputLabel;
