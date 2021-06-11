import React from 'react';
import api from '../../api'

export default class Confirmation extends React.Component {

    handleFormSubmit = async (e) => {
        e.preventDefault()

        this.updateAppointment()
    }

    updateAppointment = async () => {
        const { mentorSelected, dateSelected, timeSelected } = this.props
        const payload = { name: mentorSelected, date_time: [ {date: dateSelected, time: [timeSelected]} ] }

        await api.updateAppointmentByName(mentorSelected, payload).then(res => {
            window.alert(`Appointment updated successfully`)
        })
    }

    render() {
        const {dateSelected, timeSelected, mentorSelected} = this.props
        return(
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Reason: </label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <span> You've selected to talk to {mentorSelected} on {dateSelected} at {timeSelected}.</span>
                <div> 
                    <span>Are you sure about this appointment?</span>
                    <button type="submit">Confirm</button>
                </div>
                </form>
            </div>
        )
    }
}