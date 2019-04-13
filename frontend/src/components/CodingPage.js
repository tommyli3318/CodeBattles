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

import CssBaseline from '@material-ui/core/CssBaseline';
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
        submission: '',
        status: 'notReady',
        prompt: ''
    }

    componentDidMount(){
      this.getPrompt()
    }

    getPrompt = () => {
      //GET prompt from backend
      console.log('Test GET')
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://741zh4iv3j.execute-api.us-east-1.amazonaws.com/default/getCodingProblem`)
            .then(res => {
            const codeProblem = res.data;
            console.log(codeProblem['body'])
            this.setState({prompt: codeProblem['body']})
            })
    }

    submit = (e) => {
        e.preventDefault();
        //POST code submission to Backend
        console.log('Test POST')
        const {submission} = this.state;
        axios.post(`${'https://cors-anywhere.herokuapp.com/'}https://741zh4iv3j.execute-api.us-east-1.amazonaws.com/default/checkSolution`, {submission})
            .then(res => {
            console.log(res);
            console.log(res.data);
            })
    }

    startSession = (e) => {
      e.preventDefault();
      // //POST 'Ready' to backend to start coding
      // this.setState({status: 'Ready'})
      // const {status} = this.state
      // axios.post(`${'https://cors-anywhere.herokuapp.com/'}https://741zh4iv3j.execute-api.us-east-1.amazonaws.com/default/getCodingProblem`, 
      //   {status})
      //        .then(res => {
      //        console.log(res);
      //        console.log(res.data);
      //        })
      
      this.stopWatchRef.current.startTimer()
    }

  render() {
    const {startValue} = this.state;
    const {mode} = this.state;
    const { classes } = this.props;
    const {prompt} = this.state;
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
                <TextField
                    style = {styles.textField}
                    id="outlined-read-only-input"
                    defaultValue= {prompt}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                        multiline: true
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
                    onClick = {this.startSession}>
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
    secondary: grey,
    background: {
      default: "#000000"
    }
  },
});

const styles = (theme) => ({
    editor: {
        border: 1,
        height: 'auto',
        marginLeft: 'auto !important'
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
