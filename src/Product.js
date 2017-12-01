import React, { Component } from "react";
import axios from "axios";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: []
    };
    this.render = this.render.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:8800/api/products/" + this.props.match.params.id)
      .then(results => {
        this.setState({
          product: results.data
        });
      });
  }

  render() {
    console.log(this);
    return (
      <div>
        <h2>Product</h2>
        <div>{this.props.match.params.id}</div>
      </div>
    );
  }
}

export default Product;
