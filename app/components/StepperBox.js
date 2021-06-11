import React from "react";
import StepWizard from "react-step-wizard";
import SelectMentor from './SelectMentor'
import Scheduling from './Scheduling'
import Confirmation from './Confirmation'

export default class StepperBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          mentorSelected: '',
          dateSelected: '',
          timeSelected: ''
        }

        this.handleMentorChange = this.handleMentorChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
      }

      handleMentorChange = (mentorSelected) => {
        this.setState({ mentorSelected });
      }

      handleDateChange = (dateSelected) => {
        this.setState({ dateSelected });
      }

      handleTimeChange = (timeSelected) => {
        this.setState({ timeSelected });
      }

      fetchData = ()=> {
        const url = "https://private-anon-6a5c3c80a7-cfcalendar.apiary-mock.com/mentors/1/agenda"
            fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({data})});
                
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