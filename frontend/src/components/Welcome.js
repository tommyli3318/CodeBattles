import React, { Component } from 'react'
import logo from '../CodeBattle-02.png'

//MUI
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

export class Welcome extends Component {

    continueCreate = (e) => {
        e.preventDefault();
        this.props.nextStepCreate();
    }

    continueJoin = (e) => {
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
                    Code Battle
                    </Typography>
                </Toolbar>
            </AppBar>
            <img src = {logo} className = 'App-logo' alt = 'logo'/>
            <Button 
                variant="contained" 
                color="primary" 
                className={classes.button}
                onClick = {this.continueJoin}>
                Join a Session
            </Button>
            <Button 
                variant="contained" 
                color="secondary" 
                className={classes.button} 
                onClick = {this.continueCreate}>
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
          main: '#6a1b9a'
      },
      secondary: {
          main: '#000000'
      },
    },
});

const styles = theme => ({
    button: {
      marginTop: 250,
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
