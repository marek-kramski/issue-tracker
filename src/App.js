import React, { Component } from 'react';
import './App.css';
import IssuesList from './components/IssuesList';

class App extends Component {
  render () {
    return (
      <div>
        <IssuesList />
      </div>
    );
  }
}

export default App;
