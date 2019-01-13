import React, { Component } from 'react';
import './App.css';

import Capital from './components/Capital/Capital.js';

import capitals from './lib/capitalData.json';

class App extends Component {

    state =  {
        start: this.getRandomCapital(),
        answerA: this.getRandomCapital(),
        answerB: this.getRandomCapital()
    }

    getRandomCapital() {
        return capitals[Math.floor(Math.random() * capitals.length - 1)];
    }

  render() {
    return (
        <div className="container">
            <h2>Centre</h2>
            <Capital item={this.state.start} question={true} answer={false} />

            <h2>Answers</h2>
            <Capital item={this.state.answerA} question={false} answer={true}/>
            <Capital item={this.state.answerB} question={false} answer={true}/>

        </div>
    );
  }
}

export default App;
