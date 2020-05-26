import React, { useState, useEffect } from "react";
import { getCategories } from "../actions/category";
import { connect } from "react-redux";
import Card from "./Card";
import PropTypes from "prop-types";
import { list } from "../actions/product";

const Search = ({ getCategories, category: { categories } }) => {
  const [data, setData] = useState({
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { category, search, results, searched } = data;

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const searchData = () => {
    if (search) {
      list({ search: search || undefined, category: category }).then((res) => {
        setData({ ...data, results: res, searched: true });
      });
    }
  };

  const searchSubmit = (event) => {
    event.preventDefault();
    searchData();
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} Products`;
    }
    if (searched && results.length < 1) {
      return `No Products Found`;
    }
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchedResults = (results = []) => {
    return (
      <div>
        <h2 className="mb-4 mt-4">{searchMessage(searched, results)}</h2>
        <div className="row mt-2">
          {results.map((product, i) => (
            <div key={i} className="col-4 mb-3">
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="All">All</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by name"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );

  return (
    <div className="row">
      <div className="container">{searchForm()}</div>
      <div className="container-fluid mb-3">{searchedResults(results)}</div>
    </div>
  );
};

Search.propTypes = {
  category: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps, { getCategories })(Search);
