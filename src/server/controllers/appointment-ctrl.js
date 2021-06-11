const Appointment = require('../models/appointment-model')

let createAppointment = (req, res) => {
    const body = req.body
    console.log("body is:", body)
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a appointment',
        })
    }

    let appointment = new Appointment(body)
    
    if (!appointment) {
        return res.status(400).json({ success: false, error: "err" })
    }
    appointment
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: appointment._id,
                message: 'Appointment created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Appointment not created!',
            })
        })
}

let updateAppointment = async (req, res) => {
    console.log("inside updateAppointment!!!")
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    console.log("req.params.name", req.params.name)
    Appointment.findOne({ name: req.params.name }, (err, appointment) => {
        console.log("inside findone", err, appointment)
        if (!appointment) {
            createAppointment(req, res)
        } else {
            appointment.date_time.forEach((date_time, i) => date_time.date === body.date_time[0].date 
                ? date_time.time.push(body.date_time[0].time[0])
                : appointment.date_time.push( body.date_time[0])
            )}
        appointment
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: appointment._id,
                message: 'Appointment updated!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Appointment not updated!',
            })
        })
    })
    }

let getAppointmentByName = async (req, res) => {
    await Appointment.findOne({ name: req.params.name }, (err, appointment) => {
        if (!appointment) {
            createAppointment(req, res)
        }
        //return res.status(200).json({ success: true, data: appointment })
    }).catch(err => console.log(err))
}

let getAppointments = async (req, res) => {
    await Appointment.find({}, (err, appointments) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!appointments.length) {
            return res
                .status(404)
                .json({ success: false, error: `Appointment not found` })
        }
        return res.status(200).json({ success: true, data: appointments })
    }).catch(err => console.log(err))
}

module.exports = {
    createAppointment,
    getAppointmentByName,
    getAppointments,
    updateAppointment
}