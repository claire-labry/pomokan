import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Navbar from './Navbar'
import { DndProvider } from 'react-dnd';
import { HTML5Backend }  from 'react-dnd-html5-backend'

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
    <DndProvider backend={HTML5Backend}>
    <Grid container spacing={3} className={classes.pomokanBackground}>
        <Navbar />
    </Grid>  
    </DndProvider>  
    </>
    )
}

export default Pomokan
