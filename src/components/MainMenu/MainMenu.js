import React, { Component } from 'react'
import './MainMenu.scss'

import {CountryConsumer} from '../../context.js'

class MainMenu extends Component {

    // Diffferent menus
    // Game - WHere you are asked questions
    // Splash - Splash menu
    // Settings - WHere you can control settings
    // GameOver - Where end results are shown
    constructor(props) {
        super(props)

        this.state = {
            currentMenu: this.props.menu
        }
    }

    changeMenu(type) {
        this.setState({ currentMenu: type })
        this.props.onMenuChange(type)
    }

    saveSettings() {

    }

    render() {
        if (this.state.currentMenu === 'game') {
            return (null)
        } else if (this.state.currentMenu === 'splash') {
            return (
                <div className="menu menu--splash">
                    <h1>Country Distance</h1>
                    <button className="btn" onClick={() => this.changeMenu('game')}>Play Game</button><br />
                    <button className="btn" onClick={() => this.changeMenu('settings')}>Settings</button>
                </div>
            )
        } else if (this.state.currentMenu === 'settings') {
            return (
                <div className="menu menu--settings">
                    <CountryConsumer>
                    {value => {
                        console.log(value)
                        return value.isActive.toString()
                    }}
                    </CountryConsumer>
                    <h1>Settings</h1>
                    <button className="btn" onClick={() => { this.saveSettings(); this.changeMenu('splash')} }>Save Settings</button>
                </div>
            )
        }
    }
}

export default MainMenu
