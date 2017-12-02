import React, { Component } from "react";
import axios from "axios";
import Grid from "./Grid";
import Invoice from "./Invoice";

let model = [
  { name: "ID", prop: "id" },
  { name: "Customer", prop: "customer" },
  { name: "Discount", prop: "discount" },
  { name: "Total", prop: "total" },
  { name: "Added", prop: "createdAt" },
  { name: "Updated", prop: "updatedAt" }
];

class Invoices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices: []
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
  }

  handleRemove(params) {
    console.log("handleRemove: ", params);
    console.log("this: ", this);
    console.log(arguments);
  }
  componentDidMount() {
    axios.get("http://localhost:8800/api/invoices").then(results => {
      let res = results.data;
      results.data.map((x, y) => {
        axios
          .get("http://localhost:8800/api/customers/" + x.customer_id)
          .then(results => {
            res[y].customer = results.data.name;
            // TODO Need to optimizing this state
            this.setState({
              invoices: res
            });
          });
      });
    });
  }

  render() {
    console.log(this.state.invoices);
    return (
      <div>
        {this.state.invoices.length === 0
          ? <Invoice />
          : <Grid
              header={model}
              data={this.state.invoices}
              handleEdit={this.handleEdit}
              handleRemove={this.handleRemove}
            />}
      </div>
    );
  }
}

export default Invoices;
