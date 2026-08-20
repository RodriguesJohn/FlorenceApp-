import React from "react";
import "./pricing-card.css";

function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

function Card({ className, as: Tag = "div", ...props }) {
  return <Tag className={cn("pricing-card-shell", className)} {...props} />;
}

function Header({ className, children, glassEffect = true, ...props }) {
  return (
    <div className={cn("pricing-card-header", className)} {...props}>
      {glassEffect ? <div className="pricing-card-header-glass" aria-hidden="true" /> : null}
      <div className="pricing-card-header-inner">{children}</div>
    </div>
  );
}

function Body({ className, ...props }) {
  return <div className={cn("pricing-card-body", className)} {...props} />;
}

function PlanName({ className, as: Tag = "div", ...props }) {
  return <Tag className={cn("pricing-card-plan-name", className)} {...props} />;
}

function Description({ className, ...props }) {
  return <p className={cn("pricing-card-description", className)} {...props} />;
}

function Price({ className, ...props }) {
  return <div className={cn("pricing-card-price", className)} {...props} />;
}

function MainPrice({ className, ...props }) {
  return <span className={cn("pricing-card-main-price", className)} {...props} />;
}

function List({ className, ...props }) {
  return <ul className={cn("pricing-card-list", className)} {...props} />;
}

function ListItem({ className, ...props }) {
  return <li className={cn("pricing-card-list-item", className)} {...props} />;
}

export {
  Card,
  Header,
  Body,
  PlanName,
  Description,
  Price,
  MainPrice,
  List,
  ListItem
};
