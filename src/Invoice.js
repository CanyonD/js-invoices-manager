import React, { Component } from "react";
import axios from "axios";
import EditInvoice from "./EditInvoice";

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice: {
        discount: 0,
        total: 0,
        items: []
      },
      discount: 0,
      total: 0,
      products: []
    };

    axios.get("http://localhost:8800/api/products").then(results => {
      this.setState({
        products: results.data
      });
    });

    this.componentWillMount = this.componentWillMount.bind(this);
    this.render = this.render.bind(this);
    this.handleChangeDiscount = this.handleChangeDiscount.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);

    this.id =
      this.props !== undefined &&
      this.props.match !== undefined &&
      this.props.match.params !== undefined &&
      this.props.match.params.id !== undefined
        ? parseInt(this.props.match.params.id, 10)
        : 0;
    console.log("constructor", this);
    console.log("state", this.state);
  }

  handleChangeDiscount(event) {
    let value =
      event.target.value !== "" && !isNaN(parseInt(event.target.value, 10))
        ? parseInt(event.target.value, 10)
        : 0;
    this.setState({ discount: value });
    this.setState({ total: value * 2 }); // Test
  }

  handleRemoveClick(event) {
    console.log(event);
  }

  componentWillMount() {
    if (this.id !== 0) {
      axios
        .get("http://localhost:8800/api/invoices/" + this.id)
        .then(results => {
          this.setState({
            invoice: results.data
          });
        });
    }
    console.log("componentWillMount", this);
  }

  render() {
    console.log("render", this);
    return (
      <div>
        <EditInvoice
          {...this.props}
          state = {this.state}
          products = {this.state.products}
          handleChangeDiscount={this.handleChangeDiscount}
          handleRemoveClick={this.handleRemoveClick}
        />
      </div>
    );
  }
}

export default Invoice;
