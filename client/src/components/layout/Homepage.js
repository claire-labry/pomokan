import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import Logo from './Logo';

const useStyles = makeStyles({
  registerBtn: {
    backgroundColor: '#96AB36',
    fontFamily: 'Oswald, sans-serif',
    color: '#737373',
    margin: '5px',
  },
  loginBtn: {
    backgroundColor: '#96CCB9',
    fontFamily: 'Oswald, sans-serif',
    color: '#737373',
    margin: '5px',
  },
  btnPlacing:{
    width:'20%',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: '#e9e2c9',
    borderRadius:'50px',
    padding: '20px',
  },
  homepageBackground: {
    backgroundColor: '#c7998c',
    height: '100vh',
  },
});

function Homepage() {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={3} className={classes.homepageBackground}>
        <Grid item xs={12}>
          <Logo />
          <div className={classes.btnPlacing}>
          <Button variant="contained" href='/register'className={classes.registerBtn}> Register </Button>
          <Button variant="contained" href='/login'className={classes.loginBtn}> Login </Button>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Homepage;
