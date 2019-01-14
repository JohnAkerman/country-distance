import React, { Component } from 'react';

import capitals from './lib/capitalData.json'
import { distanceBetween, randomBetween } from './lib/helpers'

import { Capital, Scoreboard, MainMenu } from './components'

class App extends Component {
    constructor() {
        super()

        this.state =  {
            correct: null,
            correctAnswers: 0,
            wrongAnswers: 0,
            totalAnswers: 0,
        }
    }

    componentWillMount() {
        this.startGame()
    }

    startGame() {
        this.nextGame()
    }

    nextGame = () => {
        // Get new center location, and two random locations
        let locationStart = this.getRandomCapital();
        let locationA = this.getRandomCapital();
        let locationB = this.getRandomCapital();

        this.setState({
            start: {
                location: locationStart,
                selected: false,
                correct: null,
                distance: 0,
            },
            answerA: {
                location: locationA,
                selected: false,
                correct: null,
                distance: distanceBetween(locationStart, locationA),
                showDistance: false,
            },
            answerB: {
                location: locationB,
                selected: false,
                correct: null,
                distance: distanceBetween(locationStart, locationB),
                showDistance: false,
            },
            providedAnswer: false
        })
    }

    getRandomCapital() {
        return capitals[randomBetween(0, capitals.length)];
    }

    getSelectedAnswer(a, b) {
        return a.selected ? a : b
    }

    updateAppState = guess => {
        if (!this.state.providedAnswer) {
            this.setState({providedAnswer: true})
            this.checkAnswer(guess)
        }
    }

    checkAnswer(guess) {
        let correctAnswer = null

        let { answerA, answerB } = this.state

        if (answerA.distance < answerB.distance) correctAnswer = answerA
        else correctAnswer = answerB

        answerA.showDistance = true
        answerB.showDistance = true

        if (correctAnswer.location === guess.state.location) { // Correct
            guess.setState({ correct: true })

            this.setState(prevState => ({
                correct: true,
                totalAnswers: prevState.totalAnswers + 1,
                correctAnswers: prevState.correctAnswers + 1,
                answerA,
                answerB
            }))
        } else {
            guess.setState({ correct: false })

            this.setState(prevState => ({
                correct: false,
                totalAnswers: prevState.totalAnswers + 1,
                wrongAnswers: prevState.wrongAnswers + 1,
                answerA,
                answerB
            }))
        }
    }

    render() {
        const { totalAnswers, correctAnswers, wrongAnswers, start, answerA, answerB } = this.state
        return (
            <div className="container">
                <MainMenu menu='splash' />
                <Scoreboard total={totalAnswers} correct={correctAnswers} wrong={wrongAnswers} />
                <h2>Location</h2>
                <Capital location={start.location} data={start.data} type="question" />

                <h2>Which is closer?</h2>
                <Capital location={answerA.location} showDistance={answerA.showDistance} distance={answerA.distance} returnGuessToApp={value => this.updateAppState(value) } type="answer" />
                <Capital location={answerB.location} showDistance={answerB.showDistance} distance={answerB.distance} returnGuessToApp={value => this.updateAppState(value) } type="answer" />

                <button type="button" onClick={this.nextGame}>Next Round</button>
            </div>
        )
    }
}

export default App
