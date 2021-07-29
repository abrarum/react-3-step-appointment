import React from "react";
import { StepTitle } from "./Utils";

export default class SelectMentor extends React.Component {
  constructor(props) {
    super(props);
    this.handleMentorChange = this.handleMentorChange.bind(this);
  }

  handleMentorChange = (e) => {
    this.props.onMentorChange(e.target.value);
    this.props.nextStep();
  };

  mentorListGen = () => {
    // generates a list of jsx nodes of all the mentors available in the api
    let mentorList = [];
    const data = this.props.data;
    if (Array.isArray(data)) {
      // if api returns an array of objects
      data.forEach((i) => mentorList.push(i.mentor.name));
    } else {
      // if api returns one object - this special case is intended to resolve the current behavior of the api
      mentorList.push(data.mentor.name);
    }
    return mentorList.map((mentorName) => (
      <option key={mentorName} value={mentorName}>
        {mentorName}
      </option>
    ));
  };

  render() {
    return (
      <>
      <StepTitle currStep={this.props.currentStep} />
        <select
          id="floatingSelect"
          className="form-select"
          value={this.props.mentorSelected}
          onChange={this.handleMentorChange}
        >
          <option>Select a Mentor</option>
          {this.mentorListGen()}
        </select>
        </>
    );
  }
}
