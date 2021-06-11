import React from "react";
import StepWizard from "react-step-wizard";
import SelectMentor from './SelectMentor'
import Scheduling from './Scheduling'
import Confirmation from './Confirmation'
import api from '../../api'

export default class StepperBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          mentorSelected: '',
          dateSelected: '',
          timeSelected: '',
        }

        this.baseState = this.state;

        this.handleMentorChange = this.handleMentorChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
      }

      reset = () => {
        this.setState(this.baseState);
      }

      handleMentorChange = (mentorSelected) => {
        // handles mentor change
        this.setState({ mentorSelected });
      }

      handleDateChange = (dateSelected) => {
        // handles date change
        this.setState({ dateSelected });
      }

      handleTimeChange = (timeSelected) => {
        //handles time chage
        this.setState({ timeSelected });
      }


      fetchData = async()=> {
        // fetches the appointment data from the api call
        await api.fetchAppointments()
        .then(response => this.setState({data: response.data}))   
      }

      componentDidMount() {
        this.fetchData()
      }

      componentDidUpdate() {
        console.log("state updates: ---------------")
        console.log("data, mentorSelected, dateSelected, timeSelected", 
        this.state.data, this.state.mentorSelected, this.state.dateSelected, this.state.timeSelected)
      }

      render() {
          const {data, mentorSelected, dateSelected} = this.state
          return(
          <div className="App">
            <StepWizard>
                <SelectMentor
                    data={data} 
                    mentorSelected={mentorSelected}
                    onMentorChange={this.handleMentorChange}
                />
                <Scheduling 
                    data={data} 
                    mentorSelected={mentorSelected}
                    dateSelected={dateSelected}
                    onDateChange={this.handleDateChange}
                    onTimeChange={this.handleTimeChange}
                />
                <Confirmation 
                    dateSelected={this.state.dateSelected} 
                    timeSelected={this.state.timeSelected} 
                    mentorSelected={this.state.mentorSelected}
                />
            </StepWizard>
          </div>
        );
      }
}