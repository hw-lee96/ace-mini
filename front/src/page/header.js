import React, { useState } from 'react'
import './header.css'

const Header = () => {
    return (
        <div className='headerWrap'>
            <div className='logoWrap'>
                <img className='logoImg' src="./static/logo.png" alt="" />
            </div>
            
            <div className='modeBtnWrap'>
                <div className='modeBtn'>
                    <img className='lightBtn' src="./static/lightBtn.png" alt="" />
                    <img className='darkBtn' src="./static/darkBtn.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Header