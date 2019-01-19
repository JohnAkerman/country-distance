import React, { Component } from 'react'
import './Location.scss'

import { kmToMiles, numberWithCommas } from '../../lib/helpers'

class Location extends Component {
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
        let className = 'location'
        className += (this.state.correct) ? ' is-correct' : ''
        className += (this.state.correct === false) ? ' is-wrong' : ''
        className += (this.state.selected) ? ' is-selected' : ''
        return className
    }

    renderDistance() {
        if (this.props.showDistance) {
            let dist = (this.props.distanceDisplayType === 'km' ? numberWithCommas(this.props.distance) + ' km' : numberWithCommas(kmToMiles(this.props.distance)) + ' miles')
            return (
                <span className="location__dist">{dist}</span>
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
                {this.props.showFlags && <img className="location__flag" src={this.getFlagURL()} alt="Flag" />}
                <h3 className="location__title">{capital} {this.renderDistance() }</h3>
                <span className="location__country">{countryName}</span>
            </div>
        )
    }
}

export default Location
