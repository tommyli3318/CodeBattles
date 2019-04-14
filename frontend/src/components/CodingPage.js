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

//Alerts
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
        snackBarOpen: false,
        editorReadOnly: true,
        alertOpen: false,
        alertSuccessOrFailure: '',
        alertMessage: ''
    }

    alertHandleClickOpen = () => {
      this.setState({ alertOpen: true });
    };
  
    alertHandleClose = () => {
      this.setState({ alertOpen: false });
    };

    infinitePost = () => {
      var p1 = ''
      var p2 = ''
      
      axios.post(`${'https://cors-anywhere.herokuapp.com/'}https://741zh4iv3j.execute-api.us-east-1.amazonaws.com/default/postSession`, 
      {"roomID":this.props.roomID})
      .then(res => {
        console.log(res)
        const body = res.data["body"]
        p1 = body["p1ready"]
        p2 = body["p2ready"]

        if (p1===true && p2===true){
          this.setState({editorReadOnly: false})
          return this.stopWatchRef.current.startTimer()
        } 
        else{
          console.log(p1)
          console.log(p2)
          window.setTimeout(this.infinitePost, 1000);
        }
      });
    
      } 


    startSession = (e) => {
      e.preventDefault();
      console.log('POST Ready to backend to start coding')
      var p1 = '';
      var p2 = '';
      var data = ''
      
      axios.post(`${'https://cors-anywhere.herokuapp.com/'}https://741zh4iv3j.execute-api.us-east-1.amazonaws.com/default/postSession`, 
          {"roomID": this.props.roomID})
          .then(res => {
            console.log(res);
            
            const problemInfo = res.data["body"];
            
            p1 = problemInfo["p1ready"]
            p2 = problemInfo["p2ready"]

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

              this.setState({promptID: problemInfo["problem"]["problemID"]})
              this.setState({std_in: problemInfo["problem"]["std_in"]})
              this.setState({std_out: problemInfo["problem"]["std_out"]})
              this.setState({prompt: (problemInfo["problem"]["prompt"] + "\n" + problemInfo["problem"]["examples"])}) 
  
              if (p1 === false || p2 === false){
                this.infinitePost();
                return
              }
             
              this.stopWatchRef.current.startTimer()
            }); 
          });
  };


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


//           compile_output: null
// memory: 6020
// message: "Exited with error status 1"
// status: {id: 11, description: "Runtime Error (NZEC)"}
// stderr: "  File "main.py", line 2↵    ↵              ^↵SyntaxError: unexpected EOF while parsing↵"
// stdout: null
// time: "0.028"
// token: "138fe057-a8f0-44b5-b757-c994554e54aa"
        axios.post("https://api.judge0.com/submissions?wait=true", 
        judgeParams)
            .then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({alertMessage: res.data["stderr"]})
            })

        this.alertHandleClickOpen()
    }


  render() {
    const {startValue} = this.state;
    const {mode} = this.state;
    const { classes } = this.props;
    const {prompt} = this.state;
    const {editorReadOnly} = this.state;
    
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
                          autocorrect: true,
                          readOnly: editorReadOnly
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

                <Dialog
                  open={this.state.alertOpen}
                  onClose={this.alertHandleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Success/Failure?"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Error Message
                    </DialogContentText>
                  </DialogContent>
                </Dialog>

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