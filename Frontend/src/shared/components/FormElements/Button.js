import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

const Button = (props) => {
  if (props.href) {
    //href: a tag, hyperlink(URL)
    return (
      <a
        className={`button button--${props.size || "default"} ${
          props.inverse && "button--inverse"
        } ${props.danger && "button--danger"}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }

  if (props.to) {
    //to: (react-router-dom)Link tag, nevigate to another page
    return (
      <Link
        className={`button button--${props.size || "default"} ${
          props.inverse && "button--inverse"
        } ${props.danger && "button--danger"}`}
        to={props.to}
        exact={props.exact}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      className={`button button--${props.size || "default"} ${
        props.inverse && "button--inverse"
      } ${props.danger && "button--danger"}`}
      onClick={props.onClick}
      type={props.type}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
