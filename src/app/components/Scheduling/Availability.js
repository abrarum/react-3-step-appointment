import React from 'react';
import api from '../../../api'

export default class Availability extends React.Component {
    constructor(props){
        super(props);

        this.handleTimeSelect = this.handleTimeSelect.bind(this);
    }

    appointmentExists = async(selectedTime) => {
        console.log("inside appointmentexists")
        await api.getAppointmentByName(this.props.mentorSelected).then(res => {
            console.log("status", res)
            if (res) {
                console.log("res.data.data", res.data.data)
                //console.log("details", appointment.date_time, selectedTime, this.props.dateSelected)
            } else {
                console.log("error")
                return
            }
        }).catch(err => console.log("err in catch", err))
        
    }

    handleTimeSelect = async (e) => {
        this.props.onTimeChange(e.target.textContent);

        await this.appointmentExists(e.target.textContent).then(() => {
            this.props.nextStep()
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