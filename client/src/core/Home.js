import React, { useEffect } from "react";
import Layout from "./Layout";
import { getSortedProducts } from "../actions/product";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Card from "./Card";
import Search from "./Search";

const Home = ({
  product: { loading, productsByArrival, productsBySell },
  getSortedProducts,
}) => {
  const getProductsByArrival = () => {
    getSortedProducts("createdAt");
  };
  const getProductsBySell = () => {
    getSortedProducts("sold");
  };

  useEffect(() => {
    getProductsByArrival();
    getProductsBySell();
  }, [getProductsByArrival, getProductsBySell]);
  return (
    <Layout title="Home Page" description="Welcome to our shop">
      <Search />
      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productsBySell.map((product, i) => (
          <div key={i} className="col-4 mb-3">
            <Card product={product} />
          </div>
        ))}
      </div>
      <hr />
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productsByArrival.map((product, i) => (
          <div key={i} className="col-4 mb-3">
            <Card product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

Home.propTypes = {
  getSortedProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { getSortedProducts })(Home);
