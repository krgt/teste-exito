import React from 'react'
import AppBar from './components/AppBar/AppBar'
import Table from './components/Table/Table'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import SnackbarProvider from 'react-simple-snackbar'

const useStyles = makeStyles( theme => ({
  container: {
    boxSizing: 'border-box',
    height: 'calc(100vh - 64px)',
    backgroundColor: '#f5f5f5',
    padding: "20px"
  }
}))

function App() {
  const classes = useStyles()
  return (
    <React.Fragment>
      <CssBaseline>
        <SnackbarProvider>
          <AppBar />
          <Box display="flex" className={classes.container}>
            <Table />
          </Box>
        </SnackbarProvider>
      </CssBaseline>
    </React.Fragment>
  )
}

export default App
