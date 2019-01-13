import React, { Component } from 'react'
import './Capital.css'

class Capital extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                selected: false,
                correct: null,
                distance: 0
            },
            location: props.location,
            classes: 'capital'
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
                data: {
                    correct: null,
                    distance: 0,
                    selected: false
                }
            });
        }
        this.setState({
            classes: this.getAnswerStatus()
        })
    }

    onClick = () => {
        if (this.props.type === 'answer') {
            let prevState = this.state.data;
            prevState.selected = !prevState.selected
            this.setState({
                data: prevState
            })

            this.returnGuessToApp(this)

        }

        this.setState({
            classes: this.getAnswerStatus()
        })
    }

    getAnswerStatus() {
        let className = 'capital'

        if (this.state.data.correct === false) {
            className += ' is-wrong'
        }
        else if (this.state.data.correct === true) {
            className += ' is-correct'
        }

        if (this.state.data.selected) {
            className += ' is-selected'
        }

        return className
    }

    renderDistance() {
        if (this.state.data.distance > 0) {
            return (
                <span className="capital__dist">{this.state.data.distance} km</span>
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
