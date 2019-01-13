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
        // this.setState({
        //     location: this.props.location
        // })
        console.log('A')
    }

    componentDidMount() {
        // this.setState({
        //     location: this.props.location
        // })

        console.log('B')
    }

    componentWillUpdate() {
        console.log('C')
        // this.state.classes = this.getAnswerStatus()
        // this.setState({classes: this.getAnswerStatus()})
    }

    componentDidUpdate() {

    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.location !== this.state.location) {
            this.setState({ location: nextProps.location });
        }

        this.setState({
            classes: this.getAnswerStatus()
        })
    }


    onClick = () => {
        if (this.props.type === 'answer') {
            let oldData = this.state.data;
            oldData.selected = !oldData.selected
            this.setState({
                data: oldData,
            })

            this.returnGuessToApp(this)

            this.setState({
                classes: this.getAnswerStatus()
            })
        }
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

    render() {
        return (
            <div className={this.state.classes} onClick={this.onClick}>
                <h3 className="capital__title">{this.props.location.capital}
                {' ' + this.state.data.distance + 'km'}
                </h3>
                <span className="capital__country">{this.props.location.countryName}</span>
            </div>
        )
    }
}

export default Capital
