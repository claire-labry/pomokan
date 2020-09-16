import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Logo from '../components/Logo'

const useStyles = makeStyles({
  homepageBackground: {
    backgroundColor:'#c7998c'

  },
});

function Homepage (){
  const classes = useStyles();
    return(
    <>
    <Grid container spacing={3} className={classes.homepageBackground}>
        <Grid item xs={12}>
          <Logo />
        </Grid>
      </Grid>
    </>
    )
}

export default Homepage;