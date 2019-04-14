import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import Grid from '@material-ui/core/Grid';

const styles = {
 greyAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: grey[500],
  },
  greenAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[500],
  },
};

export class Avatars extends Component {
state = {
    step: 0
}

changeColor = () => {
    
}

 render() {
    const { classes } = this.props;
    const {step} = this.state;
  
  switch(step){
    case 0:
        return (
            <Grid container justify="left" alignItems="left">
                <Avatar className={classes.greyAvatar}>1</Avatar>
                <Avatar className={classes.greyAvatar}>2</Avatar>
            </Grid>
        )
    case 1:
        return (
            <Grid container justify="left" alignItems="left">
                <Avatar className={classes.greenAvatar}>1</Avatar>
                <Avatar className={classes.greyAvatar}>2</Avatar>
            </Grid>
        )
    case 2:
        return (
            <Grid container justify="left" alignItems="left">
                <Avatar className={classes.greyAvatar}>1</Avatar>
                <Avatar className={classes.greenAvatar}>2</Avatar>
            </Grid>
        )
    case 3:
        return (
            <Grid container justify="left" alignItems="left">
                <Avatar className={classes.greenAvatar}>1</Avatar>
                <Avatar className={classes.greenAvatar}>2</Avatar>
            </Grid>
        )
    }
 }

}
Avatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Avatars);