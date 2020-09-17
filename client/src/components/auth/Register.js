import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      width: '20%',
      margin: 'auto',
      padding:'5px',
      width: '20ch',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFE251',
      padding: '10px'
    },
  },
}));

const Register = () => {
  const classes = useStyles();
  return (
    <div>
      <form className={classes.root} noValidate autoComplete='off'>
        <TextField
          id='outlined-basic'
          label='name'
          variant='outlined'
          required
          type='name'
          name='name'
        />
        <TextField
          id='outlined-basic'
          label='email'
          variant='outlined'
          required
          type='email'
          name='email'
        />
        <TextField
          id='outlined-basic'
          label='password'
          variant='outlined'
          required
          type='password'
          name='password'
        />
        <TextField
          id='outlined-basic'
          label='confirm password'
          variant='outlined'
          required
          type='password'
          name='password2'
        />
        {/* <TextField id='outlined-basic' label='gravatar' variant='outlined' required input type='file' /> */}
      </form>
    </div>
  );
};

export default Register;
