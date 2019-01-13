import React, { Component } from 'react'
import './Scoreboard.css'

class Scoreboard extends Component {
    render() {
        return (
            <div className="scoreboard">
                <div className="score correct">
                    <span className="figure">{this.props.correct}</span>
                    <span className="title">Correct</span>
                </div>

                <div className="score wrong">
                    <span className="figure">{this.props.wrong}</span>
                    <span className="title">Wrong</span>
                </div>
            </div>
        )
    }
}

export default Scoreboard
