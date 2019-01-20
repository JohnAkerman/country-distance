import React, { Component } from 'react'
import './MainMenu.scss'
import { Toggle, Dropdown } from '../../components'

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
            showFlags: this.props.showFlags,
            activeRegion: this.props.activeRegion || this.props.regions[0] || 0
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

    handleRegionChange(activeRegion) {
        this.setState({ activeRegion })
    }

    render() {
        if (this.state.currentMenu === 'game') {
            return (null)
        } else if (this.state.currentMenu === 'splash') {
            return (
                <div className="menu menu--splash">
                    <h1>Country Distance</h1>
                    <button className="btn" onClick={() => this.changeMenu('game')}>Play Game</button>
                    <button className="btn" onClick={() => this.changeMenu('settings')}>Settings</button>
                </div>
            )
        } else if (this.state.currentMenu === 'settings') {
            return (
                <div className="menu menu--settings">
                    <div className="container">
                        <h1>Settings</h1>

                        <div className="form-item">
                            <Toggle label="Distance type" initial={(this.props.distanceDisplayType === 'km' ? true : false )} onToggle={(val) => { this.handleDistanceType(val) }} activeLabel='Kilometers' inactiveLabel='Miles' />
                        </div>
                        <div className="form-item">
                            <Toggle label="Show Flags" initial={this.props.showFlags} onToggle={(val) => { this.handleFlagToggle(val) }}/>
                        </div>
                        <div className="form-item">
                            <Dropdown label="Regions" onChange={(val) => { this.handleRegionChange(val) }} initial={this.state.activeRegion}  opts={this.props.regions} />
                        </div>
                        <button className="btn float-right" onClick={() => { this.saveSettings(); this.changeMenu('splash')} }>Save Settings</button>
                    </div>
                </div>
            )
        }
    }
}

export default MainMenu
