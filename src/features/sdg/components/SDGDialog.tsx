import React, { useState } from "react";
import FloqModal from "common/floq/components/FloqModal/FloqModal";
import SDGList from "./SDGList";

const SDGDialog: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(true);
  const onClose = (): void => setOpen(false);
  return (
    <FloqModal open={isOpen} onClose={onClose} title="Bærekraftsmål">
      <SDGList selected={[]} />
    </FloqModal>
  );
};

export default SDGDialog;
