import React, { Component } from 'react'
import StopWatch from './StopWatch'
import axios from 'axios';

//MUI
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

//Code Editor
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import blue from '@material-ui/core/colors/blue.js';
import grey from '@material-ui/core/colors/grey.js';

require('codemirror/mode/python/python');
require('codemirror/mode/javascript/javascript');

export class CodingPage extends Component {
    constructor(props) {
        super(props);
        this.stopWatchRef = React.createRef();
      }

    state = {
        startValue: "'Enter solution here.'",
        mode: 'python',
        submission: ''
    }

    submit = (e) => {
        e.preventDefault();
        
        console.log('Test GET')
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://741zh4iv3j.execute-api.us-east-1.amazonaws.com/default/getCodingProblem`)
            .then(res => {
            const codeProblem = res.data;
            console.log(codeProblem)
            console.log('GET Worked')
            })
        
        // console.log('Test POST')
        // const {submission} = this.state;
        // console.log({submission})
        // axios.post(`http://localhost:8000/api/CodeProblems/`, {submission})
        //     .then(res => {
        //     console.log(res);
        //     console.log(res.data);
        //     })
    }

    startTimer = (e) => {
      e.preventDefault();
      this.stopWatchRef.current.startTimer()
    }

  render() {
    const {startValue} = this.state;
    const {mode} = this.state;
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
                    style = {styles.textField}
                    id="outlined-read-only-input"
                    defaultValue="Prompt"
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />
                <CodeMirror
                  style = {styles.editor}
                  value= {startValue}
                  options={{
                    mode: mode,
                    theme: 'material',
                    lineNumbers: true,
                    smartIndent: true,
                    autocorrect: true
                  }}
                  onChange={(editor, data, value) => {
                    this.setState({submission: value})
                  }}
                />
                <StopWatch ref = {this.stopWatchRef}></StopWatch>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    className={classes.button}
                    onClick = {this.startTimer}>
                    Ready Up
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.button} 
                    onClick = {this.submit}>
                    Submit
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

const styles = (theme) => ({
    editor: {
        border: 1,
        height: 'auto'
    },
    textField: {
      width: 200,
      height: 100
    },
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    }
})

CodingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CodingPage)
