import React, { Component } from 'react'

//MUI
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import blue from '@material-ui/core/colors/blue.js';
import grey from '@material-ui/core/colors/grey.js';
import { generateKeyPair } from 'crypto';

export class Welcome extends Component {

    continueteCreate = (e) => {
        e.preventDefault();
        this.props.nextStepCreate();
    }

    continueteJoin = (e) => {
        e.preventDefault();
        this.props.nextStepJoin();
    }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme = {theme}>
          <CssBaseline></CssBaseline>
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
                onClick = {this.continueteJoin}>
                Join a Session
            </Button>
            <Button 
                variant="contained" 
                color="secondary" 
                className={classes.button} 
                onClick = {this.continueteCreate}>
                Make a Session
            </Button>
          </React.Fragment>
      </MuiThemeProvider>
    )
  }
}

const theme = createMuiTheme({
    palette: {
      primary: {
          main: '#0d47a1'
      },
      secondary: {
          main: '#1e88e5'
      },
    },
});

const styles = theme => ({
    button: {
      marginTop: 450,
      marginLeft: 15,
      marginRight: 15,
    },
    input: {
      display: 'none',
    },
  });

Welcome.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

export default withStyles(styles)(Welcome);
