import React from 'react';
import Availability from './Availability';
import MeetCalendar from './MeetCalendar';

export default class Scheduling extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
    }
    //separate date UTC with time
    date_time = []
    localDateTime = [[],[]]

    handleDateChange = (date) => {
        this.props.onDateChange(date);
    }

    handleTimeChange = (time) => {
        this.props.onTimeChange(time);
    }

    dateAndTimeGen = (data) => {
        let date_time = []

        // filtered array by mentor
        if (Array.isArray(data)) {
            // if data is an array of objects
            let x = data.filter((i) => i.mentor.name === this.props.mentorSelected)
            date_time = x.calendar
        } else {
            // if data is a single object
            date_time = data.calendar
        }

        // date and time generation
        date_time.forEach((i) => {
            let item = Object.values(i).toString()
            let split_item = item.split(" ")
            let localDate = split_item[0]
            let localTime = split_item[1]
            //console.log("localTime, localDate", localTime, localDate)
            this.localDateTime[0].push(localDate)
            this.localDateTime[1].push(localTime)
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.data !== prevProps.data) {
            this.dateAndTimeGen(this.props.data)
        }
    }

    timeExtract = () => {
        let times = []
        this.localDateTime[0].forEach((i, index) => {
            if (i === this.props.dateSelected) {
            times.push(this.localDateTime[1][index])
        }
        })
        return times
    }

    render() {
        return(
            <div>
                <MeetCalendar
                    dates = {this.localDateTime}
                    onDateChange = {this.handleDateChange}
                    dateSelected = {this.props.dateSelected}
                />
                <Availability
                    times = {this.timeExtract()}
                    nextStep = {this.props.nextStep}
                    onTimeChange = {this.handleTimeChange}
                    mentorSelected = {this.props.mentorSelected}
                    timeSelected = {this.props.timeSelected}
                    dateSelected = {this.props.dateSelected}
                />
            </div>
        )
    }
}