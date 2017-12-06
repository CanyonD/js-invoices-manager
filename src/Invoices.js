import React, { Component } from "react";
import axios from "axios";
import Grid from "./Grid";
import Invoice from "./Invoice";

const removeButtonStyle = {
  margin: "0"
};

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
      invoices: [
        {
          discount: 0,
          total: 0,
          items: []
        }
      ]
    };
    this.render = this.render.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleAddInvoice = this.handleAddInvoice.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    // console.log("constructor", this);
  }
  handleEdit(params) {
    this.props.history.push("/invoice/" + params.id);
  }

  handleRemove(params) {
    axios
      .delete("http://localhost:8800/api/invoices/" + params.id)
      .then(results => {
        // let res = results.data;
        // console.log(res);
        this.componentDidMount();
      });
  }
  componentDidMount() {
    axios.get("http://localhost:8800/api/invoices").then(results => {
      let res = results.data;
      results.data.map((x, y) => {
        if (x.customer_id !== 0 && x.customer_id !== null) {
          axios
            .get("http://localhost:8800/api/customers/" + x.customer_id)
            .then(results => {
              if (results.data === null) res[y].customer = "";
              else res[y].customer = results.data.name;
              // TODO Need to optimizing this state
              this.setState({
                invoices: res
              });
            });
        } else {
          res[y].customer = "";
          this.setState({
            invoices: res
          });
        }
        return x;
      });
    });
    // console.log("componentDidMount", this);
  }

  handleAddInvoice(params) {
    axios
      .post("http://localhost:8800/api/invoices/", {
        customer_id: 0,
        total: 0,
        discount: 0
      })
      .then(results => {
        let res = results.data;
        // console.log(res);
        this.props.history.push("/invoice/" + res.id);
      });
  }

  render() {
    // console.log("render", this);
    return (
      <div>
        <button
          className="btn btn-success"
          style={removeButtonStyle}
          onClick={this.handleAddInvoice}
        >
          Add new invoice
        </button>
        {this.state.invoices.length === 0 ? (
          <Invoice {...this.props} />
        ) : (
          <Grid
            {...this.props}
            header={model}
            data={this.state.invoices}
            handleEdit={this.handleEdit}
            handleRemove={this.handleRemove}
          />
        )}
      </div>
    );
  }
}

export default Invoices;
