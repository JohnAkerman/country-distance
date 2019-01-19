import React, { Component } from 'react'
import './Scoreboard.scss'

class Scoreboard extends Component {
    render() {
        const { correct, wrong } = this.props

        return (
            <div className="scoreboard">
                <div className="container">
                    <div className="score correct">
                        <span className="figure">{correct}</span>
                    </div>

                    <div className="score wrong">
                        <span className="figure">{wrong}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Scoreboard
