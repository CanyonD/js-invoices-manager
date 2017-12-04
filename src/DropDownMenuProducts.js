import React, { Component } from "react";
import axios from "axios";

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
    this.state = {
      value: props.value,
      data: []
    };
    this.handleChangeProduct = this.handleChangeProduct.bind(this)
    console.log(this);
  }

  componentDidMount() {
    axios.get("http://localhost:8800/api/products").then(results => {
      this.setState({
        data: results.data
      });
    });
  }

  handleChangeProduct (event, index, value) {
    console.log("id product: ", this);
    this.setState({ value: value });
  };

  render() {
    return (
      <div>
        <select className="form-control" id="sel1" value={this.state.value} onChange={this.handleChangeProduct}>
          {this.state.data.map((x, y) => row(x, y,this.handleChangeProduct))}
        </select>
      </div>
    );
  }
}
