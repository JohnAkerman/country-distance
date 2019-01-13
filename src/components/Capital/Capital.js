import React, { Component } from 'react'
import './Capital.css'

class Capital extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: false,
            correct: null,
            distance: props.distance,
            location: props.location,
            classes: 'capital',
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
        // You don't have to do this check first, but it can help prevent an unneeded render
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

        this.setState({
            classes: this.getAnswerStatus()
        })
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

    renderDistance() {
        if (this.props.showDistance) {
            return (
                <span className="capital__dist">{this.props.distance} km</span>
            )
        }
    }

    render() {
        var classes = this.getAnswerStatus()
        return (
                <div className={classes} onClick={this.onClick}>
                <h3 className="capital__title">{this.props.location.capital} {this.renderDistance() }</h3>
                <span className="capital__country">{this.props.location.countryName}</span>
            </div>
        )
    }
}

export default Capital
