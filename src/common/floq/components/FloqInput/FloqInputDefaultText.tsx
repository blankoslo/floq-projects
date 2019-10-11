import React from "react";
import styles from "./styles.module.scss";

type Props = React.PropsWithChildren<{}>;
const FloqInputDefaultText: React.FC<Props> = (props: Props) => {
  return <span className={styles.defaultText}>{props.children}</span>;
};

export default FloqInputDefaultText;
