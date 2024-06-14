import React, { useState } from 'react'
import './header.css'
import { useTheme } from '../theme/themeProvider'
import { Link } from 'react-router-dom'

const Header = () => {
    const [ThemeMode, toggleTheme] = useTheme()

    return (
        <div className="headerWrap bgColor">
            <div className="logoWrap">
                <Link to="/" className="ftColor">
                    {ThemeMode == 'dark' ? (
                        <img className="logoImg" src="./static/logo_dark.png" alt="" onError={(e) => e.target.src = "./static/img_not_found.jpg"}/>
                    ) : (
                        <img className="logoImg" src="./static/logo_light.png" alt="" onError={(e) => e.target.src = "./static/img_not_found.jpg"}/>
                    )}
                </Link>
            </div>

            <div className="modeBtnWrap">
                <div className="modeBtn" onClick={() => toggleTheme(ThemeMode)}>
                    {ThemeMode == 'dark' ? (
                        <img className="darkBtn" src="./static/darkBtn.png" alt="" onError={(e) => e.target.src = "./static/img_not_found.jpg"}/>
                    ) : (
                        <img className="lightBtn" src="./static/lightBtn.png" alt="" onError={(e) => e.target.src = "./static/img_not_found.jpg"}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header
