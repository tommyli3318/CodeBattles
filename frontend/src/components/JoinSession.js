import React, { Component } from 'react'

//MUI
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import blue from '@material-ui/core/colors/blue.js';
import grey from '@material-ui/core/colors/grey.js';

export class JoinSession extends Component {
     state = {
        sessionKey: ''
    }

    goBack = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    continue = (e) => {
        e.preventDefault();
        //POST key user entered to backend
        console.log(this.state.sessionKey)
        this.props.nextStepCode();
    }
    
    handleChange = () => event => {
        this.setState({ sessionKey: event.target.value });
    };

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme = {theme}>
         <React.Fragment>
            <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                        Coding Battles
                        </Typography>
                    </Toolbar>
            </AppBar>
            <TextField
                id="standard-name"
                className={classes.textField}
                defaultValue='Enter Session Key'
                onChange={this.handleChange()}
                margin="normal"
            />
            <Button 
                variant="contained" 
                color="secondary" 
                className={classes.button}
                onClick = {this.goBack}>
                Back
            </Button>
            <Button 
                variant="contained" 
                color="primary" 
                className={classes.button} 
                onClick = {this.continue}>
                Start Coding!
            </Button>
         </React.Fragment>
      </MuiThemeProvider>
    )
  }
}

const theme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: grey
    },
});

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    }
  });

JoinSession.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(JoinSession)
