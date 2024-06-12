import React, { useState } from 'react'
import './newsMain.css'

const Main = () => {
    return (
        <div className='mainWrap'>
            <div className='content'>
                <div className='titleWrap'>
                    <div className='title'>사람들이 가장 좋아한 글</div>
                    <div className='slideWrap'>
                        <img className='prevBtn' src="./static/prevBtn.png" alt="" />
                        <img className='nextBtn' src="./static/nextBtn.png" alt="" />
                    </div>
                </div>

                <div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main
