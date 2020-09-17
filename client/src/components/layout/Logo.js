import * as React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles, } from '@material-ui/core/styles';


const useStyles = makeStyles({
  contentPlacing: {
    flexFlow: 'column wrap',
    flexGrow: '1',
    padding: '20px'

  },
  picStyles: {
    width: '100%',
    alignSelf:'center',
    borderRadius: '50px'
  },
});

export default function Logo() {
  const classes = useStyles();

  return (
    <div style={{ width: '100%' }}>
      <Box display='flex' className={classes.contentPlacing}>
        <img
          src='/img/banner1.png
          '
          alt='pomokan logo'
          className={classes.picStyles}
        />
      </Box>
    </div>
  );
}