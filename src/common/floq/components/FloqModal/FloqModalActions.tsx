import React from "react";
import modalStyles from "./styles.module.scss";

type FloqModalActionsProps = {
  children: React.ReactNode;
};
const FloqModalActions: React.FC<FloqModalActionsProps> = (
  props: FloqModalActionsProps
) => {
  return <div className={modalStyles.actions}>{props.children}</div>;
};

export default FloqModalActions;
