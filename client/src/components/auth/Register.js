import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(5),
    },
    registerBackground:{
        backgroundColor: '#96CCB9',
        height: '100vh',
    },
    
  },
}));

const Register = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={3} className={classes.registerBackground}>
      <form className={classes.root} noValidate autoComplete='off'>
        <TextField
          label='name'
          variant='outlined'
          required
          type='name'
          name='name'
        />
        <TextField
          label='email'
          variant='outlined'
          required
          type='email'
          name='email'
        />
        <TextField
          label='password'
          variant='outlined'
          required
          type='password'
          name='password'
        />
        <TextField
          label='confirm password'
          variant='outlined'
          required
          type='password'
          name='password2'
        />
      </form>
    </Grid>
  );
};

export default Register;
