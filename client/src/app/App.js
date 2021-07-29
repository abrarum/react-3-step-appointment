import React from "react";
import './styles/App.scss';

//components
import StepperBox from "./components/StepperBox";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <StepperBox />
      </div>
    );
  }
}
