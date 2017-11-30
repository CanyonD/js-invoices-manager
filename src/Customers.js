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

let Customer = function(props) {
  return (
    <TableRow>
      <TableRowColumn>
        {props.customer.id}
      </TableRowColumn>
      <TableRowColumn>
        {props.customer.name}
      </TableRowColumn>
      <TableRowColumn>
        {props.customer.phone}
      </TableRowColumn>
      <TableRowColumn>
        {props.customer.address}
      </TableRowColumn>
      <TableRowColumn>
        {props.customer.createdAt}
      </TableRowColumn>
      <TableRowColumn>
        {props.customer.updatedAt}
      </TableRowColumn>
    </TableRow>
  );
};

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8800/api/customers").then(results => {
      this.setState({
        customers: results.data
      });
    });
  }

  render() {
    console.log(this.state.customers);
    return (
      <div>
        <h2>Customers</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Phone</TableHeaderColumn>
              <TableHeaderColumn>Address</TableHeaderColumn>
              <TableHeaderColumn>Added</TableHeaderColumn>
              <TableHeaderColumn>Updated</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.state.customers.map(function(customer) {
              return <Customer customer={customer} key={customer.id} />;
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Customers;
