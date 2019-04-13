import React, { Component } from 'react'
import StopWatch from './StopWatch'
import axios from 'axios';

//MUI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';

//Code Editor
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

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
    
    return (
        <MuiThemeProvider>
            <React.Fragment>
                <AppBar title = 'Code Battles'></AppBar>
                <TextField
                  style = {styles.textField}
                  id="standard-textarea"
                  label="With placeholder multiline"
                  placeholder="Prompt"
                  multiline ='true'
                  margin="small"
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
                <RaisedButton
                    label = 'Ready Up'
                    primary = {false}
                    style = {styles.button}
                    onClick = {this.startTimer}
                ></RaisedButton>
                <RaisedButton
                    label = 'Submit Solution'
                    primary = {true}
                    style = {styles.button}
                    onClick = {this.submit}
                ></RaisedButton>
            </React.Fragment>
        </MuiThemeProvider>
    )
  }
}

const styles = {
    editor: {
        border: 1,
        height: 'auto'
    },
    button: {
        margin: 15
    },
    textField: {
      width: 200,
      height: 100
    },
}

export default CodingPage
