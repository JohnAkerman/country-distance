import React, { Component } from 'react'

import './Timer.scss'

class Timer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            duration: parseInt(this.props.duration, 10),
            ticker: parseInt(this.props.duration, 10),
            running: false,
            finished: false,
            ratio: 100,
        }

        this.timer = null
    }

    tick = () => {
        if (this.state.running && this.props.menu === 'game') {
            if (this.state.ticker <= 0) {
                this.setState({
                    running: false,
                    finished: true
                })
                clearInterval(this.timer)
                this.onFinish()
            } else {
                this.setState(prevState => ({
                    ticker: prevState.ticker - 1
                }))
            }

            this.updateProgress()
        }
    }

    startTimer = () => {
        this.setState({
            running: true,
            finished: false
        })

        this.timer = setInterval(() => this.tick(), 1000)
    }

    stopTimer = () => {
        this.setState({ running: false })
        clearInterval(this.timer)
    }

    resetTimer = () => {
        clearInterval(this.timer)
        this.setState({
            ticker: this.state.duration,
            running: false,
            finished: false,
            ratio: 100
        })
    }

    onFinish = () => {
        this.props.onFinish()
    }

    updateProgress = () => {
        let ratio = this.state.ticker / this.state.duration
        this.setState({ progress: ratio * 100 })
    }

    render() {
        let classes = 'timer'
        classes += (this.state.progress > 20 && this.state.progress < 30) ? ' med' : ''
        classes += (this.state.progress < 20) ? ' low' : ''

        return (
            <div className={classes}>
                <div className="timer__inner" style={{ width: this.state.progress + '%'}}></div>
            </div>
        )
    }
}

export default Timer
