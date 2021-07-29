import React from 'react'

const titles = {
    1: 'Choose a Mentor',
    2: 'Schedule your Appointment',
    3: 'Confirmation'
}

export const StepTitle = ({currStep}) => {
    return <h3 style={{ marginBottom: '1em' }}> {titles[currStep]}</h3>
}