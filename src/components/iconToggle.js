import React from 'react';
import PropTypes from 'prop-types';

import { IconButton, Button, Typography } from '@material-ui/core';
import {Settings} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import * as PXBColors from '@pxblue/colors';


const IconToggle = ({iconComponent, label, active, onClick, style, classes}) => {
    let color = active ? PXBColors.blue['500'] : PXBColors.black['500'];
    return (
      <div className={classes.button} style={{color: color}} onClick={onClick ? ()=> onClick() : null}>
        <IconButton color="inherit" disableRipple={true}>
          {iconComponent}
        </IconButton>
        <Typography variant={'subtitle2'} color="inherit">{label}</Typography>
      </div>
    );
}

IconToggle.propTypes = {
  onPress: PropTypes.func,
  active: PropTypes.bool,
  label: PropTypes.string,
  iconComponent: PropTypes.element.isRequired
}

const styles = theme => ({
  button: {
    cursor: 'pointer',
    textAlign: 'center',
    minWidth: theme.spacing.unit * 8,
    margin: theme.spacing.unit
  }
});

export default withStyles(styles)(IconToggle);