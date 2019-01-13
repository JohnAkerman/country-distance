import React, { Component } from 'react'
import './MainMenu.css'

class MainMenu extends Component {

    // Diffferent menus
    // Game - WHere you are asked questions
    // Splash - Splash menu
    // Settings - WHere you can control settings
    // GameOver - Where end results are shown
    constructor(props) {
        super(props)

        const menuTypes = {
            game: 'game',
            splash: 'splash',
            setting: 'settings',
            gameover: 'gameover'
        }

        this.state = {
            currentMenu: this.props.menu
        }
    }

    changeMenu(type) {
        this.setState({ currentMenu: type })
    }

    menuBtn = (newMenu) => {
        this.changeMenu(newMenu)
    }

    render() {
        if (this.state.currentMenu === 'game') {
            return (null)
        } else if (this.state.currentMenu === 'splash') {
            return (
                <div className="menu menu--splash">
                    <h1>Country Distance</h1>
                    <button className="btn" onClick={this.menuBtn.bind(this, 'game')}>Play Game</button>
                </div>
            )
        }
    }
}

export default MainMenu
