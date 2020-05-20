import React, { useState } from "react";
import Layout from "../core/Layout";
import { signup } from "../actions/auth";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import Alert from "../core/Alert";
import { Redirect } from "react-router-dom";

const Signup = ({ signup, auth: { isAuthenticated, loading, user } }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, error: false, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    signup({ name, email, password });
  };

  const signupForm = () => (
    <form
      onSubmit={(e) => {
        onSubmit(e);
      }}
    >
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          className="form-control"
          type="text"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">E-mail</label>
        <input
          className="form-control"
          type="email"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          className="form-control"
          type="password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Signup
      </button>
    </form>
  );

  const redirection = () => {
    if (isAuthenticated && !loading) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
  };

  return (
    <Layout
      title="Signup Page"
      description="Welcome to our shop"
      className="container col-md-8 offset-md-2"
    >
      <Alert />
      {signupForm()}
      {redirection()}
    </Layout>
  );
};

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signup })(Signup);
