import React, { Component } from 'react';
import './App.css';
import ViewSelector from './components/ViewSelector'

class App extends Component {
  render() {
    return (
      <div className="App">
       <ViewSelector></ViewSelector>
      </div>
    );
  }
}

export default App;
