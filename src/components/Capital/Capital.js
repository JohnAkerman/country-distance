import React, { Component } from 'react'
import './Capital.css'

class Capital extends Component {
    constructor({props, returnGuessToApp }) {
        super(props)

        this.state = {
            selected: false,
            correct: null
        }

        this.returnGuessToApp = returnGuessToApp
    }

    onClick = () => {
        this.setState({
            selected: !this.state.selected
        })

        this.returnGuessToApp(this)
    }

    getAnswerStatus() {
        let className = 'capital'

        if (this.state.correct === false) {
            className += ' is-wrong'
        }
        else if (this.state.correct === true) {
            className += ' is-correct'
        }

        if (this.state.selected) {
            className += ' is-selected'
        }

        return className
    }

    render() {
        return (
            <div className={this.getAnswerStatus()} onClick={this.onClick}>
                <h3 className="capital__title">{this.props.country.capital}</h3>
                <span className="capital__country">{this.props.country.countryName}</span>
            </div>
        )
    }
}

export default Capital
