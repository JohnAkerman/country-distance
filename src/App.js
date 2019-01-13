import React, { Component } from 'react';
import './App.css';

import { distanceBetween, randomBetween } from './lib/helpers'

import Capital from './components/Capital/Capital'

import capitals from './lib/capitalData.json'

class App extends Component {

    state =  {
        start: this.getRandomCapital(),
        answerA: this.getRandomCapital(),
        answerB: this.getRandomCapital(),
        correct: null
    }

    getRandomCapital() {
        return capitals[randomBetween(0, capitals.length)];
    }

    getSelectedAnswer(a, b) {
        if (a.selected) return a
        else if (b.selected) return b
    }

    updateAppState = guess => {
        this.checkAnswer(guess)
    }

    checkAnswer(guess) {

        // Check real answer
        let distA = distanceBetween(this.state.start, this.state.answerA)
        let distB = distanceBetween(this.state.start, this.state.answerB)

        let realAnswer = null

        if (distA > distB) realAnswer = this.state.answerA
        else realAnswer = this.state.answerB

        console.log('Answer', realAnswer)
        console.log('Guess', guess.props.country)

        if (realAnswer === guess.props.country) {
            // Correct
            console.log('Correct')
            this.setState({ correct: true});
            guess.state.correct = true
        } else {
            console.log('Wrong!')
            this.setState({ correct: false});
            guess.state.correct = false
        }

        // Show result to user
    }

  render() {
    return (
        <div className="container">
            <h2>Centre</h2>
            <Capital country={this.state.start} type="question" />

            <h2>Answers</h2>
            <Capital country={this.state.answerA} returnGuessToApp={value => this.updateAppState(value) } type="answer" />
            <Capital country={this.state.answerB} returnGuessToApp={value => this.updateAppState(value) } type="answer" />

        </div>
    );
  }
}

export default App;
