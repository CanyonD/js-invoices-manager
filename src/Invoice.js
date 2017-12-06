import React, { Component } from "react";
import axios from "axios";
import IconButton from "material-ui/IconButton";
import BackIcon from "material-ui/svg-icons/navigation/arrow-back";

const removeButtonStyle = {
  margin: "0"
};

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice: {
        discount: 0,
        total: 0,
        items: []
      },
      products: [],
      customers: []
    };

    axios.get("http://localhost:8800/api/products").then(results => {
      this.setState({
        products: results.data
      });
    });

    axios.get("http://localhost:8800/api/customers").then(results => {
      this.setState({
        customers: results.data
      });
    });

    this.componentWillMount = this.componentWillMount.bind(this);
    this.render = this.render.bind(this);
    this.handleChangeDiscount = this.handleChangeDiscount.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChangeProduct = this.handleChangeProduct.bind(this);
    this.handleChangeCustomer = this.handleChangeCustomer.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);

    this.id =
      this.props !== undefined &&
      this.props.match !== undefined &&
      this.props.match.params !== undefined &&
      this.props.match.params.id !== undefined
        ? parseInt(this.props.match.params.id, 10)
        : 0;
    console.log("constructor", this);
    console.log("state", this.state);
  }

  componentDidMount() {
    axios
      .get("http://localhost:8800/api/invoices/" + this.id + "/items/")
      .then(results => {
        let res = results.data;
        results.data.map((x, y) => {
          if (x.product_id !== 0) {
            axios
              .get("http://localhost:8800/api/products/" + x.product_id)
              .then(results => {
                if (results.data === null) res[y].items = [];
                else {
                  res[y].price = results.data.price;
                  res[y].product_id = results.data.id;
                }
                // TODO Need to optimizing this state
                this.setState({
                  invoice: Object.assign(this.state.invoice, { items: res })
                });
              });
          } else {
            res[y].price = 0;
            this.setState({
              invoice: Object.assign(this.state.invoice, { items: res })
            });
          }
          // this.calculateTotal();
          return x;
        });
      });
    console.log("componentDidMount", this);
  }

  handleChangeDiscount(event) {
    let value =
      event.target.value !== "" && !isNaN(parseInt(event.target.value, 10))
        ? parseInt(event.target.value, 10)
        : 0;
    axios
      .put("http://localhost:8800/api/invoices/" + this.id, {
        discount: value,
        total: this.state.invoice.total * value
      })
      .then(results => {
        let res = results.data;
        console.log(res);
        // this.calculateTotal();
        this.componentWillMount();
      });
  }

  handleRemoveClick(event) {
    axios
      .delete(
        "http://localhost:8800/api/invoices/" + this.id + "/items/" + event.id
      )
      .then(results => {
        let res = results.data;
        console.log(res);
        this.componentDidMount();
      });
  }

  handleChangeProduct(event) {
    // console.log("event: ", event.target.attributes.item_id.value);
    // console.log("id product: ", event.target.value);
    axios
      .put(
        "http://localhost:8800/api/invoices/" +
          this.id +
          "/items/" +
          event.target.attributes.item_id.value,
        {
          product_id: event.target.value
        }
      )
      .then(results => {
        let res = results.data;
        console.log(res);
        this.componentDidMount();
      });
    // this.setState({ value: value });
  }

  handleChangeCustomer(event) {
    // console.log("event: ", event.target.attributes.item_id.value);
    // console.log("id product: ", event.target.value);
    axios
      .put(
        "http://localhost:8800/api/invoices/" +
          this.id ,
        {
          customer_id: event.target.value
        }
      )
      .then(results => {
        let res = results.data;
        console.log(res);
        this.componentDidMount();
      });
    // this.setState({ value: value });
  }

  calculateTotal() {
    let total = 0;
    this.state.invoice.items.map((x, y) => (total += x.price * x.quantity));

    console.log(total);
    axios
      .put("http://localhost:8800/api/invoices/" + this.id, {
        total: total
      })
      .then(results => {
        let res = results.data;
        console.log(res);
        // this.componentDidMount();
        this.componentWillMount();
      });
  }

  handleAddClick() {
    axios
      .post(
        "http://localhost:8800/api/invoices/" +
          this.state.invoice.id +
          "/items/",
        {
          invoice_id: this.state.invoice.id,
          product_id: 0,
          quantity: 0
        }
      )
      .then(results => {
        let res = results.data;
        console.log(res);
        this.componentWillMount();
      });
  }

  componentWillMount() {
    if (this.id !== 0) {
      axios
        .get("http://localhost:8800/api/invoices/" + this.id)
        .then(results => {
          this.setState({
            invoice: Object.assign(results.data, {
              items: this.state.invoice.items
            })
          });
        });
    }
    console.log("componentWillMount", this);
  }

  handleChangeQuantity(event, row) {
    let value =
      event.target.value !== "" && !isNaN(parseInt(event.target.value, 10))
        ? parseInt(event.target.value, 10)
        : 0;
    axios
      .put(
        "http://localhost:8800/api/invoices/" +
          this.id +
          "/items/" +
          event.target.attributes.item_id.value,
        {
          quantity: value
        }
      )
      .then(results => {
        let res = results.data;
        console.log(res);
        this.componentDidMount();
      });
  }

  render() {
    console.log("render", this);
    return (
      <div>
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

                <div className="col-md-3">
        <select
          className="form-control"
          id="sel1"
          value={this.state.invoice.customer_id}
          onChange={this.handleChangeCustomer}
        >
          <option key={`ddm-i-${0}`} value={0}>
            Please select customer
          </option>
          {this.state.customers.map((x, y) =>
            <option key={`ddm-i-${x.id}`} value={x.id}>
              {x.name}
            </option>
          )}
        </select>
      </div>

                <label className="control-label col-sm-1">Discount</label>
                <div className="col-md-1">
                  <input
                    type="text"
                    placeholder=""
                    className={"form-control input-md"}
                    value={this.state.invoice.discount}
                    onChange={this.handleChangeDiscount}
                  />
                </div>
                <label className="control-label col-sm-2">Total</label>
                <div className="col-md-1">
                  <input
                    type="text"
                    readOnly="readonly"
                    className="form-control"
                    value={this.state.invoice.total}
                  />
                </div>
              </div>
            </fieldset>
            <div className="col-md-12">
              <table
                className={"table table-condensed table-hover table-striped"}
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th style={{ width: "70px" }} className="text-center">
                      Product id
                    </th>
                    <th>Product Name</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Quantity</th>
                    <th style={{ width: "100px" }}>
                      <section>
                        <button
                          className="btn btn-success"
                          style={removeButtonStyle}
                          key={"addItem"}
                          onClick={() => this.handleAddClick()}
                        >
                          Add product
                        </button>
                      </section>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.invoice.items.map((y, k) =>
                    <tr key={k}>
                      <td>
                        {y.id}
                      </td>
                      <td className="text-center">
                        {y.product_id}
                      </td>
                      <td>
                        <select
                          className="form-control"
                          id={`sel-${y.id}`}
                          item_id={y.id}
                          value={y.product_id}
                          onChange={this.handleChangeProduct}
                        >
                          <option key={`ddm-i-${0}`} value={0}>
                            Please select product
                          </option>
                          {this.state.products.map((x, y) =>
                            <option key={`ddm-i-${y}`} value={y}>
                              {x.name}
                            </option>
                          )}
                        </select>
                      </td>
                      <td className="text-center">
                        {y.price}
                      </td>
                      <td className="text-center">
                        <input
                          type="text"
                          className={"form-control input-sm"}
                          value={y.quantity}
                          item_id={y.id}
                          onChange={event =>
                            this.handleChangeQuantity(event, k)}
                        />
                      </td>
                      <th>
                        <button
                          className="btn btn-danger"
                          style={removeButtonStyle}
                          onClick={() => this.handleRemoveClick(y)}
                        >
                          Remove
                        </button>
                      </th>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Invoice;
