import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import EditIcon from "material-ui/svg-icons/image/edit";
import RemoveIcon from "material-ui/svg-icons/action/delete";

function row(x, i, header, handleEdit, handleRemove) {
  return (
    <TableRow key={`tr-${i}`}>
      {header.map(
        (y, k) =>
          y.prop === "id" ? (
            <TableRowColumn style={{ width: 60 }} key={`trc-${k}`}>
              {x[y.prop]}
            </TableRowColumn>
          ) : 
            x[y.prop] === "" || x[y.prop] === null ? (
              <TableRowColumn key={`trc-${k}`} style={{ fontStyle: "italic" }}>
                (not specified)
              </TableRowColumn>
            ) : (
              <TableRowColumn key={`trc-${k}`}>{x[y.prop]}</TableRowColumn>
          
          )
      )}
      <TableRowColumn key={`tr-edit-${i}`} style={{ width: 60 }}>
        <EditIcon onClick={() => handleEdit(x)} />
      </TableRowColumn>
      <TableRowColumn key={`tr-remove-${i}`} style={{ width: 60 }}>
        <RemoveIcon onClick={() => handleRemove(x)} />
      </TableRowColumn>
    </TableRow>
  );
}

class Grid extends Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
    // console.log("constructor", this);
  }
  render() {
    // console.log("render", this);
    return (
      <Table fixedHeader={true} selectable={true}>
        >
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            {this.props.header.map(
              (x, i) =>
                x.name === "ID" ? (
                  <TableHeaderColumn
                    style={{ fontWeight: "bold", width: 60 }}
                    key={`thc-${i}`}
                  >
                    {x.name}
                  </TableHeaderColumn>
                ) : (
                  <TableHeaderColumn
                    style={{ fontWeight: "bold" }}
                    key={`thc-${i}`}
                  >
                    {x.name}
                  </TableHeaderColumn>
                )
            )}
            <TableHeaderColumn key={`thc-edit`} style={{ width: 60 }} />
            <TableHeaderColumn key={`thc-remove`} style={{ width: 60 }} />
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.props.data.map((x, i) =>
            row(
              x,
              i,
              this.props.header,
              this.props.handleEdit,
              this.props.handleRemove
            )
          )}
        </TableBody>
      </Table>
    );
  }
}

export default Grid;
