import React from "react";
import { Link, LinkProps } from "react-router-dom";

export const renderLink = (to: string) => {
  const component = React.forwardRef<HTMLAnchorElement, Omit<LinkProps, "to">>(
    (itemProps, ref) => (
      <Link to={to} ref={ref} {...itemProps} role={undefined} />
    )
  );
  component.displayName = "RenderLink";
  return component;
};
