import React, { Component } from "react";
import axios from "axios";

function row(x, i, handleChange) {
  return (
    <option key={`ddm-i-${i}`} value={i} onChange={handleChange}>
      {" "}{x.name}{" "}
    </option>
  );
}

export default class DropDownMenuCustomers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      data: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8800/api/customers").then(results => {
      this.setState({
        data: results.data
      });
    });
  }

  handleChange = (event, index, value) => {
    this.setState({ value });
    console.log("id customer: ", value);
  };

  render() {
    return (
      <div className="col-md-3">
        <select className="form-control" id="sel1">
          {this.state.data.map((x, y) => row(x, y, this.handleChange))}
        </select>
      </div>
    );
  }
}
