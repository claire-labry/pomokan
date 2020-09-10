import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Logo from '../components/Logo'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#F2F2EB',
    minHeight: '100vh',
  },
}));

function Homepage (){
  const classes = useStyles();
    return(
    <>
    <Grid container spacing={3}>
        <Grid item xs={12}>
          <Logo />
        </Grid>
      </Grid>
    </>
    )
}

export default Homepage;