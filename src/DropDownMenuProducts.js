import React, { Component } from "react";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import axios from "axios";

const styles = {
  customWidth: {
    width: 200
  }
};

function row(x, i) {
  return <MenuItem key={`ddm-i-${i}`} value={i} primaryText={x.name} />;
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
      <DropDownMenu
        value={this.state.value}
        onChange={this.handleChange}
        style={styles.customWidth}
        autoWidth={false}
      >
        {this.state.data.map(row)}
      </DropDownMenu>
    );
  }
}
