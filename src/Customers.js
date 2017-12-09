import React, { Component } from "react";
import axios from "axios";
import Grid from "./Grid";

const customButtonStyle = {
  margin: "0"
};

let model = [
  { name: "ID", prop: "id" },
  { name: "Name", prop: "name" },
  { name: "Address", prop: "address" },
  { name: "Phone", prop: "phone" },
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
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleEdit(params) {
    window.location.href = "/customer/" + params.id;
  }

  handleRemove(params) {
    axios
      .delete("http://localhost:8800/api/customers/" + params.id)
      .then(results => {
        this.componentDidMount();
      });
  }

  handleAdd(params) {
    axios
      .post("http://localhost:8800/api/customers/", {
        name: "",
        address: "",
        phone: ""
      })
      .then(results => {
        let res = results.data;
        this.props.history.push("/customer/" + res.id);
      });
  }

  componentDidMount() {
    axios.get("http://localhost:8800/api/customers").then(results => {
      this.setState({
        customers: results.data
      });
    });
  }

  render() {
    return (
      <div className="form-horizontal">
        <div className="form-group">
          <div className="row">
            <div className="col-md-5">
              <h2>List of customers</h2>
            </div>
            <div className="col-md-3">
              <h2>
                <button
                  className="btn btn-success"
                  style={customButtonStyle}
                  onClick={this.handleAdd}
                >
                  Add new customer
                </button>
              </h2>
            </div>
          </div>
        </div>
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
