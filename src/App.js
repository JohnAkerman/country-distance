import React, { Component } from 'react';

import './custom.scss';

import { locationData, regions } from './lib/locationData.js'
import { distanceBetween, randomBetween } from './lib/helpers'

import { Location, Scoreboard, MainMenu, Timer } from './components'

class App extends Component {
    constructor() {
        super()

        this.state =  {
            correct: null,
            correctAnswers: 0,
            wrongAnswers: 0,
            totalAnswers: 0,
            timeUp: false,
            menu: 'splash',
            distanceDisplayType: 'miles',
            showFlags: true,
            activeRegion: regions[0],
            answerHasBeenSelected: false
        }

        this.regionCache = []
    }

    componentDidMount() {
        this.nextGame()
    }

    componentWillUpdate(nextProps, nextState) {
        // Check to see whether the game is starting
        if (nextState.menu !== this.state.menu && nextState.menu === 'game') {
            this.startGame()
        }
    }

    startGame() {
        this.nextGame()
        setTimeout(() => {
            this._childTimer.resetTimer()
            this._childTimer.startTimer()
        }, 10)
    }

    nextGame = () => {
        // Get new center location, and two random locations
        let locationStart = this.getRandomLocation();
        let locationA = this.getRandomLocation();
        let locationB = this.getRandomLocation();

        // Really don't like how this works but it greatly reduces risk of having two the same
        while (locationStart === locationA) {
            locationA = this.getRandomLocation()
        }

        while (locationA === locationB) {
            locationB = this.getRandomLocation()
        }

        while (locationB === locationStart) {
            locationStart = this.getRandomLocation()
        }

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
            answerHasBeenSelected: false,
            timeUp: false,
        })
    }

    getRandomLocation() {
        if (this.state.activeRegion === 'All') {
            return locationData[randomBetween(0, locationData.length)];
        } else {

            // Check to see if we have already filtered regions previously.
            if (typeof this.regionCache[this.state.activeRegion] !== 'undefined' && this.regionCache[this.state.activeRegion].length > 0) {
                const index = randomBetween(0, this.regionCache[this.state.activeRegion].length)
                return this.regionCache[this.state.activeRegion][index]
            } else {
                // Loop through the regions and return those that are relevant to the active region
                const filteredLocations = locationData.filter(item => item.continent === this.state.activeRegion)

                // Store the newly filtered regions in the cache
                this.regionCache[this.state.activeRegion] = filteredLocations

                // Return a random item
                return filteredLocations[randomBetween(0, filteredLocations.length)];
            }
        }
    }

    getSelectedAnswer(a, b) {
        return a.selected ? a : b
    }

    updateAppState = guess => {
        if (!this.state.answerHasBeenSelected && !this.state.timeUp) {
            this.setState({answerHasBeenSelected: true})
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
        this.setState({ timeUp: true })
    }

    handleSaveSettings(newState) {
        this.setState({
            distanceDisplayType: newState.distanceDisplayType,
            showFlags: newState.showFlags,
            activeRegion: newState.activeRegion
        })
    }

    render() {
        const { totalAnswers, correctAnswers, wrongAnswers, start, answerA, answerB } = this.state
        const containerStyle = {
            maxWidth: '700px',
            margin: '0 auto',
            padding: '0 15px'
        }

        if (this.state.menu === 'splash') {
            return (
                <React.Fragment>
                    <MainMenu menu={this.state.menu}  activeRegion={this.state.activeRegion} regions={regions} showFlags={this.state.showFlags} onSaveSettings={(s) => { this.handleSaveSettings(s) }} onMenuChange={(menu) => { this.setState({menu}) }} />
                </React.Fragment>
            )
        } else if (this.state.menu === 'settings') {
            return (
                <MainMenu menu={this.state.menu} activeRegion={this.state.activeRegion} regions={regions} showFlags={this.state.showFlags} onSaveSettings={(s) => { this.handleSaveSettings(s) }} onMenuChange={(menu) => { this.setState({menu}) }} />
            )
        } else if (this.state.menu === 'game') {
            const { menu, showFlags, distanceDisplayType } = this.state
            return (
                <React.Fragment>
                    <MainMenu menu={menu} activeRegion={this.state.activeRegion} regions={regions} showFlags={showFlags} distanceDisplayType={distanceDisplayType} onSaveSettings={(s) => { this.handleSaveSettings(s) }} onMenuChange={(menu) => { this.setState({menu}) }} />
                    <Scoreboard total={totalAnswers} correct={correctAnswers} wrong={wrongAnswers} />
                    <div className="question__wrapper">
                        <div className="container">
                            <Location location={start.location} showFlags={showFlags} distanceDisplayType={distanceDisplayType} data={start.data} type="question" />
                            <Timer duration="10" menu={menu} ref={(child) => { this._childTimer = child }} onFinish={() => { this.onTimerFinish() }} />
                        </div>
                    </div>
                    <div className="container" style={containerStyle}>
                        <h2 className="question__heading">Which is closer?</h2>
                        <Location location={answerA.location} showFlags={showFlags} showDistance={answerA.showDistance} distanceDisplayType={distanceDisplayType} distance={answerA.distance} returnGuessToApp={value => this.updateAppState(value) } type="answer" />
                        <Location location={answerB.location} showFlags={showFlags} showDistance={answerB.showDistance} distanceDisplayType={distanceDisplayType} distance={answerB.distance} returnGuessToApp={value => this.updateAppState(value) } type="answer" />
                        {(this.state.answerHasBeenSelected || this.state.timeUp) &&
                            <button type="button" className="mb-3" onClick={() => { setTimeout(() => {
                            this._childTimer.resetTimer()
                            this._childTimer.startTimer()
                        }, 10); this.nextGame() }}>Next Round</button>
                    }
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default App
