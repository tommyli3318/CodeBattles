import React, { Component } from 'react'

//MUI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'

export class Welcome extends Component {

    continue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

  render() {
    return (
      <MuiThemeProvider>
          <React.Fragment>
            <AppBar title = 'Code Battles'></AppBar>
            <RaisedButton
                    label = 'Join a Session'
                    primary = {false}
                    style = {styles.button}
                    onClick = {this.continue}
            ></RaisedButton>
            <RaisedButton
                label = 'Create a Session'
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
    button: {
        margin: 15
    }
}

export default Welcome
