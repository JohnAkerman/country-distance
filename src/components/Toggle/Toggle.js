import React, { Component } from 'react'
import './Toggle.scss'

var classNames = require('classnames')

class Toggle extends Component {

    constructor(props) {
        super(props)

        this.state = {
            toggle: this.props.initial || false
        }
    }

    toggle = () => {
        let newVal = !this.state.toggle
        this.setState({ toggle: newVal })

        if (this.props.onToggle) {
            this.props.onToggle(newVal)
        }
    }

    render() {
        return (
            <div className="toggle__wrapper" onClick={this.toggle}>
                <div className="toggle__label">{this.props.inactiveLabel || ''}</div>
                <div className={classNames("toggle__pill", {active: this.state.toggle}, {inactive: !this.state.toggle})}>
                    <div className="toggle__pill__inner"></div>
                </div>
                <div className="toggle__label">{this.props.activeLabel || ''}</div>
            </div>
        )
    }
}

export default Toggle
