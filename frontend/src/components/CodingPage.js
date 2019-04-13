import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
require('codemirror/mode/python/python');
require('codemirror/mode/javascript/javascript');

export class CodingPage extends Component {
   
  render() {
    return (
        <MuiThemeProvider>
            <React.Fragment>
                <AppBar title = 'Code Mirror'></AppBar>
                <CodeMirror
                  style = {styles.editor}
                  value='Enter solution here!'
                  options={{
                    mode: 'python',
                    theme: 'material',
                    lineNumbers: true,
                    smartIndent: true,
                    autocorrect: true
                  }}
                  onChange={(editor, data, value) => {
                  }}
                />
            </React.Fragment>
        </MuiThemeProvider>
    )
  }
}

const styles = {
  editor: {
      margin: 100,
      padding: 20
  }
}

export default CodingPage
