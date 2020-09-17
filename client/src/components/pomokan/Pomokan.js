import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Navbar from './Navbar'

const useStyles = makeStyles({
    pomokanBackground: {
      backgroundColor: '#f2e8db',
      height: '100vh',
    },
  });

const Pomokan = () => {
    const classes = useStyles();
    return (
    <>    
    <Grid container spacing={3} className={classes.pomokanBackground}>
        <Navbar />
    </Grid>  
    </>  
    )
}

export default Pomokan
