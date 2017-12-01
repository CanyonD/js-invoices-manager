import React, { Component } from "react";
import axios from "axios";
import Grid from "./Grid";

let model = [
  { name: "ID", prop: "id" },
  { name: "Name", prop: "name" },
  { name: "Price", prop: "price" },
  { name: "Added", prop: "createdAt" },
  { name: "Updated", prop: "updatedAt" }
];

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.render = this.render.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEdit = this.handleRemove.bind(this);
  }

  handleEdit(params) {
    console.log("handleEdit: ", params);
    console.log("this: ", this);
    console.log(arguments);
    // this.props.history.push("/product/1");

    window.location.href = "/product/1";
  }

  handleRemove(params) {
    console.log("handleRemove: ", params);
    console.log("this: ", this);
    console.log(arguments);
  }

  componentDidMount() {
    axios.get("http://localhost:8800/api/products").then(results => {
      this.setState({
        products: results.data
      });
    });
  }

  render() {
    console.log(this);
    return (
      <div>
        <h2>Products</h2>
        <Grid
          header={model}
          data={this.state.products}
          handleEdit={this.handleEdit}
          handleRemove={this.handleRemove}
        />
      </div>
    );
  }
}

export default Products;
