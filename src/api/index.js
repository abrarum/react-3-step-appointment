import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

export const insertAppointment = payload => api.post(`/appointment`, payload)
export const updateAppointmentByName = (name, payload) => api.put(`/appointment/${name}`, payload)
export const getAppointmentByName = name => api.get(`/appointment/${name}`)

const apis = {
    insertAppointment,
    updateAppointmentByName,
    getAppointmentByName
}

export default apis