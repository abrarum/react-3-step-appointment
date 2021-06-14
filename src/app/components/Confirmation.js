import React from 'react';
import api from '../../api'

export default class Confirmation extends React.Component {

    handleFormSubmit = async (e) => {
        e.preventDefault()
        
        this.updateAppointment(e.target[0].value).then(() => {
            // reloads the page once the atomic task is completed
            window.location.reload();
        })
    }

    updateAppointment = async (reason) => {
        // updates the appointment
        const { mentorSelected, dateSelected, timeSelected } = this.props
        const payload = { name: mentorSelected, date_time: [ {date: dateSelected, time: timeSelected, reason: reason} ] }

        await api.updateAppointmentByName(mentorSelected, payload).then(res => {
            this.makeAlert()
        })
    }

    makeAlert = () => {
        // creates a window alert if the criteria is fullfilled and the booking is made successfully
        const {dateSelected, timeSelected, mentorSelected} = this.props
        window.alert(`You've selected to talk to ${mentorSelected} on ${dateSelected} at ${timeSelected}.`)
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Reason: </label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" required></textarea>
                </div>
                <div> 
                    <span>Are you sure about this appointment?</span>
                    <button type="submit">Confirm call</button>
                </div>
                </form>
            </div>
        )
    }
}