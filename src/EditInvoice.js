import React, { Component } from "react";
import DropDownMenuCustomers from "./DropDownMenuCustomers";
import IconButton from "material-ui/IconButton";
import BackIcon from "material-ui/svg-icons/navigation/arrow-back";
import TableItemsInvoice from "./TableItemsInvoice";

class EditInvoice extends Component {
  constructor(props) {
    super(props);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.render = this.render.bind(this);
    console.log("constructor", this);
  }
  componentWillMount() {
    console.log('componentWillMount', this);
  }

  render() {
    console.log("render", this);
    return (
      <div>
        <form className="form-horizontal">
          <fieldset>
            <legend>
              <IconButton
                className={"col-md-4 control-label "}
                tooltip="Back to list"
                onClick={() => {
                  this.props.history.push("/invoices");
                }}
              >
                <BackIcon />
              </IconButton>
              <div className={"col-md-2 control-label"}>Edit Invoice</div>
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
                  value={this.props.state.invoice.discount}
                  onChange={this.props.handleChangeDiscount}
                />
              </div>
              <label className="control-label col-sm-2">Total</label>
              <div className="col-md-1">
                <input
                  type="text"
                  readOnly="readonly"
                  className="form-control"
                  value={this.props.state.invoice.total}
                />
              </div>
            </div>
          </fieldset>
          <TableItemsInvoice
            {...this.props}
            state={this.state}
            handleRemoveClick={this.handleRemoveClick}
          />
        </form>
      </div>
    );
  }
}

export default EditInvoice;
