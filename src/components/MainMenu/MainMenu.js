import React, { Component } from 'react'
import './MainMenu.scss'
import { Toggle } from '../../components'

class MainMenu extends Component {

    // Diffferent menus
    // Game - WHere you are asked questions
    // Splash - Splash menu
    // Settings - WHere you can control settings
    // GameOver - Where end results are shown
    constructor(props) {
        super(props)

        this.state = {
            currentMenu: this.props.menu,
            distanceDisplayType: this.props.distanceDisplayType,
            showFlags: this.props.showFlags
        }
    }

    changeMenu(type) {
        this.setState({ currentMenu: type })
        this.props.onMenuChange(type)
    }

    saveSettings() {
        this.props.onSaveSettings(this.state)
    }

    handleDistanceType(val) {
        this.setState({ distanceDisplayType: val ? 'km' : 'miles' })
    }

    handleFlagToggle(showFlags) {
        this.setState({ showFlags })
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
                    <h1>Settings</h1>
                    <Toggle initial={(this.props.distanceDisplayType === 'km' ? true : false )} onToggle={(val) => { this.handleDistanceType(val) }} activeLabel='Kilometers' inactiveLabel='Miles' />
                    <Toggle initial={this.props.showFlags} onToggle={(val) => { this.handleFlagToggle(val) }} heading='Show Flags' activeLabel='Yes' inactiveLabel='No' />
                    <button className="btn" onClick={() => { this.saveSettings(); this.changeMenu('splash')} }>Save Settings</button>
                </div>
            )
        }
    }
}

export default MainMenu
