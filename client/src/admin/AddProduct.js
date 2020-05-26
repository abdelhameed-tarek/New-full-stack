import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Layout from "../core/Layout";
import Alert from "../core/Alert";
import { addProduct } from "../actions/product";
import { getCategories } from "../actions/category";
import { Link } from "react-router-dom";

const AddProduct = ({
  auth: { isAuthenticated, user },
  categories: { categories, loading },
  addProduct,
  getCategories,
}) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    formData: "",
  });

  const {
    name,
    description,
    price,
    category,
    shipping,
    quantity,
    formData,
  } = values;

  useEffect(() => {
    getCategories();
    setValues({ ...values, formData: new FormData() });
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({
      ...values,
      [name]: value,
    });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    addProduct(formData);
  };

  const newProductForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange("photo")}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          value={name}
          onChange={handleChange("name")}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Product Description</label>
        <textarea
          value={description}
          onChange={handleChange("description")}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          type="number"
          value={price}
          onChange={handleChange("price")}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Category</label>
        <select onChange={handleChange("category")} className="form-control">
          <option>Please select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={handleChange("quantity")}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select onChange={handleChange("shipping")} className="form-control">
          <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <button className="btn btn-outline-primary" type="submit">
        Submit
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
      title="Create New Product"
      description={`G'day ${user.name}. Ready to create a new product?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <Alert />
          {newProductForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

AddProduct.propTypes = {
  auth: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  categories: state.category,
});

export default connect(mapStateToProps, { addProduct, getCategories })(
  AddProduct
);
