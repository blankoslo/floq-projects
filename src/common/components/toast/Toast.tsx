import React from "react";
import styles from "./styles.module.scss";
import { useToast } from "./ToastContext";

export type ToastType = "success" | "error";
export type ToastProps = {
  type: ToastType;
  message: string;
};

const Toast: React.FC<{}> = () => {
  const toast = useToast();
  if (!toast.current) {
    return null;
  }

  const { type, message } = toast.current;
  const classNames = [styles.toast, styles[(type as unknown) as string]].join(
    " "
  );
  return (
    <div className={classNames}>
      {type === "success" && (
        <i className={`${styles.icon} material-icons`}>done</i>
      )}
      {type === "error" && (
        <i className={`${styles.icon} material-icons`}>
          sentiment_very_dissatisfied
        </i>
      )}
      <span className={styles.message}>{message}</span>
    </div>
  );
};

export default Toast;
