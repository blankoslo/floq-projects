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
  const { variant, fullWidth, action, ...forward } = props;
  const classNames = [
    buttonStyles.button,
    variant && buttonStyles[variant],
    fullWidth && buttonStyles.fullWidth,
    action && buttonStyles.action,
  ]
    .filter(Boolean)
    .join(" ");
  return <button className={classNames} {...forward} />;
};

export default FloqButton;
