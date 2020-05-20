import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import PropTypes from "prop-types";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};
const NavBar = ({
  history,
  logout,
  auth: { isAuthenticated, loading, user },
}) => {
  const guestLinks = (
    <ul className="navbar-nav">
      <li className="nav-item active">
        <Link className="nav-link" style={isActive(history, "/")} to="/">
          Home
        </Link>
      </li>
      {isAuthenticated && !loading && user.role === 0 && (
        <li className="nav-item active">
          <Link
            className="nav-link"
            style={isActive(history, "/user/dashboard")}
            to="/user/dashboard"
          >
            Dashboard
          </Link>
        </li>
      )}
      {isAuthenticated && !loading && user.role === 1 && (
        <li className="nav-item active">
          <Link
            className="nav-link"
            style={isActive(history, "/admin/dashboard")}
            to="/admin/dashboard"
          >
            Dashboard
          </Link>
        </li>
      )}
      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, "/signup")}
          to="/signup"
        >
          Signup
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, "/login")}
          to="/login"
        >
          Login
        </Link>
      </li>
    </ul>
  );
  const authLinks = (
    <ul className="navbar-nav">
      <li className="nav-item active">
        <Link className="nav-link" style={isActive(history, "/")} to="/">
          Home
        </Link>
      </li>
      {isAuthenticated && !loading && user.role === 0 && (
        <li className="nav-item active">
          <Link
            className="nav-link"
            style={isActive(history, "/user/dashboard")}
            to="/user/dashboard"
          >
            Dashboard
          </Link>
        </li>
      )}
      {isAuthenticated && !loading && user.role === 1 && (
        <li className="nav-item active">
          <Link
            className="nav-link"
            style={isActive(history, "/admin/dashboard")}
            to="/admin/dashboard"
          >
            Dashboard
          </Link>
        </li>
      )}
      <li className="nav-item">
        <Link onClick={logout} className="nav-link" to="/">
          Logout
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand" to="/">
        Navbar
      </Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(withRouter(NavBar));
