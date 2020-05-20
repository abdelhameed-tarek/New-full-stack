import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AdminRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && !loading && user.role === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminRoute);
