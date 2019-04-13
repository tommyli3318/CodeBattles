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

import uuid from 'uuid'

export class MakeSession extends Component {
    state = {
        sessID: uuid()
    }

    goBack = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    continue = (e) => {
        e.preventDefault();
        this.props.nextStepCode();
    }

  render() {
    const { classes } = this.props;
    const {sessID} = this.state;
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
                    style = {styles.textField}
                    label='Session Key'
                    id="outlined-read-only-input"
                    defaultValue= {sessID}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
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

MakeSession.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MakeSession);
