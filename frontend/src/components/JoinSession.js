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
import Grid from '@material-ui/core/Grid';

import axios from 'axios'

export class JoinSession extends Component {
     state = {
        roomID: ''
    }

    goBack = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }
//31bdd7
    continue = (e) => {
        e.preventDefault();
        console.log('POST Key User Entered')
        const {roomID} = this.state;
         axios.post(`${'https://cors-anywhere.herokuapp.com/'}https://741zh4iv3j.execute-api.us-east-1.amazonaws.com/default/matchSessionKey`, 
            {"roomID": roomID})
            
            .then(res => {
            //console.log(res.data);

            if (res.data === "true"){
              const data = {
                "roomID": roomID,
                "bothjoined": true
              }
              axios.post(`${'https://cors-anywhere.herokuapp.com/'}https://741zh4iv3j.execute-api.us-east-1.amazonaws.com/default/postSession`, 
              data)

              this.props.setRoomID(roomID)
              this.props.nextStepCode();
            
            }
            })
    }
    
    handleChange = () => event => {
        this.setState({ roomID: event.target.value });
    };

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
            
            <Grid container>
              <Grid item sm>
                <TextField
                    id="standard-name"
                    className={classes.textField}
                    defaultValue='Enter Session Key'
                    onChange={this.handleChange()}
                    margin="normal"
                />
                </Grid>
            </Grid>
            
            <Button 
                variant="contained" 
                color="secondary" 
                className={classes.button} 
                onClick = {this.continue}>
                Start Coding
            </Button>

            <Button 
                variant="contained" 
                color="primary" 
                className={classes.button}
                onClick = {this.goBack}>
                Back
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
    textField: {
      marginTop: 30,
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
      marginTop: 390,
      marginLeft: 15,
      marginRight: 15
    },
    input: {
        display: 'none',
    }
  });

JoinSession.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JoinSession)
