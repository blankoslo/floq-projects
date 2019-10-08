import React from "react";
import tabsStyles from "./styles.module.scss";

type FloqTabsProps = React.PropsWithChildren<{}>;
const FloqTabs: React.FC<FloqTabsProps> = (props: FloqTabsProps) => {
  return <div className={tabsStyles.tabs}>{props.children}</div>;
};
export default FloqTabs;
