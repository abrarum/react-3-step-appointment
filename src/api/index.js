import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

export const fetchAppointments = () => api.get("https://private-anon-6a5c3c80a7-cfcalendar.apiary-mock.com/mentors/1/agenda")
export const insertAppointment = payload => api.post(`/appointment`, payload)
export const updateAppointmentByName = (name, payload) => api.put(`/appointment/${name}`, payload)
export const getAppointmentByName = name => api.get(`/appointment/${name}`)

const apis = {
    fetchAppointments,
    insertAppointment,
    updateAppointmentByName,
    getAppointmentByName
}

export default apis