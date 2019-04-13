import React, { Component } from 'react'

//import all other components to display
import CodingPage from './CodingPage'

export class ViewSelector extends Component {
    state = {
        step: 0
    }

    nextStep = () => {
        const {step} = this.state;
        this.setState({
            step: step + 1
        })
    }

    prevStep = () => {
        const {step} = this.state;
        this.setState({
            step: step - 1
        })
    }

  render() {
    const {step} = this.state;

    switch(step){
        case 0:
            return (
               <CodingPage
               prevStep = {this.prevStep}
               ></CodingPage>
            )
    }
  }
}

export default ViewSelector
