import React, { useContext, useState } from "react";
import { ToastProps, ToastType } from "./Toast";

type ToastContextValues = {
  current?: ToastProps;
  show: (type: ToastType, message: string) => void;
  dismiss: () => void;
};

export const ToastContext = React.createContext<ToastContextValues>({
  show: () => {},
  dismiss: () => {},
});

export const ToastContextProvider: React.FC<React.PropsWithChildren<{}>> = (
  props: React.PropsWithChildren<{}>
) => {
  const [toast, setToast] = useState<ToastProps>();

  const show = (type: ToastType, message: string): void => {
    setToast({ type, message });
  };

  const dismiss = (): void => {
    setToast(undefined);
  };

  return (
    <ToastContext.Provider value={{ current: toast, show, dismiss }}>
      {props.children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValues => useContext(ToastContext);
