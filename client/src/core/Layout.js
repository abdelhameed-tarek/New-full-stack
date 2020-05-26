import React, { Fragment } from "react";
import NavBar from "./NavBar";
import "../styles.css";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => {
  return (
    <Fragment>
      <NavBar />
      <div>
        <div className="jumbotron">
          <h2>{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
    </Fragment>
  );
};

export default Layout;
