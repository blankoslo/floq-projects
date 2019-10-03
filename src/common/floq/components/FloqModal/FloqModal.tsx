import React, { useState } from "react";
import modalStyles from "./styles.module.scss";

type FloqModalProps = {
  open?: boolean;
  title?: string;
  children: React.ReactNode;
};
const FloqModal: React.FC<FloqModalProps> = (props: FloqModalProps) => {
  const [isOpen, setOpen] = useState<boolean>(props.open || false);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={modalStyles.overlay} onClick={(): void => setOpen(false)}>
      <div
        className={modalStyles.modal}
        onClick={(e): void => e.stopPropagation()}>
        <div className={modalStyles.header}>
          {props.title && <span>{props.title}</span>}
          <div className={modalStyles.close}>
            <i className="material-icons" onClick={(): void => setOpen(false)}>
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
