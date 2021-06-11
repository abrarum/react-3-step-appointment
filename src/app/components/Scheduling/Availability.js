import React from 'react';
import api from '../../../api'

export default class Availability extends React.Component {
    constructor(props){
        super(props);

        this.handleTimeSelect = this.handleTimeSelect.bind(this);
    }

    appointmentExists = async(selectedTime) => {
        console.log("inside appointmentexists")
        return await api.getAppointmentByName(this.props.mentorSelected).then(res => {
            if (res) {
                let date_time = res.data.data.date_time
                let exists = date_time.some(i => i.date === this.props.dateSelected && i.time.some(t => t === selectedTime))
                console.log("exists vall", exists)
                return exists
            } else {
                console.log("error")
                return false
            }
        }).catch(err => {
            console.log("err in catch", err)
            return false
        })
        
    }

    handleTimeSelect = (e) => {
        this.props.onTimeChange(e.target.textContent)

        this.appointmentExists(e.target.textContent).then(exists => {
            exists ? window.alert("Appointment already exists.") : this.props.nextStep()
        })
    }

    timeGen = () => {
        return this.props.times.map(i => <div key={i} value={this.props.timeSelected} onClick={this.handleTimeSelect}>{i}</div>)
    }

    render() {
        //const times = this.props.times
        return(
            <div>
                {this.timeGen()}
            </div>
        )
    }
}