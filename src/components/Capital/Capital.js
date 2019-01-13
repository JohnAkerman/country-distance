import React, { Component } from 'react'
import './Capital.css'

class Capital extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selected: false
        }
    }

    onClick = () => {
        this.setState({
            selected: !this.state.selected
        })
    }

    componentDidMount() {
        console.log('Mounted')
    }

    render() {
        let className = 'capital'
        if (this.state.selected && this.props.question === false) className += ' selected'
        else className += ' not-selected'

        return (
            <div className={className} onClick={this.onClick}>
                <h3 className="capital__title">{this.props.item.capital}</h3>
                <span className="capital__country">{this.props.item.countryName}</span>
            </div>
        )
    }
}

export default Capital
