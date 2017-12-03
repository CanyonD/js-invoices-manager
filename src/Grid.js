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
    <TableRow key={`tr-${i}`}>
      {header.map(
        (y, k) =>
        y.prop === "id"
            ? <TableRowColumn style={{ width: 60 }} key={`trc-${k}`}>
                {x[y.prop]}
              </TableRowColumn>
            : <TableRowColumn key={`trc-${k}`}>
                {x[y.prop]}
              </TableRowColumn>
      )}
      <TableRowColumn key={`tr-edit-${i}`} style={{ width: 60 }}>
        <EditIcon onClick={() => handleEdit(i)} />
      </TableRowColumn>
      <TableRowColumn key={`tr-remove-${i}`} style={{ width: 60 }}>
        <RemoveIcon onClick={() => handleRemove(i)} />
      </TableRowColumn>
    </TableRow>
  );
}

function Grid(props) {
  return (
    <Table fixedHeader={true} selectable={true}>
      >
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          {props.header.map(
            (x, i) =>
              x.name === "ID"
                ? <TableHeaderColumn style={{ width: 60 }} key={`thc-${i}`}>
                    {x.name}
                  </TableHeaderColumn>
                : <TableHeaderColumn key={`thc-${i}`}>
                    {x.name}
                  </TableHeaderColumn>
          )}
          <TableHeaderColumn key={`thc-edit`} style={{ width: 60 }} />
          <TableHeaderColumn key={`thc-remove`} style={{ width: 60 }} />
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {props.data.map((x, i) =>
          row(x, i, props.header, props.handleEdit, props.handleRemove)
        )}
      </TableBody>
    </Table>
  );
}

export default Grid;
