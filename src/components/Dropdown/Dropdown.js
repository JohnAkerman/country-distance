import React, { Component } from 'react'
import './Dropdown.scss'

class Dropdown extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: this.props.initial || this.props.opts[0]
        }
    }

    handleChange = (e) => {
        this.setState({ selected: e.target.value })

        if (this.props.onChange) {
            this.props.onChange( e.target.value)
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.label && <label className="form-item__label">{this.props.label}</label>}
                <div className="form-item__control dropdown">
                    <select onChange={this.handleChange} defaultValue={this.props.initial}>
                        {this.props.opts.map( (item) =>
                            <option key={item} value={item}>{item}</option>
                        )}
                    </select>
                </div>
            </React.Fragment>
        )
    }
}

export default Dropdown
