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
      <span>{message}</span>
      <i className={`${styles.dismiss} material-icons`} onClick={toast.dismiss}>
        close
      </i>
    </div>
  );
};

export default Toast;
