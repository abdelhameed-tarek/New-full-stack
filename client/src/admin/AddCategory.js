import React, { useState } from "react";
import PropTypes from "prop-types";
import Layout from "../core/Layout";
import { connect } from "react-redux";
import { addCategory } from "../actions/category";
import Alert from "../core/Alert";
import { Link } from "react-router-dom";
const AddCategory = ({
  auth: { isAuthenticated, loading, user },
  addCategory,
}) => {
  const [name, setName] = useState("");

  const onChange = (e) => setName(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    addCategory({ name });
  };

  const newCategoryForm = () => (
    <form onSubmit={(e) => onSubmit(e)}>
      <div className="form-group">
        <label className="text-muted">Category Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          name="name"
          onChange={(e) => onChange(e)}
          autoFocus
        />
      </div>
      <button type="submit" className="btn btn-outline-primary">
        Create New Category
      </button>
    </form>
  );

  const goBack = () => (
    <div className="mt-5">
      <Link className="text-warning" to="/admin/dashboard">
        Go Back
      </Link>
    </div>
  );

  return (
    <Layout
      title="Create New Category"
      description={`G'day ${user.name}. Ready to create a new category?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <Alert />
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

AddCategory.propTypes = {
  auth: PropTypes.object.isRequired,
  addCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addCategory })(AddCategory);
