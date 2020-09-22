import React from 'react'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

export default ({ columns, rows }) => {
  return (
    <TableBody>
      {rows.map( (row, i) => (
        <TableRow key={i}>
            {columns.map( (column, j) => (
              <TableCell key={j}>
                {row[column]}
              </TableCell>
            ))}
        </TableRow>
      ))}
    </TableBody>
  )
}