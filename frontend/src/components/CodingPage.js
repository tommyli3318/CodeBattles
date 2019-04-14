import '../App.css';
import React, { Component } from 'react'
import StopWatch from './StopWatch'
import SimpleSnackbar from './SimpleSnackbar'
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
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

//Code Mirror
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
        submission: '',
        status: 'notReady',
        prompt: '',
        promptID: -1,
        snackBarOpen: false
    }

    startSession = (e) => {
      e.preventDefault();
      console.log('POST Ready to backend to start coding')
      var p1 = '';
      var data = ''
      
      axios.post(`${'https://cors-anywhere.herokuapp.com/'}https://741zh4iv3j.execute-api.us-east-1.amazonaws.com/default/postSession`, 
          {"roomID": this.props.roomID})
          .then(res => {
            console.log(res);
            
            const problemInfo = res.data["body"];
            
            p1 = problemInfo["p1ready"]

            if (p1){
              data = {
                "roomID": this.props.roomID,
                "p2ready": true
              }
            } else {
              data = {
                "roomID": this.props.roomID,
                "p1ready": true
              }
            }

            axios.post(`${'https://cors-anywhere.herokuapp.com/'}https://741zh4iv3j.execute-api.us-east-1.amazonaws.com/default/postSession`, 
                data)
              .then(res => {
                console.log(res);
            });
           
            this.setState({prompt: (problemInfo["problem"]["prompt"] + "\n" + problemInfo["problem"]["examples"])})
            this.setState({promptID: problemInfo["problem"]["problemID"]})
            this.setState({std_in: problemInfo["problem"]["std_in"]})
            this.setState({std_out: problemInfo["problem"]["std_out"]})
          });

      this.stopWatchRef.current.startTimer()
  }

    submit = (e) => {
        e.preventDefault();
        console.log('POST Code Submission')
        const {submission} = this.state;
        const{std_in} = this.state;
        const {std_out} = this.state

        const judgeParams = {
            "source_code": submission,
            "language_id": "34", 
            "number_of_runs": "1",
            "stdin": std_in,
            "expected_output": std_out,
            "cpu_time_limit": "2",
            "cpu_extra_time": "0.5",
            "wall_time_limit": "5",
            "memory_limit": "128000",
            "stack_limit": "64000",
            "max_processes_and_or_threads": "30",
            "enable_per_process_and_thread_time_limit": "false",
            "enable_per_process_and_thread_memory_limit": "true",
            "max_file_size": "1024"
          }
      
        axios.post("https://api.judge0.com/submissions?wait=true", 
        judgeParams)
            .then(res => {
            console.log(res);
            console.log(res.data);
            })

        this.setState({snackBarOpen: true})
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
                          Code Battle
                          </Typography>
                      </Toolbar>
                </AppBar>
                
                <Grid container>
                  <Grid item sm>
                    <Paper elevation={6}>
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
                    </Paper>
                  </Grid>
                  
                  <Grid item sm>
                    <TextField
                        style = {styles.textField}
                        id="outlined-read-only-input"
                        value= {prompt}
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                            multiline: true,
                            rows: 12
                        }}
                        variant="outlined"
                    />
                  </Grid>
                </Grid>
                
                <StopWatch ref = {this.stopWatchRef}></StopWatch>
                
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.button}
                    onClick = {this.startSession}>
                    Ready Up
                </Button>
                
                <Button 
                    variant="contained" 
                    color="secondary" 
                    className={classes.button} 
                    onClick = {this.submit}>
                    Submit
                </Button>

                <SimpleSnackbar open = {this.state.snackBarOpen}></SimpleSnackbar>
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
        main: '#1e88e5'
    },
    // background: {
    //   default: "#000000"
    // },
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


// getPrompt = () => {
    //   console.log('GET Prompt')
    //     axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://741zh4iv3j.execute-api.us-east-1.amazonaws.com/default/getCodingProblem`)
    //         .then(res => {
    //         const problemInfo = res.data;
    //         console.log(problemInfo["std_out"])
            
    //         this.setState({prompt: (problemInfo["prompt"] + "\n" + problemInfo["examples"])})
    //         this.setState({promptID: problemInfo["problemID"]})
    //         this.setState({std_in: problemInfo["std_in"]})
    //         this.setState({std_out: problemInfo["std_out"]})
    //         })
    // }