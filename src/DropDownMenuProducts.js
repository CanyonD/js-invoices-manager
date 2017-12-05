import React, { Component } from "react";
// import axios from "axios";

function row(x, i, handleChangeProduct) {
  return (
    <option key={`ddm-i-${i}`} value={i}>
      {" "}{x.name}{" "}
    </option>
  );
}

export default class DropDownMenuProducts extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
    this.handleChangeProduct = this.handleChangeProduct.bind(this)
    console.log('constructor',this);
  }

  componentDidMount() {
    console.log('componentDidMount',this);
  }

  handleChangeProduct (event, index, value) {
    console.log("id product: ", this);
    this.setState({ value: value });
  };

  render() {
    console.log('render',this)
    return (
      <div>
        <select className="form-control" id="sel1" value={this.state.value} onChange={this.handleChangeProduct}>
          {this.state.products.map((x, y) => row(x, y, this.handleChangeProduct))}
        </select>
      </div>
    );
  }
}
