import React, { Component } from 'react';
import './App.css';

import { distanceBetween, randomBetween } from './lib/helpers'

import Capital from './components/Capital/Capital'


import capitals from './lib/capitalData.json'

class App extends Component {
    constructor() {
        super()

        this.state =  {
            correct: null,
            correctAnswers: 0,
            wrongAnswers: 0,
            totalAnswers: 0,
            start: {
                location: this.getRandomCapital(),
                data: {
                    selected: false,
                    correct: null,
                    distance: 0
                }
            },
            answerA: {
                location: this.getRandomCapital(),
                data: {
                    selected: false,
                    correct: null,
                    distance: 0
                }
            },
            answerB: {
                location: this.getRandomCapital(),
                data: {
                    selected: false,
                    correct: null,
                    distance: 0
                }
            }
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
        this.setState({
            start: {
                location: this.getRandomCapital(),
                data: {
                    selected: false,
                    correct: null,
                    distance: 0
                },
                classes: 'capital'
            },
            answerA: {
                location: this.getRandomCapital(),
                data: {
                    selected: false,
                    correct: null,
                    distance: 0
                },
                classes: 'capital'
            },
            answerB: {
                location: this.getRandomCapital(),
                data: {
                    selected: false,
                    correct: null,
                    distance: 0
                },
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

        let guessDist = distanceBetween(correctAnswer.location, guess.state.location)

        if (correctAnswer.location === guess.state.location) { // Correct
            let guessData = guess.state.data
            guessData.correct = true
            guessData.distance = guessDist
            guess.setState({ data: guessData})

            this.setState({
                correct: true,
                totalAnswers: this.state.totalAnswers + 1,
                correctAnswers: this.state.correctAnswers + 1
            })
        } else {
            let guessData = guess.state.data;
            guessData.correct = false
            guessData.distance = guessDist
            guess.setState({ data: guessData})

            this.setState({ correct: false, totalAnswers: this.state.totalAnswers + 1, wrongAnswers: this.state.wrongAnswers + 1})
        }
    }

  render() {
    return (
        <div className="container">
            <div>Guesses: {this.state.totalAnswers} Correct: {this.state.correctAnswers} Wrong: {this.state.wrongAnswers}</div>
            <h2>Centre</h2>
            <Capital location={this.state.start.location} data={this.state.start.data} type="question" />

            <h2>Answers</h2>
            <Capital location={this.state.answerA.location} data={this.state.start.data} returnGuessToApp={value => this.updateAppState(value) } type="answer" />
            <Capital location={this.state.answerB.location} data={this.state.start.data} returnGuessToApp={value => this.updateAppState(value) } type="answer" />

            <button type="button" onClick={this.nextGame}>Next Game</button>
        </div>
    );
  }
}

export default App;
