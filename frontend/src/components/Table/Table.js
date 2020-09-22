import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/AddCircle'
import { useSnackbar } from 'react-simple-snackbar'

import TableHead from './TableHead'
import TableBody from './TableBody'
import RegisterUserDialog from '../RegisterUserDialog/RegisterUserDialog'

import config from '../../config.json'

const useStyles = makeStyles({
  tableContainer: {
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column'
  },
  table: {
    display: 'block',
    overflow: 'auto'
  },
  blackText: {
    color: 'black'
  }
});

export default function BasicTable() {
  const classes = useStyles();
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [openSuccessSnackbar, ] = useSnackbar({
    style: {
      backgroundColor: '#4caf50',
  }})
  const [openFailureSnackbar, ] = useSnackbar({
    style: {
      backgroundColor: '#f44336',
  }})

  useEffect( () => {
    fetch(config.api.usuarios)
    .then( res => res.json() )
    .then( res => {
      setColumns(Object.keys(res[0]))
      setRows(res)
      openSuccessSnackbar('Usuários carregados com sucesso.')
    })
    .catch( err => {
      openFailureSnackbar('Erro ao carregar usuários.')
    })
  }, [])

  const openDialog = () => {
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
  };

  const addRow = newRow => setRows(rows => [...rows, newRow])

  return (
    <React.Fragment>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Toolbar>
          <Typography className={classes.blackText} variant="h6" >
            Tabela de Usuários
          </Typography>
          <Tooltip title="Adicionar Usuário">
          <IconButton color="primary" onClick={openDialog} aria-label="adicionar usuário">
            <AddIcon style={{fontSize: "48px"}}/>
          </IconButton>
        </Tooltip>
        </Toolbar>
        <Table size="small" className={classes.table} aria-label="simple table">
          <TableHead columns={columns} className={classes.blackText} />
          <TableBody columns={columns} rows={rows} />
        </Table>
      </TableContainer>
      <RegisterUserDialog open={dialogOpen} handleClose={closeDialog} addRow={addRow} />
    </React.Fragment>
  )
}
