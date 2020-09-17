import * as React from 'react';
import { makeStyles, } from '@material-ui/core/styles';


const useStyles = makeStyles({
  picStyles: {
    height:'80px',
    margin: '0',
    padding: '10px',
  },
});

export default function Logo() {
  const classes = useStyles();

  return (
    <div style={{ width: '100%' }}>
        <img
          src='/img/Pomo-kan.png
          '
          alt='pomokan logo'
          className={classes.picStyles}
        />
    </div>
  );
}