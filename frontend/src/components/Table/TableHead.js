import React from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

export default ({ columns, className }) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map( (column, i)=> (
          <TableCell className={className} key={i}>{column}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}