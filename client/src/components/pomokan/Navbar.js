import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Logo2 from './Logo2';

const useStyles = makeStyles({
  root: {
    width: '100%',
    backgroundColor: '#96AB36',
  },
  mainBtn: {
    backgroundColor: '#96CCB9',
    fontFamily: 'Oswald, sans-serif',
    color: '#000',
    margin: '5px',
    width: '20%',
  },
  img:{
      width: '20%',
    display:'flex',
    justifyContent:'flex-end'
  }
});

const Navbar = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar className={classes.root}>
        <Toolbar>
          <Logo2 />
          <Button component='a' href='/' className={classes.mainBtn}>
            home
          </Button>
          <Button className={classes.mainBtn}>create a board</Button>
          <Button className={classes.mainBtn}>my tasks</Button>
          <Button className={classes.mainBtn}>add a timer</Button>
          <img
            src='/img/pomomountains.png'
            className={classes.img}
            alt='pomomountains'
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
