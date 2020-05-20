import React from "react";
import PropTypes from "prop-types";
import Layout from "../core/Layout";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const AdminDashBoard = ({ auth: { isAuthenticated, loading, user } }) => {
  const adminLinks = () => (
    <div className="card">
      <h4 className="card-header">Admin Links</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link className="nav-link" to="/create/category">
            Create New Category
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="/create/product">
            Create New Product
          </Link>
        </li>
      </ul>
    </div>
  );

  const adminInfo = () => (
    <div className="card mb-5">
      <h3 className="card-header">Admin Information</h3>
      <ul className="list-group">
        <li className="list-group-item">{user.name}</li>
        <li className="list-group-item">{user.email}</li>
        <li className="list-group-item">
          {user.role === 1 ? "Admin" : "User"}
        </li>
      </ul>
    </div>
  );

  return (
    <Layout
      title="Dashboard"
      description={`G'day ${user.name}`}
      className="container"
    >
      <div className="row">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">{adminInfo()}</div>
      </div>
    </Layout>
  );
};

AdminDashBoard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminDashBoard);
