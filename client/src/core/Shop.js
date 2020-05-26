import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories } from "../actions/category";
import Checkbox from "./Checkbox";
import Radiobox from "./Radiobox";
import { prices } from "./fixedPrices";
import { getFilteredByProducts } from "../actions/product";
// import { getFilteredProducts } from "../actions/product";

const Shop = ({ getCategories, category: { categories } }) => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const loadFilterResults = (newFilters) => {
    getFilteredByProducts(skip, limit, newFilters).then((data) => {
      setFilteredResults(data.data);
      setSkip(0);
      setLimit(6);
      setSize(data.size);
    });
  };
  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredByProducts(toSkip, limit, myFilters.filters).then((data) => {
      setFilteredResults([...filteredResults, ...data.data]);
      setSkip(toSkip);
      setSize(data.size);
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button className="btn btn-warning mb-5" onClick={loadMore}>
          Load More Products
        </button>
      )
    );
  };

  useEffect(() => {
    loadFilterResults(limit, skip, myFilters.filters);
    getCategories();
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilterResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <Fragment>
      <Layout
        title="Shop Page"
        description="Ready to deliver you what you want"
        className="container-fluid"
      >
        <div className="row">
          <div className="col-4">
            <h4>Filter by categories</h4>
            <ul>
              <Checkbox
                categories={categories}
                handleFilters={(filters) => handleFilters(filters, "category")}
              />
            </ul>
            <h4>Filter by price</h4>
            <div>
              <Radiobox
                prices={prices}
                handleFilters={(filters) => handleFilters(filters, "price")}
              />
            </div>
          </div>
          <div className="col-8">
            <h4 className="mb-4">Products</h4>
            <div className="row">
              {filteredResults.map((p, i) => (
                <div key={p._id} className="col-4 mb-3">
                  <Card product={p} />
                </div>
              ))}
            </div>
            <hr />
            {loadMoreButton()}
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

Shop.propTypes = {
  category: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
  //   getFilteredProducts: PropTypes.func.isRequired,
  //   product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category,
  //   product: state.product,
});

export default connect(mapStateToProps, { getCategories })(Shop);
