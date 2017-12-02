import React, { Component } from "react";
import axios from "axios";
import DropDownMenuCustomers from "./DropDownMenuCustomers";
import { Menu, MenuItem } from "material-ui/Menu";
import Divider from "material-ui/Divider";
import IconButton from "material-ui/IconButton";
import BackIcon from "material-ui/svg-icons/navigation/arrow-back";

let NewInvoice = function() {
  return (
    <div>
      <IconButton
        tooltip="Back to list"
        onClick={() => {
          arguments[0].props.history.push("/invoices");
        }}
      >
        <BackIcon />
      </IconButton>

      <h2>New Invoice</h2>
      <Menu desktop={true}>
        <MenuItem primaryText="Customer" styles={{ float: "left" }}>
          <DropDownMenuCustomers />
        </MenuItem>
        <MenuItem primaryText="Discount" />
        <Divider />
      </Menu>
    </div>
  );
};

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice: []
    };
    this.render = this.render.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);

    this.id =
      this.props !== undefined &&
      this.props.match !== undefined &&
      this.props.match.params !== undefined &&
      this.props.match.params.id !== undefined
        ? parseInt(this.props.match.params.id, 10)
        : 0;
  }

  componentDidMount() {
    if (this.id !== 0)
      axios.get("http://localhost:8800/api/invoice/0").then(results => {
        this.setState({
          invoice: results.data
        });
      });
  }

  render() {
    // console.log(this.state.invoice);
    return (
      <div>
        <h2>
          {this.id === 0
            ? <NewInvoice props={this.props} />
            : <div>
                Edit Invoice#{this.id}
              </div>}
        </h2>
      </div>
    );
  }
}

export default Invoice;
