import React, { Component } from "react";
import axios from "axios";

let Product = function(props) {
  return (
    <div className="product">
      <div>
        Name: {props.name}
      </div>
    </div>
  );
};

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8800/api/products").then(results => {
      this.setState({
        products: results.data
      });
    });
  }

  render() {
    console.log(this.state.products);
    return (
      <div>
        <h2>Products</h2>
        {this.state.products.map(function(product, i) {
          return <Product name={product.name} key={i} />;
        })}
      </div>
    );
  }
}

export default Products;
