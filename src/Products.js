import React, { Component } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

let Product = function(props) {
  return (
    <TableRow>
      <TableRowColumn key={`trc--id-${props.product.id}`}>
        {props.product.id}
      </TableRowColumn>
      <TableRowColumn key={`trc--name-${props.product.name}`}>
        {props.product.name}
      </TableRowColumn>
      <TableRowColumn key={`trc--price-${props.product.price}`}>
        {props.product.price}
      </TableRowColumn>
      <TableRowColumn key={`trc--createdAt-${props.product.createdAt}`}>
        {props.product.createdAt}
      </TableRowColumn>
      <TableRowColumn key={`trc--updatedAt-${props.product.updatedAt}`}>
        {props.product.updatedAt}
      </TableRowColumn>
    </TableRow>
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn key="th-ID">ID</TableHeaderColumn>
              <TableHeaderColumn key="th-Name">Name</TableHeaderColumn>
              <TableHeaderColumn key="th-Price">Price</TableHeaderColumn>
              <TableHeaderColumn key="th-Added">Added</TableHeaderColumn>
              <TableHeaderColumn key="th-Updated">Updated</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.state.products.map(function(product, i) {
              return <Product product={product} key={product.id} />;
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Products;
