import React, { Component } from "react";
import axios from "axios";

let Invoice = function(props) {
  return (
    <div className="invoice">
      <div>
        Name: {props.name}
      </div>
    </div>
  );
};

class Invoices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8800/api/invoices").then(results => {
      this.setState({
        invoices: results.data
      });
    });
  }

  render() {
    console.log(this.state.invoices);
    return (
      <div>
        <h2>Invoices</h2>
        {this.state.invoices.map(function(invoice, i) {
          return <Invoices name={invoice.name} key={i} />;
        })}
      </div>
    );
  }
}

export default Invoices;
