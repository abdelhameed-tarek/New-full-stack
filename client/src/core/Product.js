import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Layout from "./Layout";
import { connect } from "react-redux";
import { getProduct, getRelatedProducts } from "../actions/product";
import Card from "./Card";

const Product = ({
  getProduct,
  product: { product, loading, relatedProducts },
  match,
  getRelatedProducts,
}) => {
  useEffect(() => {
    getRelatedProducts(match.params.id);
    getProduct(match.params.id);
  }, [getProduct, getRelatedProducts, match.params.id]);
  return (
    <Layout
      title={product && product.name}
      description={product && product.description}
      className="container-fluid"
    >
      <div className="row">
        {product && product.description && (
          <div className="col-8">
            <Card product={product} showViewProductButton={false} />
          </div>
        )}
        <div className="col-4">
          <h4>Related Products</h4>
          {relatedProducts.map((p, i) => (
            <div className="mb-3" key={i}>
              <Card product={p} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  getProduct: PropTypes.func.isRequired,
  getRelatedProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { getProduct, getRelatedProducts })(
  Product
);
