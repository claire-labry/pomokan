import * as React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles, } from '@material-ui/core/styles';


const useStyles = makeStyles({
  contentPlacing: {
    flexFlow: 'column wrap',
    flexGrow: '1',
    height: '100vh',

  },
  picStyles: {
    width: '70%',
    alignSelf:'center'

  },
});

export default function Logo() {
  const classes = useStyles();

  return (
    <div style={{ width: '100%' }}>
      <Box display='flex' className={classes.contentPlacing}>
        <img
          src='./img/banner.png
          '
          alt='pomokan logo'
          className={classes.picStyles}
        />
      </Box>
    </div>
  );
}