import React, { useState } from 'react'
import './header.css'
import { useTheme } from '../theme/themeProvider'

const Header = () => {
    const [ThemeMode, toggleTheme] = useTheme();

    return (
        <div className='headerWrap'>
            <div className='logoWrap'>
                {
                    ThemeMode == 'dark' ? <img className='logoImg' src="./static/logo_dark.png" alt="" /> : <img className='logoImg' src="./static/logo_light.png" alt="" />
                }
            </div>
            
            <div className='modeBtnWrap'>
                <div className='modeBtn' onClick={() => toggleTheme(ThemeMode)}>
                    {
                        ThemeMode == 'dark' ? <img className='darkBtn' src="./static/darkBtn.png" alt="" /> : <img className='lightBtn' src="./static/lightBtn.png" alt="" />
                    }
                </div>
            </div>
        </div>
    )
}

export default Header