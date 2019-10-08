import React from "react";
import modalStyles from "./styles.module.scss";

type FloqModalProps = {
  open?: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
};
const FloqModal: React.FC<FloqModalProps> = (props: FloqModalProps) => {
  if (!props.open) {
    return null;
  }

  return (
    <div className={modalStyles.overlay} onClick={props.onClose}>
      <div
        className={modalStyles.modal}
        onClick={(e): void => e.stopPropagation()}>
        <div className={modalStyles.header}>
          {props.title && <span>{props.title}</span>}
          <div className={modalStyles.close}>
            <i className="material-icons" onClick={props.onClose}>
              close
            </i>
          </div>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default FloqModal;
