import React, { Component } from 'react'

//import all other components to display
import Welcome from './Welcome'
import MakeSession from './MakeSession'
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
               <Welcome
               nextStep = {this.nextStep}
               ></Welcome>
            )
        case 1:
            return (
               <MakeSession
               prevStep = {this.prevStep}
               nextStep = {this.nextStep}
               ></MakeSession>
            )
        case 2:
            return (
               <CodingPage
               prevStep = {this.prevStep}
               ></CodingPage>
            )
    }
  }
}

export default ViewSelector
