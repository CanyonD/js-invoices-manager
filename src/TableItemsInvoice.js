import React, { Component } from "react";
import DropDownMenuProducts from "./DropDownMenuProducts";
import axios from "axios";

const removeButtonStyle = {
  margin: "0"
};

class TableItemsInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
    this.addItem = this.addItem.bind(this);
    this.render = this.render.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
    console.log("constructor", this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:8800/api/invoices/" + 14 + "/items/")
      .then(results => {
        let res = results.data;
        results.data.map((x, y) => {
          if (x.product_id !== 0) {
            axios
              .get("http://localhost:8800/api/products/" + x.product_id)
              .then(results => {
                if (results.data === null) res[y].items = [];
                else {
                  res[y].price = results.data.price;
                  res[y].product_id = results.data.id;
                }
                // TODO Need to optimizing this state
                this.setState({
                  invoice: {
                    items: res
                  }
                });
              });
          }
          return x;
        });
      });
    console.log("componentDidMount", this);
  }
  queryChange(evt) {
    console.log("queryChange", this, evt);
  }

  addItem() {
    console.log("addItem", this);
    // this.setState({
    //   items: [
    //     {
    //       id: 1,
    //       product_id: 1,
    //       product_name: "Bomba",
    //       price: 0,
    //       quantity: 1
    //     }
    //   ]
    // });
  }

  handleChangeQuantity(event, row) {
    let value =
      event.target.value !== "" && !isNaN(parseInt(event.target.value, 10))
        ? parseInt(event.target.value, 10)
        : 0;
    const items = this.state.invoice.items;
    items[row].quantity = value;
    this.setState({
      items: items
    });
  }

  render() {
    console.log("render", this);
    return (
      <div className="col-md-12">
        <table className={"table table-condensed table-hover table-striped"}>
          <thead>
            <tr>
              <th>#</th>
              <th style={{ width: "70px" }} className="text-center">
                Product id
              </th>
              <th>Product Name</th>
              <th className="text-center">Price</th>
              <th className="text-center">Quantity</th>
              <th style={{ width: "100px" }}>
                <section>
                  <button
                    className="btn btn-success"
                    style={removeButtonStyle}
                    key={"addItem"}
                    onClick={this.addItem}
                  >
                    Add product
                  </button>
                </section>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.invoice.items.map((y, k) => (
              <tr key={k}>
                <td>{y.id}</td>
                <td className="text-center">{y.product_id}</td>
                <td>
                  <DropDownMenuProducts
                    {...this.props}
                    state={this.state}
                    value={y.product_id}
                  />
                </td>
                <td className="text-center">{y.price}</td>
                <td className="text-center">
                  <input
                    type="text"
                    className={"form-control input-sm"}
                    value={y.quantity}
                    onChange={event => this.handleChangeQuantity(event, k)}
                  />
                </td>
                <th>
                  <button
                    className="btn btn-danger"
                    style={removeButtonStyle}
                    onClick={this.props.handleRemoveClick}
                  >
                    Remove
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableItemsInvoice;
