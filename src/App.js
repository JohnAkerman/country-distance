import React, { Component } from 'react';
import './App.css';

import { distanceBetween, randomBetween } from './lib/helpers'

import { Capital, Scoreboard } from './components'

import capitals from './lib/capitalData.json'

class App extends Component {
    constructor() {
        super()

        this.state =  {
            correct: null,
            correctAnswers: 0,
            wrongAnswers: 0,
            totalAnswers: 0,
            // start: {
            //     location: this.getRandomCapital(),
            //     selected: false,
            //     correct: null,
            //     distance: 0
            // },
            // answerA: {
            //     location: this.getRandomCapital(),
            //     selected: false,
            //     correct: null,
            //     distance: 0
            // },
            // answerB: {
            //     location: this.getRandomCapital(),
            //     selected: false,
            //     correct: null,
            //     distance: 0
            // }
        }
    }

    componentWillMount() {
        this.startGame()
    }

    startGame() {
        this.nextGame()
    }

    nextGame = () => {
        // Get new center location, and two random answers
        let locationStart = this.getRandomCapital();
        let locationA = this.getRandomCapital();
        let locationB = this.getRandomCapital();

        this.setState({
            start: {
                location: locationStart,
                selected: false,
                correct: null,
                distance: 0,
                classes: 'capital'
            },
            answerA: {
                location: locationA,
                selected: false,
                correct: null,
                distance: distanceBetween(locationStart, locationA),
                showDistance: false,
                classes: 'capital'
            },
            answerB: {
                location: locationB,
                selected: false,
                correct: null,
                distance: distanceBetween(locationStart, locationB),
                showDistance: false,
                classes: 'capital'
            },
            providedAnswer: false
        })
    }

    getRandomCapital() {
        return capitals[randomBetween(0, capitals.length)];
    }

    getSelectedAnswer(a, b) {
        if (a.selected) return a
        else if (b.selected) return b
    }

    updateAppState = guess => {
        if (!this.state.providedAnswer) {
            this.setState({providedAnswer: true})
            this.checkAnswer(guess)
        }
    }

    checkAnswer(guess) {
        let correctAnswer = null
        let distA = distanceBetween(this.state.start.location, this.state.answerA.location)
        let distB = distanceBetween(this.state.start.location, this.state.answerB.location)

        if (distA < distB) correctAnswer = this.state.answerA
        else correctAnswer = this.state.answerB

        if (correctAnswer.location === guess.state.location) { // Correct
            guess.setState({ correct: true })

            this.setState(prevState => ({
                correct: true,
                totalAnswers: prevState.totalAnswers + 1,
                correctAnswers: prevState.correctAnswers + 1
            }))
        } else {
            guess.setState({ correct: false })

            this.setState(prevState => ({
                correct: false,
                totalAnswers: prevState.totalAnswers + 1,
                wrongAnswers: prevState.wrongAnswers + 1
            }))
        }

        let answerA = this.state.answerA
        answerA.showDistance = true
        this.setState({ answerA: answerA })

        let answerB = this.state.answerB
        answerB.showDistance = true
        this.setState({ answerB: answerB })
    }

  render() {
    return (
        <div className="container">
            <Scoreboard total={this.state.totalAnswers} correct={this.state.correctAnswers} wrong={this.state.wrongAnswers} />
            <h2>Location</h2>
            <Capital location={this.state.start.location} data={this.state.start.data} type="question" />

            <h2>Which is closer?</h2>
            <Capital location={this.state.answerA.location} showDistance={this.state.answerA.showDistance} distance={this.state.answerA.distance} returnGuessToApp={value => this.updateAppState(value) } type="answer" />
            <Capital location={this.state.answerB.location} showDistance={this.state.answerB.showDistance} distance={this.state.answerB.distance} returnGuessToApp={value => this.updateAppState(value) } type="answer" />

            <button type="button" onClick={this.nextGame}>Next Round</button>
        </div>
    );
  }
}

export default App;
