import React, { useState } from "react";
import FloqModal from "common/floq/components/FloqModal/FloqModal";
import SDGList from "./SDGList";
import FloqForm from "common/floq/components/FloqForm/FloqForm";
import FloqModalActions from "common/floq/components/FloqModal/FloqModalActions";
import FloqButton from "common/floq/components/FloqButton/FloqButton";
import FloqFormControl from "common/floq/components/FloqFormControl/FloqFormControl";
import FloqInputLabel from "common/floq/components/FloqInputLabel/FloqInputLabel";
import styles from "../styles/dialog.module.scss";

const SDGDialog: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(true);
  const onClose = (): void => setOpen(false);

  const [selected, setSelected] = useState<number[]>([]);
  const onSelect = (id: number, checked: boolean): void => {
    if (checked) {
      setSelected([...selected, id].sort((a, b) => a - b));
    } else {
      setSelected(selected.filter(s => s !== id).sort((a, b) => a - b));
    }
  };

  return (
    <FloqModal open={isOpen} onClose={onClose} title="Bærekraftsmål">
      <p>Velg bærekraftsmålene prosjektet bidrar til</p>
      <div className={styles.row}>
        <div className={`${styles.column} ${styles.select}`}>
          <FloqForm>
            <FloqFormControl size="large">
              <SDGList selected={selected} onSelect={onSelect} />
            </FloqFormControl>
            <a href="https://www.fn.no/Om-FN/FNs-baerekraftsmaal">
              Les mer om FNs bærekraftsmål
            </a>
          </FloqForm>
        </div>
        <div className={`${styles.column} ${styles.tiles}`}>
          <div className={styles.row}>
            {selected.map(s => (
              <img key={`img-${s}`} src={require(`../icons/${s}.jpg`)} />
            ))}
          </div>
        </div>
      </div>
      <FloqModalActions>
        <FloqButton fullWidth action onClick={onClose} type="button">
          Avbryt
        </FloqButton>
        <FloqButton fullWidth action variant="yellow" type="submit">
          Lagre
        </FloqButton>
      </FloqModalActions>
    </FloqModal>
  );
};

export default SDGDialog;
