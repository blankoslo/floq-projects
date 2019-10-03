import buttonStyles from "./styles.module.scss";
import React from "react";

type FloqButtonProps = {
  variant?: "creamy" | "purple" | "pink" | "yellow";
  fullWidth?: boolean;
  action?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const FloqButton: React.FC<FloqButtonProps> = (props: FloqButtonProps) => {
  const classNames = [
    buttonStyles.button,
    props.variant && buttonStyles[props.variant],
    props.fullWidth && buttonStyles.fullWidth,
    props.action && buttonStyles.action,
  ]
    .filter(Boolean)
    .join(" ");
  return <button className={classNames} {...props} />;
};

export default FloqButton;
