import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'

//Text Editor
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import axios from 'axios';
require('codemirror/mode/python/python');
require('codemirror/mode/javascript/javascript');

export class CodingPage extends Component {
    constructor(props) {
        super(props);
        this.editorRef = React.createRef();
      }

    state = {
        startValue: 'Enter solution here.',
        mode: 'python',
    }

    continue = (e) => {
        e.preventDefault();
        
        console.log('Test GET')
        axios.get(`http://localhost:8000/api/CodeProblems/`)
            .then(res => {
            const codeProblem = res.data;
            console.log(codeProblem)
            console.log('GET Worked')
            })
        
        console.log('Test POST')
        const {submission} = this.state;
        axios.post(`http://localhost:8000/api/CodeProblems/`, {submission})
            .then(res => {
            console.log(res);
            console.log(res.data);
            })
    }

  render() {
    const {startValue} = this.state;
    const {mode} = this.state;

    return (
        <MuiThemeProvider>
            <React.Fragment>
                <AppBar title = 'Code Mirror'></AppBar>
                <CodeMirror
                  ref = {this.editorRef}
                  style = {styles.editor}
                  value= {startValue}
                  options={{
                    mode: {mode},
                    theme: 'material',
                    lineNumbers: true,
                    smartIndent: true,
                    autocorrect: true
                  }}
                  onChange={(editor, data, value) => {
                    this.setState({submission: value})
                  }}
                />
                <RaisedButton
                    label = 'Submit Solution'
                    primary = {true}
                    style = {styles.button}
                    onClick = {this.continue}
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
    }
}

export default CodingPage
