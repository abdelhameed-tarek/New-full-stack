import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Layout from "../core/Layout";
import Alert from "../core/Alert";
import { addProduct } from "../actions/product";
import { Link } from "react-router-dom";

const AddProduct = ({
  addProduct,
  auth: { isAuthenticated, loading, user },
}) => {
  const [values, setvalues] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    shipping: "",
    photo: "",
    formData: "",
  });

  const {
    name,
    description,
    price,
    category,
    quantity,
    shipping,
    image,
    formData,
  } = values;

  useEffect(() => {
    setvalues({ ...values, formData: new FormData() });
  }, []);

  const onChange = (name) => (e) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setvalues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addProduct(user._id, formData);
  };

  const newProductForm = () => (
    <form className="mb-3" onSubmit={(e) => onSubmit(e)}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => onChange(e)}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Product Description</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => onChange(e)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => onChange(e)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Category</label>
        <select onChange={(e) => onChange(e)} className="form-control">
          <option>option a</option>
          <option>option b</option>
          <option>option c</option>
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={quantity}
          onChange={(e) => onChange(e)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Shiiping</label>
        <select onChange={(e) => onChange(e)} className="form-control">
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addProduct })(AddProduct);
