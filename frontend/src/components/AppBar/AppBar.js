import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
}))

export default () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h5" noWrap>
            Teste React/Node
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </React.Fragment>
  )
}