import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import logo from './test-logo.jpg'

//Text Editor
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import axios from 'axios';

import StopWatch from './StopWatch'

export class WelcomePage extends Component {
    
    render() {

        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar title = 'CodeBattles'></AppBar>
                    <RaisedButton
                        label = 'Join Room'
                        primary = {false}
                        style = {styles.button}
                        onClick = {this.continue}
                    ></RaisedButton>
                    <RaisedButton
                        label = 'Create Room'
                        primary = {false}
                        style = {styles.button}
                        onClick = {this.continue}
                    ></RaisedButton>
                </React.Fragment>
            </MuiThemeProvider>
        )

    }
}

const styles = {
    button: {
        color: 'black',
        margin: 15
    }
}


export default WelcomePage