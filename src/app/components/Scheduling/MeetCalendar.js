import React from 'react';
import Calendar from 'react-calendar';

export default class MeetCalendar extends React.Component {

    constructor(props) {
        super(props);
        
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange = (date) => {
        this.props.onDateChange(this.calendarDateFormatter(date))
    }

    calendarDateFormatter = (date) => {
        /*
            DATE/date object of api and the react-calendar has a dissimilar format, thus
            this function assimilates the idea to have a single format for both.
            FORMAT intended: year+month+date
        */
        let c_date = date.getDate()
        c_date = c_date<10? '0'+c_date:''+c_date
        let c_month = date.getMonth()
        c_month = c_month<10? '0'+c_month:''+c_month
        let c_year = date.getFullYear()
        let calendar_date = c_year+"-"+c_month+"-"+c_date
        return calendar_date
    }

    highlightDates = ({date, view}, mode) => {
        // a callback function to be used react-calendar to highlight the available calendar dates
        const avail_dates = this.props.dates
        // formatting date duplicate - can be skipped by standaraziation of dates of api and calendar
        let calendar_date = this.calendarDateFormatter(date)
        if(view === 'month' && avail_dates[0].includes(calendar_date)) {
            return 'highlightDate'
        }
    }

    isDisabled = ({date, view}) => {
        // checks for if the dates are unavailable and disables it
        const avail_dates = this.props.dates
        // formatting date duplicate - can be skipped by standaraziation of dates of api and calendar
        let calendar_date = this.calendarDateFormatter(date)
        
        if(view === 'month' && !avail_dates[0].includes(calendar_date)) {
            return true
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // checks for prop updates
        if(this.props.dates !== prevProps.dates) {
            // eslint-disable-next-line no-self-assign
            this.props.dates = this.props.dates
        }
    }

    render() {
        return(
            <Calendar
                onClickDay={this.handleDateChange}
                tileClassName = {(params) => this.highlightDates(params)}
                tileDisabled = {(params) => this.isDisabled(params)}
            />
        )
    }
}