import React from "react";
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
    <TableRow key={`tr-${i}`} onClick={() => handleEdit(i)}>
      {header.map((y, k) => (
        <TableRowColumn key={`trc-${k}`}>{x[y.prop]}</TableRowColumn>
      ))}
      <TableRowColumn>
        <EditIcon onClick={() => handleEdit(i)} />
      </TableRowColumn>
      <TableRowColumn>
        <RemoveIcon onClick={() => handleRemove(i)} />
      </TableRowColumn>
    </TableRow>
  );
}

function Grid(props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {props.header.map((x, i) => (
            <TableHeaderColumn key={`thc-${i}`}>{x.name}</TableHeaderColumn>
          ))}
          <TableHeaderColumn />
          <TableHeaderColumn />
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.data.map((x, i) =>
          row(x, i, props.header, props.handleEdit, props.handleRemove)
        )}
      </TableBody>
    </Table>
  );
}

export default Grid;
