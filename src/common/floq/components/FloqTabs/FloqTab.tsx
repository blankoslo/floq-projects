import React from "react";
import tabStyles from "./styles.module.scss";

type FloqTabProps = {
  label: string;
  onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  active?: boolean;
};
const FloqTab: React.FC<FloqTabProps> = (props: FloqTabProps) => {
  const { label, onClick, active } = props;
  const classNames = [tabStyles.tab, active && tabStyles.active]
    .filter(Boolean)
    .join(" ");
  return (
    <a onClick={onClick} className={classNames}>
      {label}
    </a>
  );
};
export default FloqTab;
