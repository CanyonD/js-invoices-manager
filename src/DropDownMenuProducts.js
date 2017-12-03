import React, { Component } from "react";
import axios from "axios";

function row(x, i, handleChange) {
  return (
    <option key={`ddm-i-${i}`} value={i} onChange={handleChange}>
      {" "}{x.name}{" "}
    </option>
  );
}

export default class DropDownMenuProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      data: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8800/api/products").then(results => {
      this.setState({
        data: results.data
      });
    });
  }

  handleChange = (event, index, value) => {
    this.setState({ value });
    console.log("id product: ", value);
  };

  render() {
    return (
      <div>
        <select className="form-control" id="sel1">
          {this.state.data.map((x, y) => row(x, y, this.handleChange))}
        </select>
      </div>
    );
  }
}
