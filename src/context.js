import React, { Component } from 'react'

const CountryContext = React.createContext()

class CountryProvider extends Component {
    state = {
        isActive: true
    }

    handleDetail = () => {
        console.log('handle detail')
    }

    render() {
        return (
            <CountryContext.Provider value={{...this.state, handleDetail: this.handleDetail }}>
            { this.props.children }
            </CountryContext.Provider>
        )
    }
}

const CountryConsumer = CountryContext.Consumer

export { CountryProvider, CountryConsumer }
