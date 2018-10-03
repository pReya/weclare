import React, { Component } from 'react';
import Server from './server';
import Client from './client';
import ReactDOM from 'react-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Which application do you want to run?
          </p>
          <a
            className="App-link"
            href="#"
            onClick = {() => ReactDOM.render(<Server />, document.getElementById('root'))}
          >
            Server
          </a>
          <a
            className="App-link"
            href="#"
            onClick = {() => ReactDOM.render(<Client />, document.getElementById('root'))}
          >
            Client
          </a>
        </header>
      </div>
    );
  }
}

export default App;
