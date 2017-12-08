import React, { Component } from "react";
import axios from "axios";
import IconButton from "material-ui/IconButton";
import BackIcon from "material-ui/svg-icons/navigation/arrow-back";

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {
        name: '',
        address: '',
        phone: ''
      }
    };
    // this.render = this.render.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    
    this.id =
      this.props !== undefined &&
      this.props.match !== undefined &&
      this.props.match.params !== undefined &&
      this.props.match.params.id !== undefined
        ? parseInt(this.props.match.params.id, 10)
        : 0;
  }

  componentDidMount() {
    axios
      .get("http://localhost:8800/api/customers/" + this.props.match.params.id)
      .then(results => {
        this.setState({
          customer: results.data
        });
      });
  }

  handleChangeAddress(event) {
    axios
      .put("http://localhost:8800/api/customers/" + this.id, {
        address: event.target.value
      })
      .then(results => {
        this.componentDidMount();
      });
  }

  handleChangePhone(event) {
    axios
      .put("http://localhost:8800/api/customers/" + this.id, {
        phone: event.target.value
      })
      .then(results => {
        this.componentDidMount();
      });
  }

  handleChangeName(event) {
    axios
      .put("http://localhost:8800/api/customers/" + this.id, {
        name: event.target.value
      })
      .then(results => {
        this.componentDidMount();
      });
  }

  render() {
    return (
      <div>
        <div>
          <fieldset>
            <legend>
              <IconButton
                className={"col-md-4 control-label "}
                tooltip="Back to list"
                onClick={() => {
                  this.props.history.push("/customers");
                }}
              >
                <BackIcon />
              </IconButton>
              <div className={"col-md-3 control-label"}>
                Edit Product # {this.props.match.params.id}
              </div>
            </legend>
            <form className="form-horizontal">
              <div className="form-group">
                <label className="control-label col-sm-1">Name</label>
                <div className="col-md-5">
                  <input
                    type="text"
                    placeholder=""
                    className={"form-control input-md input-name"}
                    value={this.state.customer.name}
                    onChange={this.handleChangeName}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-1">Address</label>
                <div className="col-md-5">
                  <input
                    type="text"
                    placeholder=""
                    className={"form-control input-md input-price"}
                    value={this.state.customer.address}
                    onChange={this.handleChangeAddress}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-1">Phone</label>
                <div className="col-md-5">
                  <input
                    type="text"
                    placeholder=""
                    className={"form-control input-md input-price"}
                    value={this.state.customer.phone}
                    onChange={this.handleChangePhone}
                  />
                </div>
              </div>
            </form>
          </fieldset>
        </div>
      </div>
    );
  }
}

export default Customer;
