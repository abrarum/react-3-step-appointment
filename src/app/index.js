import './index.css';
import React from 'react';

//components
import StepperBox from './components/StepperBox';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <StepperBox />
      </div>
    );
  }
  
}