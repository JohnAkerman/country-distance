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
            <React.Fragment>
                {this.props.label && <label className="form-item__label">{this.props.label}</label>}
                <div className="form-item__control toggle-wrapper" onClick={this.toggle}>
                    {this.props.inactiveLabel && <label className="toggle-label">{this.props.inactiveLabel}</label>}
                    <div className={classNames("toggle-pill", {active: this.state.toggle}, {inactive: !this.state.toggle})}>
                        <div className="toggle-pill__inner"></div>
                    </div>
                    {this.props.activeLabel && <label className="toggle-label">{this.props.activeLabel}</label>}
                </div>
            </React.Fragment>
        )
    }
}

export default Toggle
