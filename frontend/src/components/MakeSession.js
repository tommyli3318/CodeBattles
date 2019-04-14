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
import CssBaseline from '@material-ui/core/CssBaseline';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';

import uuid from 'uuid'
import axios from 'axios';

export class MakeSession extends Component {
    state = {
        roomID: uuid().substring(0,6)
    }

    goBack = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    continue = (e) => {
        e.preventDefault();
       
        console.log('POST Session Key')
        const {roomID} = this.state;
        
        this.props.setRoomID(roomID)

        axios.post(`${'https://cors-anywhere.herokuapp.com/'}https://741zh4iv3j.execute-api.us-east-1.amazonaws.com/default/postSessionKey`, 
            {roomID})
            .then(res => {
            console.log(res);
            })
        
        this.props.nextStepCode();
    }

  render() {
    const { classes } = this.props;
    const {roomID} = this.state;
    
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
                
                <InputLabel
                    className={classes.label}
                    >Session ID
                </InputLabel>
                
                <Grid container>
                    <Grid item sm>
                        <TextField
                            style = {styles.textField}
                            id="outlined-read-only-input"
                            defaultValue= {roomID}
                            margin="normal"
                            InputProps={{
                                classes:{
                                    readOnly: true,
                                }
                            }}
                        />
                    </Grid>
                </Grid>
                    
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.button}
                    onClick = {this.goBack}>
                    Back
                </Button>

                <Button 
                    variant="contained" 
                    color="secondary" 
                    className={classes.button} 
                    onClick = {this.continue}>
                    Start Coding
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
    label: {
        margin: 50
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
    button: {
        marginTop: 375,
        marginLeft: 15,
        marginRight: 15
    },
    input: {
        display: 'none',
    }
  });

MakeSession.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MakeSession);
