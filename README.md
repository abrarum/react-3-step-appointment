# react-3-step-appointment

## Scripts

### npm install ( / )
install all node packages of this project from the package.json file

### npm start ( src/ )
starts the web application

### nodemon server ( src/server )
starts the server

### mongo && use appointment ( src/server/db )
database can be accessed

### Notes
1. Tech stack:
    <> Frontend: React.js
    <> Backend / Server: Node.js / Express.js
    <> Database: Mongodb / Mongoose
    <> Libraries: react-calendar / react-step-wizard ...
2. Components:
    <> StepperBox: A parent component, resides a stepper wizard. Manages the entire app state and communicates with other components via props
    <> SelectMentor: A child component, resides a select component.
    <> Scheduling: A component that manages 2 other components - MeetCalendar and Availability
        <> MeetCalendar: resides a react-calendar and the availability dates
        <> Availability: resides availability timings for a particular date
    <> Confirmation: A child component, resides a reason textbox and confirmation details.
2. Due to time constraints, I avoided adding any CSS rules (apart from one) OR any tests but I am open to discussion for its implementation.
3. I have used class based components (top-down) strategy as an architecture for data flow instead of the functional hook based components.

### Improvements that can be made ...
1. Due to time constraints, currently, there are no automated tests inside the app apart from the manual testing of each function but I am open and happy to implement esp. unit testing if needed.
2. Mock testing can be added for testing api calls both from the client and server
3. Client and server start scripts can be combined from the package.json
4. CSS - Even being one CSS freak, I avoided working on CSS whatsover since the app logic took the most time. I usually
    use bootstrap and material-ui for styling!
5. Although the code is much refactored, I would prefer putting more efforts refactoring some of the cases in the backend side
6. Adding mobile responsiveness.
7. Could've used Redux for state management
8. Could've used Router for navigation but since this was just a single page application, I avoided using that.
