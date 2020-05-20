import React from "react";
import PropTypes from "prop-types";
import Layout from "../core/Layout";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const UserDashboard = ({ auth: { isAuthenticated, loading, user } }) => {
  const userLinks = () => (
    <div className="card">
      <h4 className="card-header">User Links</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link className="nav-link" to="/cart">
            Cart
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="/profile/update">
            Profile Update
          </Link>
        </li>
      </ul>
    </div>
  );

  const userInfo = () => (
    <div className="card mb-5">
      <h3 className="card-header">User Information</h3>
      <ul className="list-group">
        <li className="list-group-item">{user.name}</li>
        <li className="list-group-item">{user.email}</li>
        <li className="list-group-item">
          {user.role === 1 ? "Admin" : "User"}
        </li>
      </ul>
    </div>
  );

  const purchasehistory = () => (
    <div className="card mb-5">
      <h3 className="card-header">Purchase history</h3>
      <ul className="list-group">
        <li className="list-group-item">history</li>
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
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          {userInfo()}
          {purchasehistory()}
        </div>
      </div>
    </Layout>
  );
};

UserDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(UserDashboard);
