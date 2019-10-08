import React from "react";
import optionStyles from "./styles.module.scss";

type SelectOptionProps = { value: string; label: string; tag: string };
const SelectOption: React.FC<SelectOptionProps> = (
  props: SelectOptionProps
) => {
  return (
    <div className={optionStyles.wrapper}>
      <span className={optionStyles.value}>{props.label}</span>
      <span className={optionStyles.tag}>{props.tag}</span>
    </div>
  );
};
export default SelectOption;
