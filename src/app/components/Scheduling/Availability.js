import React from "react";
import api from "../../../api";

export default class Availability extends React.Component {
  constructor(props) {
    super(props);

    this.handleTimeSelect = this.handleTimeSelect.bind(this);
  }

  appointmentExists = async (selectedTime) => {
    /*
            scenarios covered:
                1. date exists => time exists => adds a new time to the particular index
                2. date exists => time exists but the hour is same to what is already booked => rejects the update
                3. date doesn't exist => pushes the new object for the particular mentor
        */
    console.log("inside appointmentexists");
    return await api
      .getAppointmentByName(this.props.mentorSelected)
      .then((res) => {
        if (res) {
          console.log("selected time is: ", selectedTime);

          let date_time = res.data.data.date_time;
          let exists = date_time.some(
            (i) =>
              i.date === this.props.dateSelected &&
              (i.time === selectedTime ||
                i.time.split(":")[0] === selectedTime.split(":")[0])
          );
          console.log("exists vall", exists);
          return exists;
        } else {
          console.log("error");
          return false;
        }
      })
      .catch((err) => {
        console.log("err in catch", err);
        return false;
      });
  };

  handleTimeSelect = (e) => {
    // handles the change of time
    this.props.onTimeChange(e.target.textContent);

    this.appointmentExists(e.target.textContent).then((exists) => {
      exists
        ? window.alert("Appointment already exists.")
        : this.props.nextStep();
    });
  };

  timeGen = () => {
    // generates jsx for individual times
    return this.props.times.map((i) => (
      <div
        key={i}
        value={this.props.timeSelected}
        onClick={this.handleTimeSelect}
      >
        {i}
      </div>
    ));
  };

  render() {
    //const times = this.props.times
    return (
      <div>
        <div>Select the time</div>
        {this.timeGen()}
      </div>
    );
  }
}
