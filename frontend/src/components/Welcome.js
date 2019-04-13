import React, { Component } from 'react'

//MUI
import {MuiThemeProvider} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

export class Welcome extends Component {

    continue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider>
          <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                    Coding Battles
                    </Typography>
                </Toolbar>
            </AppBar>
            <Button 
                variant="contained" 
                color="secondary" 
                className={classes.button}
                onClick = {this.continue}>
                Join a Session
            </Button>
            <Button 
                variant="contained" 
                color="primary" 
                className={classes.button} 
                onClick = {this.continue}>
                Make a Session
            </Button>
          </React.Fragment>
      </MuiThemeProvider>
    )
  }
}

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

Welcome.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

export default withStyles(styles)(Welcome);
