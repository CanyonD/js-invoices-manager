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

function handleEdit(params) {
  console.log("handleEdit: ", params);
}
function handleRemove(params) {
  console.log("handleRemove: ", params);
}

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
    // console.log(this.state.customers);
    return (
      <div>
        <h2>Customers</h2>
        <Grid
          header={model}
          data={this.state.customers}
          handleEdit={handleEdit}
          handleRemove={handleRemove}
        />
      </div>
    );
  }
}

export default Customers;
