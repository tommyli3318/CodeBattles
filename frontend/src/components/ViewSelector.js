import React, { Component } from 'react'

//import all other components to display
import Welcome from './Welcome'
import MakeSession from './MakeSession'
import CodingPage from './CodingPage'
import JoinSession from './JoinSession'

export class ViewSelector extends Component {
    state = {
        step: 0,
        roomID: -1
    }

    setRoomID = (id) => {
        this.setState({
            roomID: id
        })
    }

    nextStepCreate = () => {
        this.setState({
            step: 1
        })
    }

    nextStepJoin = () => {
        this.setState({
            step: 2
        })
    }

    nextStepCode = () => {
        this.setState({
            step: 3
        })
    }

    prevStep = () => {
        this.setState({
            step: 0
        })
    }

  render() {
    const {step} = this.state;

    switch(step){
        case 0:
            return (
               <Welcome
               nextStepCreate = {this.nextStepCreate}
               nextStepJoin = {this.nextStepJoin}
               ></Welcome>
            )
        case 1:
            return (
               <MakeSession
               prevStep = {this.prevStep}
               nextStepCode = {this.nextStepCode}
               setRoomID = {this.setRoomID}
               ></MakeSession>
            )
        case 2:
            return (
               <JoinSession
               prevStep = {this.prevStep}
               nextStepCode = {this.nextStepCode}
               setRoomID = {this.setRoomID}
               ></JoinSession>
            )
        case 3:
            return (
               <CodingPage
               prevStep = {this.prevStep}
               roomID = {this.state.roomID}
               ></CodingPage>
            )
    }
  }
}

export default ViewSelector
