import React, { Component } from "react";
import axios from "axios";

let Customer = function(props) {
  return (
    <div className="customer">
      <div>
        Name: {props.name}
      </div>
    </div>
  );
};

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8800/api/customers").then(results => {
      this.setState({
        customers: results.data
      });
    });
  }

  render() {
    console.log(this.state.customers);
    return (
      <div>
        <h2>Customers</h2>
        {this.state.customers.map(function(customer, i) {
          return <Customer name={customer.name} key={i} />;
        })}
      </div>
    );
  }
}

export default Customers;
