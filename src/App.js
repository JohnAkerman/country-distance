import React, { Component } from 'react';

import './custom.scss';

import capitals from './lib/capitalData.json'
import { distanceBetween, randomBetween } from './lib/helpers'

import { Capital, Scoreboard, MainMenu, Timer } from './components'

class App extends Component {
    constructor() {
        super()

        this.state =  {
            correct: null,
            correctAnswers: 0,
            wrongAnswers: 0,
            totalAnswers: 0,
            timeUp: false
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
            providedAnswer: false,
            timeUp: false
        })


        setTimeout(() => {
            console.log('Starting timer...')
            this._childTimer.resetTimer()
            this._childTimer.startTimer()
        }, 10)
    }

    getRandomCapital() {
        return capitals[randomBetween(0, capitals.length)];
    }

    getSelectedAnswer(a, b) {
        return a.selected ? a : b
    }

    updateAppState = guess => {
        if (!this.state.providedAnswer && !this.state.timeUp) {
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

        this._childTimer.stopTimer()
    }

    onTimerFinish() {
        console.log('This is a top level event!')
        this.setState({ timeUp: true })
    }

    render() {
        const { totalAnswers, correctAnswers, wrongAnswers, start, answerA, answerB } = this.state
        const containerStyle = {
            maxWidth: '700px',
            margin: '0 auto',
            padding: '0 15px'
        }
        return (
            <div>
                <MainMenu menu='game' />
                <Scoreboard total={totalAnswers} correct={correctAnswers} wrong={wrongAnswers} />
                <div className="container" style={containerStyle}>
                    <h2>Location</h2>
                    <Capital location={start.location} data={start.data} type="question" />

                    <h2>Which is closer?</h2>
                    <Capital location={answerA.location} showDistance={answerA.showDistance} distance={answerA.distance} returnGuessToApp={value => this.updateAppState(value) } type="answer" />
                    <Capital location={answerB.location} showDistance={answerB.showDistance} distance={answerB.distance} returnGuessToApp={value => this.updateAppState(value) } type="answer" />

                    <button type="button" className="mb-3" onClick={this.nextGame}>Next Round</button>
                    <Timer duration="10" ref={(child) => { this._childTimer = child }} onFinish={() => { this.onTimerFinish() }} />
                </div>
            </div>
        )
    }
}

export default App
