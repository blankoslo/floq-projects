import React from "react";
import modalStyles from "./styles.module.scss";

type FloqModalProps = {
  open?: boolean;
  title?: string;
  onBackClick?: () => void;
  onClose: () => void;
};

type Props = React.PropsWithChildren<FloqModalProps>;

const FloqModal: React.FC<Props> = (props: Props) => {
  if (!props.open) {
    return null;
  }

  return (
    <div className={modalStyles.overlay} onClick={props.onClose}>
      <div
        className={modalStyles.modal}
        onClick={(e): void => e.stopPropagation()}>
        <div className={modalStyles.header}>
          {props.onBackClick && (
            <div className={modalStyles.back}>
              <i className="material-icons" onClick={props.onBackClick}>
                chevron_left
              </i>
            </div>
          )}
          {props.title && (
            <span className={modalStyles.title}>{props.title}</span>
          )}
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
