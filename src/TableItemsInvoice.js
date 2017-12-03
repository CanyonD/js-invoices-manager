import React, { Component } from "react";
import DropDownMenuProducts from "./DropDownMenuProducts";
const removeButtonStyle = {
  margin: "0"
};

class TableItemsInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.props.state;
    this.addItem = this.addItem.bind(this);
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
    console.log("constructor", this);
  }

  addItem() {
    console.log("addItem", this);
  }

  handleChangeQuantity(event, item, row) {
    let value =
      event.target.value !== "" && !isNaN(parseInt(event.target.value, 10))
        ? parseInt(event.target.value, 10)
        : 0;
    const items = this.state.items;
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
              <th>Product Name</th>
              <th className="text-center">Price</th>
              <th className="text-center">Quantity</th>
              <th style={{ width: "100px" }}>
                <button
                  className="btn btn-success"
                  style={removeButtonStyle}
                  onClick={this.addItem}
                >
                  Add product
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map((y, k) =>
              <tr key={k}>
                <td>
                  {y.id}
                </td>
                <td>
                  <DropDownMenuProducts />
                </td>
                <td className="text-center">
                  {y.price}
                </td>
                <td className="text-center">
                  <input
                    type="text"
                    className={"form-control input-sm"}
                    value={y.quantity}
                    onChange={event => this.handleChangeQuantity(event, y, k)}
                  />
                </td>
                <th>
                  <button
                    className="btn btn-danger"
                    style={removeButtonStyle}
                    onClick={this.props.props.handleRemoveClick}
                  >
                    Remove
                  </button>
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableItemsInvoice;
