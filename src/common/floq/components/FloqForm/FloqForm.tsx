import React from "react";
import formStyles from "./styles.module.scss";

type FloqFormProps = { children: React.ReactNode };
const FloqForm: React.FC<FloqFormProps> = (props: FloqFormProps) => (
  <div className={formStyles.form}>{props.children}</div>
);
export default FloqForm;
