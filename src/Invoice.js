import React, { Component } from "react";
import axios from "axios";
import NewInvoice from "./NewInvoice";

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice: [],
      discount: 0,
      total: 0,
      items: [
        // {
        //   id: 1,
        //   product_id: 1,
        //   product_name: "Bomba",
        //   price: 5,
        //   quantity: 2
        // }
      ],
      products: []
    };
    this.render = this.render.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
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
    console.log("props", this.props);
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

  componentDidMount() {
    if (this.id !== 0) {
      axios.get("http://localhost:8800/api/invoice/0").then(results => {
        this.setState({
          invoice: results.data
        });
      });
    }
    axios.get("http://localhost:8800/api/products").then(results => {
      this.setState({
        products: results.data
      });
    });
    console.log("componentDidMount", this);
  }

  render() {
    console.log("render", this);
    return (
      <div>
        <NewInvoice
          {...this.props}
          state={this.state}
          handleChangeDiscount={this.handleChangeDiscount}
          handleRemoveClick={this.handleRemoveClick}
        />
      </div>
    );
  }
}

export default Invoice;
