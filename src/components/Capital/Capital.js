import React, { Component } from 'react'
import './Capital.scss'

class Capital extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: false,
            correct: null,
            distance: props.distance,
            location: props.location,
            showDistance: false
        }

        this.returnGuessToApp = props.returnGuessToApp
    }

    componentWillMount() {
        // console.log('A')
    }

    componentDidMount() {
        // console.log('B')
    }

    componentWillUpdate() {
        // console.log('C')
    }

    componentDidUpdate() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.state.location) {
            this.setState({
                location: nextProps.location,
                correct: null,
                distance: 0,
                selected: false
            });
        }
    }

    onClick = () => {
        if (this.props.type === 'answer') {
            this.setState(prevState => ({
                selected: !prevState.selected
            }))

            this.returnGuessToApp(this)
        }
    }

    getAnswerStatusClass() {
        let className = 'capital'
        className += (this.state.correct) ? ' is-correct' : ''
        className += (this.state.correct === false) ? ' is-wrong' : ''
        className += (this.state.selected) ? ' is-selected' : ''
        return className
    }

    renderDistance() {
        if (this.props.showDistance) {
            return (
                <span className="capital__dist">{this.props.distance} km</span>
            )
        }
    }

    getFlagURL() {
        return `${require('svg-country-flags/svg/' + this.props.location.countryCode.toLowerCase() + '.svg')}`
    }

    render() {
        const { capital, countryName } = this.props.location
        return (
            <div className={this.getAnswerStatusClass()} onClick={this.onClick}>
                <img className="capital__flag" src={this.getFlagURL()} alt="Flag" />
                <h3 className="capital__title">{capital} {this.renderDistance() }</h3>
                <span className="capital__country">{countryName}</span>
            </div>
        )
    }
}

export default Capital
