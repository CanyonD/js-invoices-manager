import React, { Component } from "react";
import axios from "axios";
import DropDownMenuCustomers from "./DropDownMenuCustomers";
import IconButton from "material-ui/IconButton";
import BackIcon from "material-ui/svg-icons/navigation/arrow-back";

let NewInvoice = function(props, state) {
  
  return (
    <div>
      <form className="form-horizontal">
        <fieldset>
          <legend>
            <IconButton
              className={"col-md-4 control-label "}
              tooltip="Back to list"
              onClick={() => {
                arguments[0].props.history.push("/invoices");
              }}
            >
              <BackIcon />
            </IconButton>
            <div className={"col-md-2 control-label"}>New Invoice</div>
          </legend>
          <div className="form-group">
            <label className="control-label col-sm-2">Customer</label>
            <DropDownMenuCustomers />
            <label className="control-label col-sm-1">Discount</label>
            <div className="col-md-1">
              <input
                type="text"
                placeholder=""
                className={"form-control input-md"}
                value={props.state.discount}
                onChange={props.handleChange}
              />
            </div>
            <label className="control-label col-sm-2">Total</label>
            <div className="col-md-1">
              <input
                type="text"
                readOnly="readonly"
                className="form-control"
                value={props.state.total}
              />
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice: [],
      discount: 0,
      total: 0
    };
    this.render = this.render.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChangeDiscount = this.handleChangeDiscount.bind(this);

    this.id =
      this.props !== undefined &&
      this.props.match !== undefined &&
      this.props.match.params !== undefined &&
      this.props.match.params.id !== undefined
        ? parseInt(this.props.match.params.id, 10)
        : 0;
  }

  handleChangeDiscount(event) {
    let value =
      event.target.value !== "" && !isNaN(parseInt(event.target.value, 10))
        ? parseInt(event.target.value, 10)
        : 0;
    this.setState({ discount: value });
    this.setState({ total: value*2 });    // Test
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
    return (
      <div>
        {this.id === 0
          ? <NewInvoice
              props={this.props}
              state={this.state}
              handleChange={this.handleChangeDiscount}
            />
          : <h2>
              <div>
                Edit Invoice#{this.id}
              </div>
            </h2>}
      </div>
    );
  }
}

export default Invoice;
