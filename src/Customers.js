import React, { Component } from "react";
import axios from "axios";
import Grid from "./Grid";

let model = [
  { name: "ID", prop: "id" },
  { name: "Name", prop: "name" },
  { name: "Phone", prop: "phone" },
  { name: "Address", prop: "address" },
  { name: "Added", prop: "createdAt" },
  { name: "Updated", prop: "updatedAt" }
];

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: []
    };
    this.render = this.render.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEdit = this.handleRemove.bind(this);
  }

  handleEdit(params) {
    console.log("handleEdit: ", params);
  }
  handleRemove(params) {
    console.log("handleRemove: ", params);
  }

  componentDidMount() {
    axios.get("http://localhost:8800/api/customers").then(results => {
      this.setState({
        customers: results.data
      });
    });
  }

  render() {
    // console.log(this.state.customers);
    return (
      <div>
        <h2>Customers</h2>
        <Grid
          header={model}
          data={this.state.customers}
          handleEdit={this.handleEdit}
          handleRemove={this.handleRemove}
        />
      </div>
    );
  }
}

export default Customers;
